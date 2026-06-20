# Design

> Visual system for the **autonomous-kickoff** website. Dark theme (operator preference). Register: brand.
> Implemented as tokens in `site/assets/css/tokens.css`; values in OKLCH.

## Theme

**Scene sentence:** A founding engineer watches a launch console at night — deep graphite instrument panels, white telemetry type, and a single warm ember pulse that says the system is alive and working.

This forces **dark**. The mood lives in the **brand signal + typography**, not in a tinted-warm surface. Color strategy: **Committed** — a quiet cool-graphite console carrying one decisive warm **ember** signal. We deliberately depart from the generated violet seed (`oklch(0.50 0.16 280)`, described as "Linear-adjacent indigo productivity tool") because it lands in a named anti-reference; we keep only its *coolness*, retuned to a neutral instrument-graphite, and let a warm ember be the brand. Named references for the lane: **Vercel** near-black restraint (architecture), the warm-signal-on-cool-console contrast of an **aerospace mission console / oscilloscope**, **Stripe**-grade craft density (not its palette).

## Color (OKLCH)

### Surfaces (cool graphite, faint instrument tint, chroma kept low)
- `--bg:        oklch(0.150 0.014 256)`  — deepest console / page
- `--bg-raised: oklch(0.185 0.016 256)`  — panel
- `--surface:   oklch(0.215 0.018 256)`  — card / raised
- `--surface-hi:oklch(0.255 0.020 256)`  — hover / elevated
- `--hairline:  oklch(0.320 0.020 256)`  — 1px borders (also `--hairline-soft` via white @ 8%)

### Ink (near-white, faint cool — verified high contrast on `--bg`)
- `--ink:    oklch(0.965 0.004 256)`  — primary text (~16:1 on bg)
- `--ink-2:  oklch(0.820 0.012 256)`  — secondary text (≥4.5:1 on bg & surface)
- `--muted:  oklch(0.680 0.014 256)`  — tertiary / captions / telemetry labels (large or non-body only; verify ≥4.5:1 per use)

### Signal — ember (THE brand color; used sparingly: heartbeat, loop stroke, primary CTA, focus, link accent, key numbers)
- `--signal:      oklch(0.760 0.150 64)`  — primary ember
- `--signal-hi:   oklch(0.830 0.150 70)`  — bright / hover
- `--signal-link: oklch(0.815 0.130 72)`  — inline link text (≥4.5:1 on bg/surface)
- `--on-signal:   oklch(0.180 0.020 60)`  — text on an ember fill (dark, ≥4.5:1 on the bright button)
- `--signal-glow: oklch(0.760 0.150 64 / 0.35)` — glow/shadow tint

### Semantic (Sentinel verdicts + status — always paired with a label/icon, never color-only)
- `--ok:        oklch(0.780 0.150 152)`  — APPROVED / merged / green checks
- `--warn:      oklch(0.850 0.130 100)`  — CONDITIONAL / pending decision
- `--danger:    oklch(0.680 0.180 25)`   — REJECTED / blocked / high-sev
- Each has a `*-dim` (same hue, lower L/C) for soft backgrounds at ~12% over surface.

## Typography

Three families, each off impeccable's reflex-reject list, paired on a contrast axis (industrial grotesque vs humanist) + a functional mono.
- **Display / headings:** **Archivo** (600/700/800) — industrial grotesque, signage confidence. `letter-spacing` -0.02 to -0.03em on large sizes; `text-wrap: balance` on h1–h3.
- **Body / UI:** **Hanken Grotesk** (400/500/600) — humanist, highly legible at length; `text-wrap: pretty` on prose. Measure capped 65–72ch.
- **Mono:** **JetBrains Mono** (400/500) — prompt/code blocks and small telemetry/console labels ONLY (functional, not costume).

**Scale** (fluid `clamp()`, ratio ≈ 1.25–1.30; base 17px):
- `--text-xs: .82rem` · `--text-sm: .92rem` · `--text-base: 1.0625rem` · `--text-lg: clamp(1.2rem,1.05rem+.6vw,1.4rem)`
- `--text-xl: clamp(1.55rem,1.3rem+1vw,1.95rem)` · `--text-2xl: clamp(2rem,1.5rem+2vw,2.9rem)`
- `--text-3xl: clamp(2.6rem,1.8rem+3.4vw,4.1rem)` · `--display: clamp(3rem,2rem+4.6vw,5.6rem)` (max ≤ 6rem)
- Line-height: body 1.6; headings 1.06–1.14 (light-on-dark, +0.05 applied).

## Spacing, layout, shape

- **Space scale** (fluid where useful): 4,8,12,16,24,32,48,64,96,128 → `--sp-1 … --sp-10`; section padding `clamp(4rem, 8vh, 8rem)`.
- **Containers:** `--container: 72rem` (wide), `--prose: 42rem` (reading). Generous gutters; vary rhythm (tight groups, generous section breaks) — not a uniform stack.
- **Grid:** Flexbox for 1D; Grid for 2D. Breakpoint-free card rows via `repeat(auto-fit, minmax(min(100%,18rem),1fr))`. Cards used only where they're the right affordance (no nested cards, no endless identical icon-grid).
- **Radii:** `--r-sm:6px · --r:10px · --r-lg:16px · --r-pill:999px`.
- **Elevation:** soft shadows on panels; an ember `--signal-glow` only on live/heartbeat elements.
- **z-index scale:** `--z-dropdown:1000 · --z-sticky:1100 · --z-backdrop:1200 · --z-modal:1300 · --z-toast:1400 · --z-tooltip:1500`.

## Motion

- **Durations:** `--dur-1:150ms · --dur-2:250ms · --dur-3:450ms · --dur-4:700ms`. **Easing:** ease-out-expo `cubic-bezier(0.16,1,0.3,1)` (no bounce/elastic).
- **Page-load:** one orchestrated reveal of already-visible hero content (no content gated behind a class that could ship blank).
- **Continuous "heartbeat":** a low-key pulse along the loop diagram + a small live indicator, signaling continuous operation. Subtle, never distracting.
- **Section reveals:** fit the content (staggered list items where it helps); not a uniform fade-on-scroll on every block.
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` disables the continuous loop/heartbeat and swaps reveals for instant/crossfade. Required, not optional.

## Components

- **Header/nav:** sticky, transparent → graphite-blur on scroll; brand mark (ember dot = live), links to Home sections + Reference, GitHub. Keyboard + focus-visible.
- **Buttons:** primary = ember fill + `--on-signal`; secondary = ghost (hairline + ink). Clear hover/active/focus/disabled.
- **Hero loop diagram:** bespoke animated SVG (see Imagery) — the signature motif.
- **Phase pipeline:** a horizontal/[]vertical stepper (Phase 0 → … → Ship) with artifact-gate chips; not an icon-card grid.
- **Sentinel verdict block:** APPROVED / CONDITIONAL / REJECTED states with icon + color + label.
- **Prompt card (Reference):** titled, mono block in `--bg-raised`, **Copy** button (top-right) with live-region "Copied" feedback; deep-link anchor.
- **Vocabulary tables:** labels / Board Status / authorization tiers / Decision directives — quiet, scannable, semantic color chips.
- **Footer:** repo + agents-template + Sentinel links, license, version badge (from `template/docs/VERSION`).
- **Section header pattern:** a strong heading + lead; **vary the cadence** — no repeated uppercase eyebrow, no 01/02/03 scaffolding on every section.

## Imagery

No stock photography (no physical product). Imagery is **bespoke and generated**: the hero **autonomous-loop system diagram** (brief → sub-agent fleet in worktrees → Sentinel gate → merge → board heartbeat → loop) built as semantic, animated SVG — it is simultaneously the decisive brand visual and the "how it works" explainer. Supporting visuals (phase pipeline, verdict states, fleet hierarchy) are also semantic SVG/CSS. No colored-block placeholders where a visual belongs.
