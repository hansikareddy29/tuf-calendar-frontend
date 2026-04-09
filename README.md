# TUF Wall Calendar — Interactive Date Range Picker

A polished, interactive **digital wall calendar** built with **Next.js 16 + TypeScript + Tailwind CSS v4**, closely matching the provided reference image of a physical wall calendar.

---

## ✨ Features

### Core Requirements (All Implemented)
- 🖼️ **Wall Calendar Aesthetic** — Spiral binding, full-width hero image, blue diagonal wave overlay, and Year/Month label exactly matching the reference image
- 📅 **Monthly Calendar Grid** — 7-column (Mon–Sun) grid with month navigation (prev/next)
- 🎯 **Date Range Selection** — Click start → hover preview → click end, with distinct visual states for start, end, and in-between days
- 📝 **Functional Notes Section** — Monthly notes with localStorage persistence (auto-saves with 500ms debounce, shows "✓ Saved" indicator)
- 📱 **Fully Responsive** — Side-by-side layout on desktop, stacked vertically on mobile

### Creative Enhancements
- 🌙 **Dark Mode Toggle** — Smooth light/dark theme with 0.3s transition
- 🎞️ **Smooth Animations** — Hero image crossfade + calendar grid slide animation on month change (Framer Motion)
- 🖼️ **Month-specific Hero Images** — 12 curated Unsplash images + accent colors tied to each month
- ⚡ **Micro-interactions** — Date cells scale on hover, buttons animate on press
- 📊 **Range Chip** — Shows selected range + day count with X to clear
- 📌 **Today Indicator** — Current date has a ring + dot

---

## 🏗 Architecture

```
src/
  app/
    layout.tsx          ← Root layout (Google Fonts: Inter + Outfit, metadata)
    page.tsx            ← Root page
    globals.css         ← Tailwind v4 + CSS tokens
  components/
    WallCalendar/
      index.tsx         ← Orchestrator (all state wired here)
      SpiralBinding.tsx ← Decorative SVG spiral coils
      HeroImage.tsx     ← Hero photo + SVG wave overlay + month/year label
      CalendarGrid.tsx  ← 7-col grid with animated month transitions
      DateCell.tsx      ← Day cell (today/start/end/range/hover states)
      NotesPanel.tsx    ← Lined textarea with autosave
      NavControls.tsx   ← Prev/Next month buttons
      ThemeToggle.tsx   ← Light/dark toggle
  hooks/
    useCalendar.ts      ← Date logic + range selection state machine
    useNotes.ts         ← localStorage read/write with debounce
  types/
    calendar.ts         ← TypeScript interfaces
  utils/
    dateHelpers.ts      ← Month generation, range checks, date formatting
    heroImages.ts       ← Month → Unsplash image + accent color mapping
```

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Open in browser
open http://localhost:3000
```

### Build for production
```bash
npm run build
npm start
```

---

## 🎨 Design Decisions

| Decision | Rationale |
|---|---|
| **Tailwind CSS v4** | Auto-configured by Next.js 16, no manual config needed |
| **Framer Motion** | `AnimatePresence` + `motion` for page-flip-like transitions |
| **Unsplash images** | Free, no API key required, curated per month |
| **localStorage** | Per the spec — no backend, client-side persistence only |
| **Mon-Sun week** | Matches the reference image column order |
| **Accent color per month** | Adds personality, wave color matches hero image mood |

---

## 📱 Responsive Behavior

- **Desktop (≥640px)**: Notes panel (42% width) + Calendar grid side-by-side below the hero image
- **Mobile (<640px)**: Notes panel stacks above calendar grid; both are touch-friendly

---

## 🔧 Tech Stack

- **Framework**: Next.js 16.2 (App Router)
- **Language**: TypeScript (strict mode, zero errors)
- **Styling**: Tailwind CSS v4 + custom CSS variables
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Images**: Unsplash (via `<img>` with `remotePatterns` in `next.config.ts`)
- **Persistence**: `localStorage` (client-side only)
