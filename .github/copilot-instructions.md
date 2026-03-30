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

## Design Guide
- The product theme is retro arcade with a dark CRT-inspired presentation, not a generic SaaS dashboard.
- Keep the primary background anchored around `#0a0a1a` with deep near-black supporting tones.
- Use `#5fed83` as the main green accent and `#8a2be2` as the main purple accent for glow, emphasis, and motion highlights.
- Prefer layered gradients, scanlines, vignette, and subtle screen-noise effects over flat backgrounds.
- Use the Google Font `Press Start 2P` for display text such as titles, badges, labels, and high-impact UI moments.
- Keep body copy and dense metadata in a more readable sans-serif companion font so the interface stays usable.
- Favor neon glow, pulse, shimmer, and slow floating motion over bouncy or playful cartoon animation.
- Keep animation cycles slow and deliberate: think arcade cabinet ambience, not fast flicker.
- Preserve accessibility by keeping glow effects readable, supporting `prefers-reduced-motion`, and avoiding aggressive flashing.
- Contribution visuals should feel tactile and game-like, with hover glow and clear level contrast against the dark background.

## Best Practices
- Preserve Astro and TypeScript strict-mode compatibility; keep changes simple and typed.
- For API routes, return explicit HTTP status codes and JSON responses with the correct `Content-Type` header.
- Keep SSR requirements intact when editing dynamic routes; do not re-enable prerendering for server endpoints unless the task requires a design change.
- Prefer small, focused changes that match the existing minimal structure instead of introducing abstractions early.
- When implementing UI, follow the existing project direction and use `docs/` as reference material rather than copying those files wholesale into the app.