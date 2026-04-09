# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Taskflow** is a Trello-clone project management application built with Next.js 15. This is the **starter scaffold** — auth, database integration, and platform features are not yet implemented.

## Development Commands

```bash
# Development server with Turbopack
npm run dev

# Production build with Turbopack
npm run build

# Start production server
npm start

# Add shadcn/ui components
npx shadcn@latest add <component-name>
```

**Note on linting**: `npm run lint` may fail because the project uses `.eslintrc.json` but ESLint 9 expects `eslint.config.js`. Linting still runs successfully as part of `npm run build`.

## Architecture

### Route Groups

Three Next.js App Router route groups (parentheses don't affect URLs):

- **`(auth)/`** — `/sign-in`, `/sign-up`: Centered layout with gradient background. Auth forms are **TODO** stubs.
- **`(marketing)/`** — `/`: Public landing page with hero + 3 feature cards. No header/footer layout yet.
- **`(platform)/`** — `/dashboard/*`: Protected area. **Auth guard is a TODO** — currently renders children unconditionally.

### What's Implemented

- Route group structure with layouts
- shadcn/ui Button component only (`src/components/ui/button.tsx`)
- `cn()` utility from `@/lib/utils` (clsx + tailwind-merge)
- Styling system: Tailwind CSS 4, OKLCH color tokens, dark mode via CSS variables

### What's Not Yet Implemented

- Authentication (no Supabase or any auth provider)
- Auth guard in `(platform)/layout.tsx`
- Sign-in / sign-up forms
- Dashboard and board functionality
- Additional shadcn/ui components

## Tech Stack

- **Next.js 15** with Turbopack
- **React 19**, **TypeScript** (strict mode, `noUnusedLocals`, `noUnusedParameters`)
- **Tailwind CSS 4** with `tw-animate-css`
- **shadcn/ui** (New York style, neutral base, CSS variables, components in `src/components/ui/`)
- **Fonts**: Geist Sans and Geist Mono

### Path Aliases

- `@/*` → `./src/*`
- `@/components`, `@/ui`, `@/lib`, `@/hooks` as configured in `components.json`

### Styling

CSS variables defined in `src/app/globals.css` using OKLCH color space. Use `cn()` from `@/lib/utils` for conditional className merging. Gradient pattern: `from-background to-secondary`.
