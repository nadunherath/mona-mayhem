# Project Guidelines

## Project Overview
Mona Mayhem is an Astro app for a GitHub contribution battle arena. Treat `src/` and `public/` as the product code.

Ignore `workshop/` unless the task explicitly asks for workshop content. Use `README.md` for high-level workshop context instead of repeating it here.

## Build And Dev
- Install dependencies with `npm install`.
- Start local development with `npm run dev`.
- Create a production build with `npm run build`.
- Preview the built app with `npm run preview`.
- Use `npm run astro -- <args>` for direct Astro CLI tasks when needed.

## Architecture
- The app uses Astro with server output configured in `astro.config.mjs` and the Node standalone adapter.
- Pages and API routes are file-based under `src/pages/`.
- The dynamic API route `src/pages/api/contributions/[username].ts` is server-rendered and uses `export const prerender = false`.
- `docs/` contains static design reference files that can inform styling, but it is not the runtime app.

## Best Practices
- Preserve Astro and TypeScript strict-mode compatibility; keep changes simple and typed.
- For API routes, return explicit HTTP status codes and JSON responses with the correct `Content-Type` header.
- Keep SSR requirements intact when editing dynamic routes; do not re-enable prerendering for server endpoints unless the task requires a design change.
- Prefer small, focused changes that match the existing minimal structure instead of introducing abstractions early.
- When implementing UI, follow the existing project direction and use `docs/` as reference material rather than copying those files wholesale into the app.