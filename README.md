# Horizon

Personal website — music & works.

## Tech Stack

- **Next.js 14** (App Router, Static Export)
- **Tailwind CSS 3.4** — styling
- **GSAP 3.12** — animations
- **Lucide React** — icons
- **TypeScript**

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build

```bash
npm run build
```

Static output is generated in `out/`.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx         # Root layout (Inter + JetBrains Mono fonts)
│   ├── page.tsx           # Home — clock, greeting, navigation
│   ├── globals.css        # Global styles
│   ├── music/page.tsx     # Custom music player
│   └── works/page.tsx     # Works grid with scroll animations
├── components/
│   ├── Clock.tsx          # Real-time clock (HH:MM)
│   └── Greeting.tsx       # Time-based greeting
└── lib/
    └── data.ts            # Tracks & works data
```

## Customization

- **Music:** add `.mp3` files to `public/music/` and update `src/lib/data.ts`
- **Works:** edit the `works` array in `src/lib/data.ts`
- **Colors:** modify `tailwind.config.ts` (accent is `#D4AF37` gold)
- **Greeting:** edit time ranges in `src/components/Greeting.tsx`
