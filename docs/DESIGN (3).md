# DESIGN.md — NeuricBuild Agency Portfolio

## 0. Design Philosophy (from reference set)

The references share a language worth naming explicitly, because it's what we're building toward and what we're rejecting:

**What we're taking:**
- Dramatic single-subject photography with a duotone/color-wash treatment (Fluxora's red-lit portrait, AgentAI's red jellyfish) instead of soft blurry gradient orbs
- Confident oversized typography, tight letter-spacing on headlines, mixed weight/style within one headline (regular + italic, like Fluxora's "Not *Machines*")
- Floating stat cards that overlap the hero image rather than sitting in a separate section
- Asymmetric, unequal-sized grid blocks ("bento" layout) — never a flat row of identical cards
- One element in a set that visually breaks the pattern (Crypto's highlighted middle step, Forma AI's elevated Pro plan)
- Dark base with a single accent color doing the work, not a rainbow

**What we're explicitly rejecting ("AI slop"):**
- Soft radial gradient blobs (purple-pink-blue blur) as hero backgrounds
- Perfectly symmetric 3-column card grids with identical size/spacing — this pattern is **banned everywhere in this build**, including Services, Pricing, and Why Choose Us
- Generic centered hero + centered subtext + centered button with no asymmetry
- Overuse of glassmorphism without purpose
- Stock "handshake" or "team around laptop" photography

---

## 1. Typography

| Role | Font (suggestion) | Weight | Size (desktop) | Size (mobile) | Notes |
|---|---|---|---|---|---|
| Display/Hero headline | Space Grotesk or General Sans | 500–700, mixed | 64–88px | 36–44px | Mix upright + italic within one headline for emphasis word, like reference image 3 |
| Section headline | Same family | 600 | 40–48px | 28–32px | Tight letter-spacing (-2%) |
| Eyebrow/label (e.g. "Why choose us") | Same family | 500, uppercase | 13px | 12px | Letter-spacing +8%, paired with a small dot/icon prefix |
| Body | Inter or Satoshi | 400 | 16–18px | 15px | Line-height 1.6 |
| Small/meta (stats labels, tags) | Inter | 500 | 12–13px | 11–12px | Muted color |
| Stat numbers | Space Grotesk | 600–700 | 36–56px | 28–36px | Tabular numerals |

Load via `next/font/google` or self-hosted variable fonts for performance.

---

## 2. Color System (expanded from brand palette)

| Token | Hex | Usage |
|---|---|---|
| `--color-primary` | `#FF6600` | Primary CTA, active nav indicator, key accents |
| `--color-secondary` | `#8FD14F` | Growth/success stats, secondary badges |
| `--color-accent` | `#604CC3` | Secondary highlights, upcoming-service badges, hover glows |
| `--color-bg-base` | `#0B0B0F` | Page background |
| `--color-bg-surface` | `#15151C` | Card backgrounds |
| `--color-bg-surface-raised` | `#1D1D26` | Elevated/highlighted card (the "breaks the pattern" card) |
| `--color-border` | `#2A2A34` | Card borders, dividers |
| `--color-text-primary` | `#F2F2F0` | Headlines |
| `--color-text-body` | `#B4B4BC` | Body copy |
| `--color-text-muted` | `#6E6E78` | Meta/labels |

**Gradient rule (strict):** Where a gradient is used at all (button hover, card border glow, section divider), it must be:
- Linear only, 90–135° angle
- Two stops max, drawn from the brand palette only (e.g. `#FF6600 → #604CC3`)
- Never radial, never soft/blurred as a full background wash
- Confined to a thin element (border, underline, icon glow) — not a full-bleed backdrop

**Imagery rule:** Any photography used (hero, about, case studies) gets a duotone overlay using two brand colors (e.g. dark base + orange highlight, matching reference image 3/4's red wash) via CSS `mix-blend-mode: color` or `multiply` over a grayscale image — real photography, not AI-generated abstract art.

---

## 3. Layout System

- 12-column grid, max-width 1280px, gutter 24px
- Section vertical rhythm: 120px desktop / 64px mobile between major sections
- **Bento grid standard:** any set of 3+ items (services, features, stats) uses unequal spans — e.g. a 3-item set renders as one wide card (spans 6–7 cols) + two stacked narrower cards (spans 5–6 cols, stacked vertically beside it), or a 5:4:3 uneven split — never 4/4/4 or 3-equal-thirds
- Mobile: bento collapses to single column, but retains varied card heights (not all identical) to preserve the asymmetric feel

---

## 4. Navigation

Based on reference image 1 (pill nav bar):

- Floating pill-shaped nav bar, dark surface (`--color-bg-surface`), fixed top with 16px margin, becomes sticky with subtle backdrop-blur + shadow on scroll
- Active/hover state: small glowing dot or short underline in `--color-primary` beneath the active link (like the cyan dot in reference image 1, middle variant), animated with a sliding transition between links (Framer Motion `layoutId` shared-element animation)
- Logo left, links center, CTA button (WhatsApp) right — button always in `--color-primary` solid fill
- Mobile: collapses to hamburger → full-screen dark overlay menu, links stagger-fade in

---

## 5. Hero Section

Structure inspired by reference images 3 & 4 (Fluxora, AgentAI):

- Two-zone asymmetric layout: ~55% headline/copy/CTA block on one side, ~45% dramatic duotone image/video on the other (desktop). Stack on mobile, image first or headline first — test both, default headline first.
- Headline uses mixed styling: primary phrase upright bold, one key word in italic or in `--color-primary`
- 2–3 floating stat cards overlapping the image edge (glass surface, subtle border glow), each showing one metric (e.g. "50+ Projects Delivered", "AI-Powered Workflow", "48hr Avg Response") — staggered vertically, not aligned in a row
- CTA row: primary WhatsApp button (solid `--color-primary`, pill shape) + secondary ghost button ("View Work")
- Small logo/trust strip below fold-line: muted client-type icons or "Built for local & global brands" text, not fake logos

**Animation:** headline lines stagger-fade-up on load (Framer Motion, 80ms stagger); image has slow parallax scale (GSAP ScrollTrigger, scrub) as user scrolls past hero; stat cards float with a subtle idle Y-axis bob (±4px, 3s loop).

---

## 6. Services Section (bento — NOT 3-in-a-row)

5 services (3 Active + 2 Upcoming). Layout:

- **Bento grid, desktop:** Row 1 = one large featured card (Website Development, spans 7 cols) + one tall card stacked beside it (Social Media Post Design, spans 5 cols, taller). Row 2 = Content Creation Plan (spans 4 cols) + AI Chatbots "Upcoming" (spans 4 cols) + Meta Ads "Upcoming" (spans 4 cols) — even this second row varies in internal padding/icon size so it doesn't read as three identical boxes: the two "Upcoming" cards use a muted/outlined style (dashed border, lower opacity, `--color-accent` badge) versus solid-fill Active cards
- Each card: icon top-left (animates on hover — subtle rotate or morph), title, 2-line description, "what's included" bullets (Active only), status badge top-right
- CTA per Active card: small "Get Quote" link with arrow icon that slides right on hover

**Animation:** cards fade-up + slight scale-in on scroll entry, staggered by grid position (GSAP ScrollTrigger + stagger); icon hover = 300ms rotate/scale via Framer Motion `whileHover`

---

## 7. Portfolio/Work Section

Inspired by reference image 6 (Wen Launch "Our Works"):

- One large hero case-study image (full-bleed within container, spans full width or 8/12 cols) followed by two smaller case studies side by side below it — again asymmetric, not a uniform grid
- Each item: image/video thumbnail with duotone brand-color overlay on hover (image desaturates to base, then brand-color wash appears with client name + arrow icon fading in)
- Filter pills (Industry / Service type) above the grid — same pill style as nav, `--color-primary` when active

**Animation:** images have a slow Ken Burns zoom on hover (scale 1 → 1.05, 600ms ease-out); text/arrow overlay fades in 200ms; grid items fade-up on scroll entry.

---

## 8. Process Section (Strategy → Create → Grow)

Inspired by reference image 5 (Crypto site's numbered 01/02/03 cards with middle highlighted):

- Three steps, but the **middle step ("Create") is visually elevated**: raised position (negative margin-top ~24px), solid `--color-primary` fill background, while Strategy and Grow use dark outlined cards — this satisfies "no 3 identical cards in a row" since one is visually distinct in color, elevation, and size
- Each card: number label (01/02/03), icon, title, 1-2 line description
- Connecting line/path between the three (SVG), animated to draw in on scroll (`stroke-dashoffset` animation via GSAP ScrollTrigger)

---

## 9. Stats/Why Choose Us

Inspired by reference image 4 (AgentAI stat cards):

- Irregular stat card cluster, not a grid: 2 larger stat cards (big number + label) and 2 smaller supporting cards, arranged in a staggered bento block alongside a short paragraph of copy — mirrors the "3M+ / 95% / 88%" cluster in reference 4, which is deliberately uneven in size and position
- Numbers count up on scroll-into-view (GSAP + simple counter utility)

---

## 10. Testimonials/Results

- One large "featured" testimonial card (bigger, with client photo/logo, larger quote text) + a horizontal scroll-snap row of smaller quote cards beneath — avoids equal-grid feel, similar spirit to reference 4's testimonial card treatment
- Auto-scroll optional; manual drag/swipe supported on both desktop and mobile

---

## 11. Pricing Section

Inspired by reference image 7 (Forma AI) — **but reworked to avoid "3 cards in a row":**

- Instead of 3 equal-height cards side by side, the **middle/recommended tier is raised and enlarged** (like ref 7), while the outer two tiers are smaller, set lower, and slightly muted (reduced opacity border, no glow) — this creates a clear visual hierarchy (arc/stagger layout) rather than a flat row
- On mobile: stacks vertically, recommended tier shown first with a "Most Popular" ribbon
- Glass-surface card treatment (subtle background blur + border glow in `--color-primary` for the recommended tier only)
- Toggle for Monthly/One-time if applicable, styled as a pill switch (ref image 7's toggle style)

**Animation:** cards scale in from 95%→100% opacity+scale on scroll entry, recommended card slightly delayed/larger scale for emphasis.

---

## 12. Buttons & Hover States (maximized, per requirement)

| Element | Default | Hover |
|---|---|---|
| Primary CTA (WhatsApp) | Solid `--color-primary`, pill | Background darkens 10%, subtle scale 1.03, icon slides right 4px, soft outer glow in primary color |
| Secondary/ghost button | Transparent, 1px border `--color-border` | Border shifts to `--color-primary`, text color shifts to primary, background fills 8% opacity primary tint |
| Nav link | Muted text | Text brightens to white, animated underline/dot slides in |
| Service/portfolio card | Static | Card lifts (translateY -6px), border glow appears, icon/image animates (rotate or zoom) |
| Icon-only buttons (socials, arrows) | Muted icon | Icon color shifts to primary, subtle rotate (15°) or slide |
| Pricing "Choose Plan" | Outlined (non-featured) / solid (featured) | Same lift + glow treatment as primary CTA |

All hover transitions: 200–300ms, `ease-out`. Respect `prefers-reduced-motion` — disable transforms, keep only color transitions.

---

## 13. Scroll Animation Recipes (GSAP ScrollTrigger)

| Pattern | Trigger | Effect |
|---|---|---|
| Section entry | element enters 80% viewport | fade + translateY(40px → 0), 600ms ease-out |
| Staggered group (cards, bullet lists) | container enters viewport | children stagger 80–120ms apart |
| Hero image parallax | scroll through hero | image translateY scrub (slower than scroll speed) |
| Counter/stat numbers | element enters viewport | count from 0 to target over 1.2s |
| SVG line draw (process connector) | element enters viewport | stroke-dashoffset animates 100%→0 over 1s |
| Pinned section (optional, Process) | section reaches top of viewport | pin briefly while steps reveal sequentially, then release |

---

## 14. Responsive Breakpoints

| Breakpoint | Width | Notes |
|---|---|---|
| Mobile | 375–767px | Single column, bento collapses but retains varied card heights; sticky WhatsApp button fixed bottom |
| Tablet | 768–1023px | 2-column bento where possible |
| Desktop | 1024–1439px | Full bento layouts as specified |
| Wide | 1440px+ | Max-width container 1280px, extra space as margin |

---

## 15. Iconography

- Line-style icons (Lucide React), 1.5px stroke, no filled icons except inside colored badge circles
- Service icons get a colored circular/rounded-square backdrop (`--color-bg-surface-raised`) with icon in brand color
- Icon animation on hover: rotate 8–12°, or subtle scale 1.1 — never a full morph between unrelated icons (per earlier flag — AI video morphing between camera/chart/megaphone was noted as unreliable; same logic applies here, keep icon transitions to simple transforms, not shape-morphing)

---

## 16. What This Fixes vs. Generic Templates

- No flat 3-card grids anywhere (Services, Process, Pricing, Why Choose Us all use bento/staggered/elevated patterns instead)
- No blurry gradient-blob backgrounds — dark solid base + duotone photography + thin linear accent gradients only
- Hero and imagery follow the dramatic single-subject photographic treatment from the reference set, not abstract AI art
- Hierarchy created through size/elevation/color (one card breaks the pattern), not through decoration

---

## Next Steps
1. Confirm this direction, especially the pricing "staggered tiers" and services "bento" layouts
2. Move to **IMPLEMENTATION.md** — component file structure, Tailwind config (custom tokens for the palette above), GSAP/Framer Motion setup, for Antigravity handoff
