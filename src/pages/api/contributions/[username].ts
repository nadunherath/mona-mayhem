import type { APIRoute } from 'astro';

export const prerender = false;

const CACHE_TTL_MS = 15 * 60 * 1000;
const FETCH_TIMEOUT_MS = 8 * 1000;
const SUCCESS_CACHE_CONTROL = 'public, max-age=300, s-maxage=900, stale-while-revalidate=3600';
const USERNAME_PATTERN = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

type ContributionPayload = {
	schema?: string;
	generated_at?: string;
	[key: string]: unknown;
};

type CacheEntry = {
	expiresAt: number;
	payload: ContributionPayload;
	fetchedAt: string;
};

const contributionCache = new Map<string, CacheEntry>();

const jsonHeaders = {
	'Content-Type': 'application/json',
};

function createJsonResponse(body: Record<string, unknown>, status: number, headers?: Record<string, string>) {
	return new Response(JSON.stringify(body), {
		status,
		headers: {
			...jsonHeaders,
			...headers,
		},
	});
}

function createErrorResponse(status: number, error: string, message: string) {
	return createJsonResponse(
		{
			error,
			message,
		},
		status,
		{
			'Cache-Control': 'no-store',
		},
	);
}

function isContributionPayload(value: unknown): value is ContributionPayload {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function getCachedContribution(cacheKey: string) {
	const cachedEntry = contributionCache.get(cacheKey);

	if (!cachedEntry) {
		return null;
	}

	if (cachedEntry.expiresAt <= Date.now()) {
		contributionCache.delete(cacheKey);
		return null;
	}

	return cachedEntry;
}

async function fetchContributionPayload(username: string) {
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

	try {
		return await fetch(`https://github.com/${username}.contribs`, {
			headers: {
				Accept: 'application/json',
				'User-Agent': 'mona-mayhem-contributions-proxy',
			},
			signal: controller.signal,
		});
	} finally {
		clearTimeout(timeoutId);
	}
}

// Server-side proxy for GitHub's contribution JSON to avoid browser CORS restrictions.
export const GET: APIRoute = async ({ params }) => {
	const requestedUsername = params.username?.trim();

	if (!requestedUsername) {
		return createErrorResponse(400, 'invalid_username', 'A GitHub username is required.');
	}

	if (!USERNAME_PATTERN.test(requestedUsername)) {
		return createErrorResponse(400, 'invalid_username', 'The GitHub username format is invalid.');
	}

	const cacheKey = requestedUsername.toLowerCase();
	const cachedEntry = getCachedContribution(cacheKey);

	if (cachedEntry) {
		return createJsonResponse(
			{
				username: requestedUsername,
				data: cachedEntry.payload,
				cached: true,
				fetchedAt: cachedEntry.fetchedAt,
			},
			200,
			{
				'Cache-Control': SUCCESS_CACHE_CONTROL,
			},
		);
	}

	let upstreamResponse: Response;

	try {
		upstreamResponse = await fetchContributionPayload(requestedUsername);
	} catch (error) {
		if (error instanceof Error && error.name === 'AbortError') {
			return createErrorResponse(503, 'upstream_timeout', 'GitHub took too long to respond.');
		}

		return createErrorResponse(503, 'upstream_unavailable', 'Unable to reach GitHub contributions right now.');
	}

	if (upstreamResponse.status === 404) {
		return createErrorResponse(404, 'not_found', 'GitHub user not found.');
	}

	if (!upstreamResponse.ok) {
		return createErrorResponse(502, 'upstream_error', 'GitHub contributions returned an unexpected response.');
	}

	let payload: unknown;

	try {
		payload = await upstreamResponse.json();
	} catch {
		return createErrorResponse(502, 'invalid_upstream_payload', 'GitHub contributions returned invalid JSON.');
	}

	if (!isContributionPayload(payload)) {
		return createErrorResponse(502, 'invalid_upstream_payload', 'GitHub contributions returned an unexpected payload shape.');
	}

	const fetchedAt = new Date().toISOString();

	contributionCache.set(cacheKey, {
		expiresAt: Date.now() + CACHE_TTL_MS,
		payload,
		fetchedAt,
	});

	return createJsonResponse(
		{
			username: requestedUsername,
			data: payload,
			cached: false,
			fetchedAt,
		},
		200,
		{
			'Cache-Control': SUCCESS_CACHE_CONTROL,
		},
	);
};
