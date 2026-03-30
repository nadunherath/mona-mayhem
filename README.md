# 🎮 Mona Mayhem

Build a retro GitHub contribution battle arena with Astro and GitHub Copilot.

Mona Mayhem is a workshop repo with a very specific goal: take a tiny starter app and turn it into a loud, playful, arcade-style showdown between two GitHub users. It is designed to help you practice modern Copilot workflows while still shipping something that feels like a real product.

![Mona Mayhem Screenshot](https://github.com/user-attachments/assets/5eca79e2-cb9f-4e93-aa0d-23666ebde3b7)
*Retro energy, head-to-head competition, and plenty of room for Copilot-driven iteration.*

## Why It Exists

Most AI demos stop at isolated prompts. This repo is about the full loop: planning, implementation, visual direction, review, polish, and iteration.

By the end of the workshop, you will have built an app that can:

- compare GitHub contribution activity between two users
- present the matchup in a distinctive retro arcade interface
- use Copilot workflows for planning, editing, reviewing, and refining code

## Choose Your Workflow

You can complete Mona Mayhem in either environment:

- **VS Code track** for chat, plan mode, agent mode, background agents, and editor-native review loops
- **CLI track** for `copilot`, `@file` context, `/plan`, autonomous edits, `/fleet`, `/delegate`, and `/review`

Start here: [workshop/00-overview.md](workshop/00-overview.md)

## What You Will Build

This repo starts intentionally lean. You will grow it into a battle screen that feels designed rather than generated.

- a GitHub contribution matchup between two usernames
- a themed UI with strong retro game energy
- a small Astro app shaped through iterative Copilot collaboration

## Quick Start

1. Create your own copy of the repo by using the template or forking it.
2. Clone it locally.
3. Install dependencies.
4. Start the dev server.
5. Open the workshop and pick your track.

```bash
npm install
npm run dev
```

Continue with:

- [workshop/00-overview.md](workshop/00-overview.md)
- [workshop/01-setup.md](workshop/01-setup.md)

## Workshop Map

| Part | Title | Outcome |
|------|-------|---------|
| [00](workshop/00-overview.md) | Overview | Pick a workflow and understand the end state |
| [01](workshop/01-setup.md) | Setup & Context Engineering | Prepare the environment and improve Copilot context |
| [02](workshop/02-plan-and-scaffold.md) | Plan & Scaffold | Define the page and API shape before coding |
| [03](workshop/03-agent-mode.md) | Build the Game | Implement the experience with agentic help |
| [04](workshop/04-design-vibes.md) | Design-First Theming | Push the app toward a distinct visual identity |
| [05](workshop/05-polish.md) | Polish & Parallel Work | Tighten UX, resilience, and code quality |
| [06](workshop/06-bonus.md) | Bonus & Extensions | Explore extra features and stretch ideas |

## Why This Repo Is Useful

- it gives Copilot a concrete product goal instead of a vague coding sandbox
- it keeps the starting point small, so the implementation work is genuinely yours
- it works as both a workshop and a reusable demo project for agent-driven development

## Project Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start the local Astro dev server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the repo |
| `npm run lint:fix` | Auto-fix supported lint issues |
| `npm run astro -- <args>` | Run Astro CLI commands directly |

## Prerequisites

### Shared

- GitHub Copilot (Pro, Business, or Enterprise)
- Git
- Node.js

### VS Code Track

- VS Code v1.107+
- GitHub Copilot extension installed and signed in

### CLI Track

- GitHub Copilot CLI as `copilot`
- Node.js 22+ if you plan to install the CLI with `npm install -g @github/copilot`
- Or Homebrew / WinGet if you prefer a native package manager install

## Tech Stack

- [Astro](https://astro.build/) v5
- Node.js with [@astrojs/node](https://docs.astro.build/en/guides/integrations-guide/node/) standalone adapter
- TypeScript strict mode
- ESLint with Astro and TypeScript support

## Repo Layout

- `src/` and `public/` contain the runtime app
- `workshop/` contains the guided exercises
- `docs/` contains static design reference material

## License

MIT
