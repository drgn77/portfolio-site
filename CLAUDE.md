# Portfolio – Claude Code Guide

## Project overview

Personal developer portfolio built with Next.js 15 (App Router). The owner is a Python specialist learning frontend development. This file guides Claude Code on architecture decisions, code style, and design rules.

## Tech stack

- **Framework**: Next.js 15, App Router, TypeScript
- **Styling**: Tailwind CSS + CSS custom properties (no CSS-in-JS)
- **Fonts**: VT323 (headings) + Share Tech Mono (body) via `next/font/google`
- **i18n**: PL + EN — translations written manually by the owner, never auto-generated
- **Chatbot backend**: Next.js API Routes calling Anthropic Claude API
- **GitHub data**: GitHub REST API (public endpoints)
- **Hosting**: Vercel

## Repository structure

```
src/
  app/
    [locale]/
      page.tsx         # Home — all sections on one page
      layout.tsx
    api/
      chat/
        route.ts       # Anthropic API proxy
      github/
        route.ts       # GitHub API proxy with caching
  components/
    layout/
      Navbar.tsx
      Footer.tsx
    sections/
      Hero.tsx
      About.tsx
      Projects.tsx
      Heatmap.tsx
      TechStack.tsx
      Websites.tsx
      Contact.tsx
      Chatbot.tsx
    ui/
      CrtCard.tsx
      AmberBadge.tsx
      ScanlineOverlay.tsx
  lib/
    github.ts
    anthropic.ts
  styles/
    globals.css
messages/
  pl.json
  en.json
```

## Design system — Amber Vintage CRT

This is the single source of truth for all visual decisions. Never deviate from these values.

### Color tokens (defined in globals.css)

```css
--bg: #0a0800 /* page background */ --bg2: #110f00 /* navbar, cards */
  --bg3: #1a1600 /* inputs, code blocks */ --amber: #ffb300
  /* primary text and accents */ --amber2: #ff8c00
  /* secondary text, subtitles */ --amber3: #ffe066
  /* highlights, hover states */ --amber-dim: rgba(255, 179, 0, 0.35)
  --amber-faint: rgba(255, 179, 0, 0.1) --border: rgba(255, 179, 0, 0.15)
  --border2: rgba(255, 179, 0, 0.3);
```

### Typography

| Element             | Font            | Size                             |
| ------------------- | --------------- | -------------------------------- |
| H1 hero             | VT323           | 4–6rem, letter-spacing 3px       |
| H2 section titles   | VT323           | 2.5rem                           |
| H3 card titles      | Share Tech Mono | 1rem                             |
| Body / descriptions | Share Tech Mono | 0.875rem                         |
| Labels / hints      | Share Tech Mono | 0.75rem, color: var(--amber-dim) |

### UI rules

- **Borders**: always `1px solid var(--border)` — never Tailwind color classes for borders
- **Border radius**: `2px` only — sharp CRT feel, never `rounded-lg` or larger
- **Scanlines**: `<ScanlineOverlay />` on hero and full-width sections
- **Cursor blink**: CSS keyframe animation on `_` characters
- **No shadows**: flat only, no `box-shadow`
- **No gradients**: flat fills only
- **Hover**: border → `var(--border2)`, text → `var(--amber3)`
- **Button variants**:
  - Primary: `background: var(--amber); color: #000`
  - Outline: `border: 1px solid var(--border2); color: var(--amber); background: transparent`
- **Section labels**: `// SECTION_NAME —` format, uppercase, letter-spacing 3px, color: var(--amber-dim)

### Tailwind usage rule

Use Tailwind for layout only (flex, grid, gap, padding, margin). Use CSS variables for all colors.

```tsx
// CORRECT
<div className="flex flex-col gap-4" style={{ color: 'var(--amber)' }}>

// WRONG
<div className="flex flex-col gap-4 text-yellow-400">
```

## Sections

### Hero

- Typing animation cycling through 3–4 roles, written in plain TypeScript (no library)
- Blinking `_` cursor
- Two CTA buttons: "View Projects" + "Contact Me"

### About

- Static text — owner writes their own content in PL and EN
- No external data fetching

### GitHub Projects

- Endpoint: `GET https://api.github.com/users/{username}/repos?sort=updated&per_page=12`
- Show: name, description, primary language, star count, link
- Cache via Next.js API route with `revalidate: 3600`
- Language → badge color via a hardcoded map (Python = blue, TypeScript = teal, etc.)

### GitHub Activity Heatmap

- 52-week contribution grid
- Amber color scale with 5 levels (empty → full)
- Fetch via GitHub GraphQL API or public proxy

### AI Chatbot

- API route `POST /api/chat` proxies requests to Anthropic API
- Model: `claude-haiku-4-5` (fast and cheap for chat)
- System prompt describes the owner — owner fills this in themselves
- Floating widget, bottom-right, toggleable
- API key stays server-side only, never exposed to client

### Tech Stack

- Hardcoded array of technologies grouped by category
- Owner maintains this list themselves

### Frontend Websites

- Hardcoded array: title, description, screenshot, live URL, tech tags
- Owner fills in their own projects

### Contact Form

- Fields: name, email, message
- Sent via API route (Resend or Nodemailer)
- Amber-styled success and error feedback

## i18n

Library: `next-intl`

- Routes: `/pl/...` and `/en/...`, root `/` redirects to `/pl`
- Owner writes all strings in `messages/pl.json` and `messages/en.json`
- Never generate or assume translation content — always ask the owner

## Environment variables

```env
# .env.local — never commit this file
ANTHROPIC_API_KEY=
GITHUB_USERNAME=
RESEND_API_KEY=
```

## Code style

- TypeScript strict mode throughout
- Component props typed with interfaces, not inline types
- Functional components only
- Default export for pages and layouts, named exports for all other components
- File naming: PascalCase for components, camelCase for utilities
- No `any` — always type properly
- Prefer Server Components; use Client Components only for interactive elements (chatbot, contact form, typing animation)
- Every API route must return typed JSON with proper HTTP status codes

## Commands

```bash
npm run dev      # dev server on localhost:3000
npm run build    # production build
npm run lint     # ESLint
```

## Hard rules — never do these

- Do not change any color values — design is final
- Do not add npm packages without asking the owner first
- Do not use `px` for font sizes — use `rem`
- Do not expose API keys in client-side code
- Do not use `any` in TypeScript
- Do not write translation content — owner writes all text
- Do not add animations other than: cursor blink, typing effect, hover transitions
- Do not use border radius larger than `2px` on cards or buttons
