# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Taskflow** is a Trello-clone project management application built with Next.js 15. The marketing landing page is fully implemented; auth, database integration, and platform features are not yet implemented.

## Development Commands

```bash
# Development server with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm start

# Add shadcn/ui components
npx shadcn@latest add <component-name>
```

**Note on linting**: `npm run lint` may fail because the project uses `.eslintrc.json` but ESLint 9 expects `eslint.config.js`. Linting still runs as part of `npm run build`.

## Architecture

### Route Groups

Three Next.js App Router route groups (parentheses don't affect URLs):

- **`(marketing)/`** — `/`: Full landing page with all sections implemented in `src/components/landing/`.
- **`(auth)/`** — `/sign-in`, `/sign-up`: Centered layout with gradient background. Auth forms are **TODO** stubs.
- **`(platform)/`** — `/dashboard/*`: Protected area. **Auth guard is a TODO** — currently renders children unconditionally.

### Landing Page Structure

The marketing page (`src/app/(marketing)/page.tsx`) composes sections in order:
`Header → HeroSection → LogoBar → FeaturesSection → HowItWorks → UseCases → Integrations → Testimonials → PricingSection → FinalCta → Footer`

Each section is a separate component in `src/components/landing/`. Scroll-triggered animations use the `useInView` hook from `src/hooks/use-in-view.ts`.

### What's Not Yet Implemented

- Authentication (no Supabase or any auth provider)
- Auth guard in `(platform)/layout.tsx`
- Sign-in / sign-up forms
- Dashboard and board functionality

## Tech Stack

- **Next.js 15** with Turbopack, **React 19**, **TypeScript** (strict, `noUnusedLocals`, `noUnusedParameters`)
- **Tailwind CSS 4** with `tw-animate-css`
- **shadcn/ui** — New York style, neutral base, CSS variables; components in `src/components/ui/`
- **Fonts**: Geist Sans and Geist Mono
- **Package manager**: npm

### Key Conventions

- Path alias `@/*` → `./src/*`
- Use `cn()` from `@/lib/utils` (clsx + tailwind-merge) for conditional classNames
- CSS variables in `src/app/globals.css` use OKLCH color space
- Gradient pattern: `from-background to-secondary`
