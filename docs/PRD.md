# PRD.md — NeuricBuild Agency Portfolio Website

## 1. Project Overview

**Project name:** NeuricBuild Portfolio
**Type:** Marketing/portfolio website for AI-powered social media agency (web dev, social media, content creation)
**Primary goal:** Convert visitors (local Pakistani businesses + international clients) into WhatsApp leads
**Primary CTA:** WhatsApp (structured, pre-filled message on send — see Section 9)

## 2. Tech Stack (Locked)

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| UI Library | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Scroll animation | GSAP + ScrollTrigger |
| Micro-interactions | Framer Motion |
| Forms | React Hook Form + Zod validation |
| Hosting | Vercel (free tier) |
| Fonts | Self-hosted via next/font |
| Icons | Lucide React |
| Image handling | next/image, WebP/AVIF |

---

## 3. Design Direction

### 3.1 Color Theme
| Token | Hex | Role |
|---|---|---|
| Primary (Orange) | `#FF6600` | Primary CTA, accents, active states |
| Secondary (Green) | `#8FD14F` | Success/growth indicators, secondary accents |
| Accent (Purple) | `#604CC3` | Highlights, gradients (used sparingly, see below), hover states |
| Background (Dark) | `#0A0A0F` (suggested) | Base background — confirm in DESIGN.md |
| Neutral text | `#E5E5E5` / `#9A9A9A` | Body copy, muted text |

**Critical constraint — "no AI-generated-looking gradients":**
This means avoiding the generic purple-to-pink-to-blue radial blob gradients seen on every SaaS template. Instead:
- Use **solid color blocks** with sharp or subtly rounded edges
- Where gradients are used, keep them **linear, low-saturation, and restricted to 2 of the 3 brand colors max** (e.g., orange → purple, not a rainbow wash)
- Prefer **noise/grain texture overlays**, **duotone images**, and **geometric shapes** (lines, dots, grids) over soft blurry orbs
- Full gradient rules, exact angles, and opacity values to be finalized in DESIGN.md

### 3.2 Animation Requirements
- **Scroll-triggered animations** on every major section (GSAP ScrollTrigger): fade-up, stagger-reveal for cards/lists, pinned sections for process/services steps, parallax on hero and images
- **Hover effects maximized** — every interactive element (buttons, cards, nav links, portfolio thumbnails, service icons) must have a distinct hover state: scale, color shift, magnetic cursor pull, border glow, icon animation, or reveal-on-hover overlay. Specific hover treatments to be itemized per component in DESIGN.md
- **Page transitions:** smooth fade/slide between routes (Framer Motion `AnimatePresence`)
- **Performance rule:** all animations must respect `prefers-reduced-motion`; lazy-load below-fold animations

### 3.3 Responsiveness
- Mobile-first build, breakpoints: 375px / 768px / 1024px / 1440px
- Touch-friendly hit areas (min 44px) on mobile — hover effects degrade to tap/active states on touch devices
- WhatsApp CTA must be a **sticky/floating button on mobile** (see Section 9)

---

## 4. Sitemap

1. Home
2. Services
3. Portfolio / Work
4. About
5. Pricing
6. Testimonials / Results
7. Contact
8. FAQ
9. (Global) Why Choose Us — embedded in Home, not standalone

---

## 5. Page-by-Page Detail

### 5.1 Home

| Section | Content | Animation notes |
|---|---|---|
| **Hero** | Headline (value prop), subheadline, primary WhatsApp CTA button, secondary "View Work" button. Background: phone-mockup-scroll animated video (muted, autoplay, loop) or Lottie fallback | Text staggers in on load; video/visual has subtle parallax on scroll; CTA button has magnetic hover |
| **Services overview** | 5 service cards (icon + title + 1-line desc + status badge: Active/Upcoming) — see Section 5.2 for full list | Cards fade/stagger in on scroll; icon animates on hover (rotate/morph subtly) |
| **Featured work** | 3-4 case study preview cards (thumbnail, client name, key metric e.g. "+120% engagement") | Horizontal scroll-snap or grid reveal; image zooms slightly on hover |
| **Why Choose Us** *(new — was in "extra sections", placing here for flow)* | 3-4 differentiators: AI-powered workflow, fast turnaround, local + international experience, transparent pricing | Icon + stat counter animation on scroll-into-view |
| **Social proof** | Testimonial carousel + trust stats (clients served, posts created, avg growth %) | Counter count-up animation triggered on scroll |
| **Process teaser** | 3-step visual: Strategy → Create → Grow (icon animation per your earlier spec) | Connected line draws in on scroll (SVG stroke animation), steps reveal sequentially |
| **Final CTA** | Bold restated CTA + WhatsApp button | Full-width colored section, button pulse/glow idle animation |

### 5.2 Services (full detail — corrected structure)

**Active services:**
1. **Website Development**
   - Sub-detail: landing pages, full business sites, e-commerce, web apps
   - Include: tech badges (Next.js, React), turnaround time, starting price or "custom quote"
2. **Social Media Post Design**
   - Sub-detail: feed design, story templates, branded post sets, monthly volume tiers
3. **Content Creation Plan for Brands**
   - Sub-detail: content calendar strategy, caption writing, hashtag research, posting plan

**Upcoming services** (show with "Coming Soon" badge — builds anticipation, don't let people book yet):
4. **AI Chatbots / Reply Agents for Business** — short teaser description, "Join waitlist" micro-CTA
5. **Meta Ads Management** — short teaser description, "Join waitlist" micro-CTA

**Per-service card should include:**
- Icon (animated per hover)
- Title + status badge
- 2-3 line description
- "What's included" bullet list (3-4 items)
- CTA: "Get Quote via WhatsApp" (pre-fills service name into the WhatsApp form — see Section 9)

### 5.3 Portfolio / Work
- Grid layout, filterable by: **Industry** (restaurant, real estate, healthcare, retail, etc.) and **Service type** (web dev, social media, content)
- Each case study card: cover image/video, client name, industry tag, 1-line result
- Click-through to case study detail (modal or dedicated page):
  - Challenge → Approach → Deliverables → Results (metrics: follower growth %, engagement rate, reach, or before/after screenshots)
  - Embedded Instagram/social post previews where available
- Empty state handling: since agency is growing, include placeholder/"coming soon" cards styled consistently for future clients — don't leave the grid looking sparse

### 5.4 About
- Founder story (you — position professionally, no need to hide solo-founder status; frame as "AI-augmented team" workflow strength)
- Mission/approach paragraph
- "How we work differently" — AI-powered speed + human strategy oversight
- Optional: skills/tools ticker (Next.js, GSAP, Veo3, Kling, CapCut, etc.) as a subtle animated marquee

### 5.5 Pricing
- Package tiers per service (Website Dev, Social Media Mgmt, Content Plan) — reuse your existing pricing structures
- Toggle: Monthly vs one-time (if applicable)
- Each tier: name, price (or "Starting at"), feature checklist, CTA → WhatsApp with plan pre-filled
- "Custom/Enterprise" tier → "Contact us" instead of fixed price

### 5.6 Testimonials/Results
- Client quotes (name, business, photo/logo if available)
- Metrics dashboard style section: growth stats visualized as animated counters/mini bar charts
- If testimonials are limited early on, mix in **results-only cards** (metric + industry, anonymized if needed) so section doesn't feel empty

### 5.7 Contact
- WhatsApp CTA (primary — structured form, Section 9)
- Fallback contact form (name, email, message) → could route to email via a simple API route or form service (e.g., Web3Forms, free tier)
- Socials: Instagram, LinkedIn, Facebook icons
- Optional: business hours / response time expectation ("We reply within X hours")

### 5.8 FAQ
Suggested starter questions (objection handling):
- How long does a project take?
- Do you offer monthly packages or one-time projects?
- What's your revision policy?
- Do you work with international clients?
- What do you need from me to get started?
- Do you require a contract/deposit?

Accordion UI, scroll-fade-in per item, one open at a time.

---

## 6. What Was Missing From Your Original Brief (Added)

1. **Case study detail structure** — you had "portfolio" as a page but no defined structure per case study
2. **Empty-state/placeholder strategy** — since portfolio/testimonials will be thin early on, need a plan so sections don't look empty
3. **404 page** — branded, on-theme, with CTA back to Home
4. **Legal pages** — Privacy Policy + Terms (needed if collecting form data, even minimal)
5. **SEO basics** — meta titles/descriptions per page, Open Graph tags, favicon, sitemap.xml, robots.txt
6. **Loading states** — skeleton loaders for portfolio grid, form submit states
7. **Analytics** — Vercel Analytics or GA4 for tracking WhatsApp CTA clicks specifically (conversion tracking)
8. **Form validation & error states** — required before WhatsApp handoff form is usable
9. **Accessibility baseline** — alt text, keyboard nav, color contrast check against your 3 brand colors on dark bg
10. **Favicon/OG image/social share preview**
11. **Sticky mobile WhatsApp button** — critical for conversion on mobile given WhatsApp-first strategy
12. **Reduced-motion fallback** — for accessibility + performance on low-end devices (relevant given heavy GSAP use)

---

## 7. Non-Functional Requirements
- **Performance:** Lighthouse score 90+ on mobile; lazy-load videos/images below fold
- **SEO:** SSR via Next.js, semantic HTML, structured data (LocalBusiness schema)
- **Hosting:** Vercel free tier, custom domain
- **Browser support:** last 2 versions of major browsers

---

## 8. Out of Scope (this phase)
- Blog/Insights (flagged as optional earlier — defer to phase 2)
- Client login/dashboard
- Payment integration
- Multi-language support

---

## 9. WhatsApp Structured CTA — Detailed Flow

**Goal:** Client fills a proper form → on submit, redirects to WhatsApp with a fully pre-written, structured message already populated in the chat box — client only clicks Send in WhatsApp.

### Form fields
| Field | Type | Required |
|---|---|---|
| Name | text | Yes |
| Business Name | text | Yes |
| Service Interested In | select (Website Dev / Social Media Design / Content Plan / Other) — pre-filled if coming from a specific service card | Yes |
| Budget Range | select (optional tiers) | No |
| Project Details / Message | textarea | Yes |
| Preferred Contact Time | select (Morning/Afternoon/Evening) | No |

### Technical implementation
1. Form built with React Hook Form + Zod schema validation
2. On valid submit, construct a message string, e.g.:
   ```
   Hello NeuricBuild! 👋

   Name: {name}
   Business: {business}
   Service: {service}
   Budget: {budget}
   Details: {message}
   Preferred contact time: {time}
   ```
3. URL-encode the message string
4. Redirect (via `window.location.href` or open in new tab) to:
   ```
   https://wa.me/<your-number>?text=<encoded-message>
   ```
5. WhatsApp Web/App opens with the message **already typed** in the input box — client only taps Send

### Notes
- No backend needed for this — it's a pure client-side redirect, works on Vercel free tier with zero server cost
- Test encoding carefully (line breaks need `%0A`, spaces `%20` or `+`)
- Add a loading/confirmation state ("Redirecting to WhatsApp...") for ~1s before redirect so it doesn't feel jarring
- Mobile: opens WhatsApp app directly; Desktop: opens WhatsApp Web (user must be logged in) — consider a fallback note for desktop users

---

## 10. Success Metrics
- WhatsApp CTA click-through rate
- Form completion rate (started vs submitted)
- Portfolio → Contact conversion path
- Page load speed / Lighthouse score

---

## Next Steps
1. Review this PRD, confirm corrections (stack, added sections)
2. Move to **DESIGN.md** — exact gradient rules, component-level hover specs, typography scale, spacing system, animation timing/easing values
3. Then **IMPLEMENTATION.md** for Antigravity handoff
