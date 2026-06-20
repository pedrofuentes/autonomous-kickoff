# Product

> Design context for the **autonomous-kickoff** marketing + reference website (lives in `site/`).
> Self-answered from the project per the operator's instruction; the operator's one stated input is "dark theme."

## Register

brand

## Users

Builders, indie founders, and engineering leads evaluating an autonomous, end-to-end AI build system. They are technical and skeptical of AI hype: they have seen one-shot "build me an app" prompts stall halfway, and they want proof of rigor (tests, independent review, version control discipline) and proof of control (a human stays in charge) before they would trust an agent to run unattended. They arrive to (1) understand quickly what this is and why it is different, and (2) come back later to copy the exact prompts they need to run, update, or steer a build.

## Product Purpose

`autonomous-kickoff` is the **mission layer** on top of the [`agents-template`](https://github.com/pedrofuentes/agents-template) + **Sentinel** harness. It turns a goal into a finished, shipped product: a single product-agnostic prompt reads one short per-project brief (`MISSION.md`) and then researches, plans, builds test-first in isolated worktrees, reviews every change through the independent Sentinel gate, ships, and keeps working — milestone by milestone — until a Definition of Done is met. The website exists to make that idea legible and trustworthy in under a minute, and to be the durable, copy-paste **reference** for the prompt library and vocabulary an operator returns to. Success: a qualified visitor understands the why/how, trusts it enough to try a run, and can find and copy the right prompt without reading the source.

## Brand Personality

Autonomous, rigorous, trustworthy. Voice: a founding engineer at mission control — precise, calm, confident; explains the machinery instead of hyping it. Shows the system (a real diagram, the real prompts, the real review gate) rather than asserting "powered by AI." Evokes the steady confidence of a launch console with a live telemetry pulse: something is always working, and it is under control.

## Anti-references

- **Generic dark SaaS landing page**: purple/indigo gradient hero, glassmorphism, the hero-metric template (big number + tiny label), identical icon-card grids, a tiny uppercase tracked eyebrow above every section. This is the saturated AI reflex and is explicitly off-limits — including the literal "Linear-adjacent indigo productivity tool" the palette seed suggested.
- **Terminal-green "hacker" costume** (first-order dev-tool reflex) and **fintech navy-and-gold** / **editorial-magazine serif** (second-order reflexes). Mono is used only where it is functional (real prompt/code blocks, telemetry labels), never as decorative "technical" shorthand.
- Anything where a visitor could say "an AI made that" without hesitation.

## Design Principles

1. **Practice what you preach.** The site is itself an agent-crafted, rigorously built artifact; the craft is the argument.
2. **Show, don't tell.** A real system diagram, the real prompts, the real Sentinel verdict states — not adjectives.
3. **Control and trust, forward.** Identity, authorization tiers, untrusted-input boundary, and one-way guardrails are first-class content, not fine print.
4. **Reference-grade clarity.** The prompt library is copy-exact (straight quotes), deep-linkable, and faithful to the canonical docs — an operator can rely on it.
5. **One signal, one system.** A single decisive accent carries the "live/heartbeat" identity; everything else is quiet console graphite so the signal means something.

## Accessibility & Inclusion

Target WCAG 2.1 AA. Body text ≥ 4.5:1, large/bold ≥ 3:1 against its background. Full keyboard operability with a visible, high-contrast focus ring; semantic landmarks and headings; copy buttons that announce success via an ARIA live region. Honor `prefers-reduced-motion` for every animation (the continuous "heartbeat"/loop motion has a static fallback). No information conveyed by color alone (Sentinel verdict states pair color with a label/icon).
