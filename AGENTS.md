# AGENTS.md

## Project Overview

`frimago` is a private React + TypeScript frontend application built with Vite. It uses Mantine for UI components, Zustand for state management, Axios for API requests, and Google OAuth / Google APIs for authentication and resource data.

For the MVP, treat this as a frontend-only application. A backend may be added later, but do not introduce backend assumptions, server APIs, or backend scaffolding unless explicitly requested.

The app appears to help users select office locations and rooms using Google Workspace building/calendar resource data and Google Calendar-related scopes.

## Instructions for OpenAI-Style Coding Agents

When working in this repository:

1. Prefer small, focused changes over broad refactors.
2. Reuse existing stores, types, constants, utilities, and API helpers before creating new abstractions.
3. Keep Google API URLs and OAuth scopes centralized in `src/constants.ts`.
4. Keep environment variable access centralized through `src/utils/env.ts`.
5. Prefer Yarn commands because the repository has `yarn.lock`.
6. After meaningful code changes, run `yarn lint` when possible.
7. Do not automatically run `yarn build` unless the user specifically asks for it or the task clearly requires build verification.
8. Do not introduce new dependencies unless clearly justified.
9. If a new dependency is needed, ensure it is compatible with the current Vite, React, and TypeScript setup.
10. Do not commit secrets, OAuth credentials, tokens, or local environment files.
11. Use Conventional Commits for commit messages when committing changes, for example `feat: add room filter` or `fix: handle missing auth token`.
12. Avoid broad architecture changes unless explicitly requested.
13. If product behavior is unclear, ask before implementing assumptions.

## Tech Stack

- React 19
- TypeScript
- Vite 6
- Mantine 8
- Zustand 5
- Axios
- Google OAuth via `@react-oauth/google`
- ESLint 9 with:
  - `typescript-eslint` strict and stylistic configs
  - Mantine ESLint config
  - React and React Hooks plugins
  - Prettier integration
- Yarn package management

## Common Commands

Run these from the project root.

### Install dependencies

`yarn install`

### Start development server

`yarn dev`

### Lint

`yarn lint`

### Build

`yarn build`

The build command runs TypeScript project build first and then Vite build:

`tsc -b && vite build`

Do not run this automatically unless requested or clearly necessary.

### Preview production build

`yarn preview`

## Environment Variables

The app expects the following Vite environment variable:

- `VITE_GOOGLE_AUTH_CLIENT_ID`

This is read in `src/utils/env.ts` and passed to `GoogleOAuthProvider`.

Do not hardcode secrets or OAuth client IDs directly in source files. Use local `.env` files or deployment environment configuration.

## Deployment

The exact deployment target is not yet confirmed.

This is currently a Vite frontend app, so likely deployment targets include static hosting providers such as Vercel, Netlify, Cloudflare Pages, Azure Static Web Apps, GitHub Pages, or an internal static hosting platform.

Until a target is chosen:

- Do not add deployment-provider-specific configuration unless requested.
- Keep runtime configuration based on Vite environment variables.
- Ensure the app remains buildable as a static frontend.

## Project Structure

Important directories and files:

- `src/main.tsx` — React app entry point.
- `src/App.tsx` — Root app component. Sets up Google OAuth and Mantine providers.
- `src/components/` — Shared UI components.
- `src/components/account/` — Account/user display components.
- `src/components/room/` — Room selection and room/date-related UI.
- `src/components/theme/` — Theme toggle UI.
- `src/api/` — API clients and Google API calls.
- `src/store/` — Zustand stores.
- `src/types/` — TypeScript domain types.
- `src/utils/` — Utility helpers.
- `src/constants.ts` — Google API URLs and OAuth scope constants.
- `src/theme.ts` — Mantine theme configuration.
- `vite.config.ts` — Vite configuration.
- `eslint.config.mjs` — ESLint configuration.

## Coding Guidelines

### TypeScript

- Prefer explicit domain types in `src/types/`.
- Use `type` imports where possible, for example `import type { Foo } from './types'`.
- Keep Zustand store interfaces close to the corresponding store implementation.
- Avoid `any` unless there is a strong reason.
- Preserve strict TypeScript compatibility.

### React

- Use modern function components.
- Existing code uses `React.FC` in some places, but new code may use plain function components when that is cleaner and idiomatic.
- Keep components small and focused.
- Prefer extracting reusable UI into `src/components/`.
- Keep feature-specific room components under `src/components/room/`.
- Keep account-specific components under `src/components/account/`.

### State Management

- Zustand stores live in `src/store/`.
- Use focused stores for distinct domains, such as auth, office, buildings, and rooms.
- Avoid putting derived UI-only state into global stores unless multiple components need it.

### Styling

- Component-level CSS modules are used, for example:
  - `App.module.css`
  - `Header.module.css`
  - `Footer.module.css`
  - `Logo.module.css`
- Prefer Mantine components and props for layout and styling where appropriate.
- Use CSS modules for component-specific custom styling.
- Global styles belong in `src/index.css`.

### API and Auth

- The shared Axios client is defined in `src/api/client.ts`.
- The auth bearer token is injected from `useAuthStore`.
- Google API constants and OAuth scopes are defined in `src/constants.ts`.
- Do not duplicate Google API URLs or scope strings across the codebase; import them from `src/constants.ts`.
- Treat Google OAuth access tokens as sensitive.

### Error Handling

- Existing ESLint rules allow `console.error` and `console.warn`; other console usage is warned.
- Prefer descriptive error messages.
- Handle failed API calls gracefully in UI where possible.
- Avoid swallowing errors silently.
- Avoid logging tokens, headers, or private user/resource data.

## Linting and Formatting

Run lint after meaningful code changes:

`yarn lint`

The ESLint config uses strict TypeScript rules and stylistic rules. It also integrates Prettier and disables React prop-types because the project uses TypeScript.

Ignored by ESLint:

- JavaScript config files
- Declaration files
- `.mjs`, `.cjs`, `.js`, `.d.ts`, `.d.mts`

## Testing

No test framework or test scripts are currently configured in `package.json`.

When adding tests, first confirm the desired testing stack. Suitable options for this Vite React project may include:

- Vitest
- React Testing Library
- Playwright for end-to-end tests

Do not introduce a test framework without confirming the project preference.

## Build Notes

The production build command is:

`yarn build`

This runs TypeScript build mode before Vite build. Fix TypeScript errors before assuming Vite-specific issues.

Agents should generally run `yarn lint`, not `yarn build`, unless requested.

## Security Notes

- Do not commit secrets.
- Do not hardcode OAuth credentials.
- Treat Google OAuth access tokens as sensitive.
- Be careful when logging API errors that might include tokens, headers, or private user/resource data.
- Keep OAuth scopes as narrow as possible.

## Backend Notes

There is no backend for the MVP.

A backend may be introduced later, but until then:

- Do not add server code.
- Do not assume backend endpoints exist.
- Continue using Google APIs directly from the frontend as the current architecture does.
- If a task seems to require backend functionality, ask the user before implementing.

## Open Questions for Maintainers

The following details are not fully clear from the repository and should be confirmed when relevant:

1. What is the intended product name and description beyond `frimago`?
2. Which Google Workspace permissions/admin roles are expected for users?
3. Should room booking eventually create Google Calendar events, or is the MVP only for browsing/selecting rooms?
4. What offices/buildings should be supported, and are they entirely sourced from Google Admin Directory?
5. What deployment target should be used?
6. Should tests be added, and if so, which stack should be used?
7. Are there required browser support targets?
8. Are there coding conventions around import ordering beyond the current ESLint setup?
