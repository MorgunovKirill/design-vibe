# Design Vibe

A modern Next.js project with Tailwind CSS and shadcn/ui components.

## Features

- ⚡ **Next.js 15** with Turbopack for lightning-fast development
- 🎨 **Tailwind CSS 4** for modern, utility-first styling
- 🎯 **shadcn/ui** for beautiful, accessible components
- 📦 **TypeScript** for type-safe development
- 🎭 **Dark mode** support with CSS variables

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles and Tailwind config
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/
│   │   └── ui/             # shadcn/ui components
│   └── lib/
│       └── utils.ts        # Utility functions (cn for className merging)
├── components.json         # shadcn/ui configuration
└── package.json
```

## Adding shadcn/ui Components

To add a new component from shadcn/ui:

```bash
npx shadcn@latest add <component-name>
```

For example:

```bash
npx shadcn@latest add card
npx shadcn@latest add input
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
