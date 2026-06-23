# MISSION — {{PROJECT_NAME}}

> **This is the per-project brief.** It is the *only* file you normally edit per project. The generic operating instructions in [`docs/KICKOFF.md`](docs/KICKOFF.md) read this file and fill every project-specific decision from it. Leave a field as `{{...}}` or `TODO` only if you truly want the agent to ask you about it at launch.
>
> Fill it in, then launch with the one-liner in the README.

---

## 1. Identity & mission
- **Project name:** {{PROJECT_NAME}}
- **Repo:** `{{owner}}/{{repo}}`
- **Cofounder handle (for @-mentions on gated decisions):** {{@handle}}
- **One-line mission:** {{What this product is and the single outcome it delivers.}}
- **Target users & the problem:** {{Who uses it and the pain it removes.}}
- **Success vision:** {{What "wildly successful" looks like — scale, adoption, the bar to clear.}}

## 2. Product shape
- **Product type:** {{e.g., static web SPA · CLI · library/package · web service/API · desktop app · bot}}
- **Hosting / distribution:** {{e.g., GitHub Pages (static, no backend) · npm/PyPI package · container/service · GitHub Release binaries}}
- **Backend?** {{none (fully client-side / self-contained) · yes (describe) — if "none", say so explicitly; adding one later is a gated decision.}}
- **Design direction:** {{for a user-facing product, the visual feel/style and design-system intent — e.g., "clean and minimal like Linear/Vercel" · reuse an existing design system / brand tokens · "no strong preference — propose one". Concrete reference *links* go in §6. "N/A" for a library / pure backend / non-visual tool.}}

## 3. Tech stack
- **Language(s):** {{e.g., TypeScript}}
- **Framework(s) / key libraries:** {{e.g., React, Vite, Tailwind, Zod}}
- **Package manager:** {{npm · pnpm · uv · pip · go · cargo}}
- **Test runner / e2e:** {{e.g., Vitest + Playwright · pytest · go test}}
- **Visual verification:** {{the browser-automation tool used to render + screenshot the running UI for the design loop — e.g., Playwright (often shared with e2e) · Puppeteer · a headless-browser CLI; "n/a" for a non-visual product.}}

## 4. MVP scope (v1)
List the must-have features for the first shippable version (milestone **M1**). Everything else is post-MVP backlog — it feeds the `ROADMAP.md` milestones the agent proposes after each release via the next-milestone gate.
1. {{Feature}}
2. {{Feature}}
3. {{Feature}}
- **Explicitly out of scope for v1:** {{...}}

## 5. Security, privacy & data
- **Auth model:** {{none · API token pasted & stored in-browser · OAuth · API keys · etc.}}
- **Privacy/data constraints:** {{Where user data may live; what must never leave the device/process.}}
- **Network allowlist (runtime origins the *product* may contact):** {{e.g., only api.example.com — or "N/A".}}
- **Agent egress allowlist (origins the *build fleet itself* may reach — distinct from the product's):** {{default: GitHub + your package registry + the research/doc domains you name. The fleet must not reach beyond this; deploy/registry secrets live in GitHub **Environment** secrets, never in the repo or a worktree.}}
- **Known security risks to research up front:** {{e.g., a flow that may need a proxy/secret and therefore a gated decision.}}
- **Continuous scanning:** Dependabot, code scanning (CodeQL) and secret scanning are enabled and monitored; open **high/critical** vulnerability alerts and any detected secret gate every release (lower-severity tracked on the board).

## 6. Reuse & references
- **Prior art / code to study or port:** {{repo links + what to take from them.}}
- **Design/UX references:** {{reference *links* — sites/products/screenshots to emulate, or "N/A". The qualitative direction goes in §2.}}

## 7. Harness pre-answers (so agents-template New-Project-Setup never stalls)
- **Coverage threshold:** {{e.g., 80 — Sentinel ratchets up; never decreases.}}
- **Git author identity (commits):** {{Name <email>}}
- **AI attribution (commit `Co-authored-by` trailer):** {{Name <email>}}
- **Sentinel method:** {{B (CI, enforced by branch protection) for production + A (sub-agent) in dev — recommended.}}
- **Agent identity (for unattended runs):** {{the distinct GitHub identity the agent runs as — a GitHub App, the Copilot coding agent (`copilot-swe-agent[bot]`), `github-actions[bot]`, or a dedicated machine-user account — NOT your personal account. Required so decisions can't be forged and the agent can merge (author ≠ approver). The agent will **walk you through provisioning** one (see `CONTINUOUS-OPERATION.md` §Agent identity).}}
- **Attended single-operator mode (opt-in)** — set `attended-single-operator:` to {{`no` (default), or `yes — I accept running under my own identity while present` to start now under your own account without a separate identity: the agent takes gate answers via the **live CLI or a bounded-trusted async board channel** (self-signature + cofounder-login + solo-repo), runs **Tier-1 only (no unattended Tier-2)**, and keeps all other v2 protections. Provision a distinct identity (above) to go fully unattended.}}
- **Enforced coding patterns:** {{project-specific conventions to enforce.}}
- **Forbidden actions (NEVER):** {{project-specific hard "never"s — secrets, egress, etc.}}
- **Enable branch protection on `main`?** {{yes/no — yes recommended.}}

## 8. Definition of Done (project-specific acceptance)
The generic kickoff already requires: tests green, coverage ≥ threshold, lint/typecheck clean, Sentinel APPROVED/CONDITIONAL on every merge, README/LICENSE/CONTRIBUTING shipped, and an empty board. **Add the acceptance unique to THIS project:**
- {{e.g., a live URL that loads · a published package install works · a binary runs on target OS · a verified privacy/network test.}}
- **Make each item executable.** Phrase every acceptance item so it maps to a stable test id (`AC-1`, `AC-2`, …) the suite checks on **every PR and every milestone** (cumulative acceptance regression) — quality is machine-verified, not asserted.

## 9. Authorization — what the agent may do without you (tiered)

The agent sorts every gated action into one of five **authorization tiers** and acts per the tier
*without asking*, except where the tier requires you. These are the defaults; override per project below.

| Tier | The agent… | Default actions in this tier |
|------|------------|------------------------------|
| **auto** | just does it | §3 stack deps + reasonable transitive build/test/lint tooling; authoring CI/CD (tests, lint/typecheck, Sentinel Method B, the scanners, the deploy pipeline); routine **reversible** architecture; **staging/preview** deploys; fixing security alerts + shepherding Dependabot PRs; merging a Sentinel-passed PR |
| **auto-with-audit** | does it, records an ADR/audit note in `DECISIONS.md` | new **non-heavy** dependencies; data-model/schema changes; new config/env vars; new internal module boundaries |
| **time-boxed** | proposes on the board and **auto-proceeds after the timeout** if you don't object | the **next milestone** *within the approved `ROADMAP.md`*; a non-heavy dep with a transitive-risk note; enabling an optional integration; a **built-UI design review** (the agent posts screenshots to a `DECISION:` issue and auto-proceeds after the window — raise to `human-required` to gate every design change) |
| **human-required** | **blocks until you approve** (a `decision:approved` label / review from *your* identity) | mission / scope / pivots; auth · crypto · credential · privacy-data design; the **first** production deploy or package publish **of each release**; a **new backend / proxy / external origin**; **heavy or unusual** deps; **accepting** a high/critical security risk; sending user data off the §5 allowlist; a **harness-integrity** PR (the Sentinel config/prompt, `AGENTS.md`, CI workflows, branch protection, or scanner config); a **third-party / first-time-contributor** PR |
| **never** | refuses | the §7 NEVER list; committing secrets; weakening/removing Sentinel, tests, branch protection, or the scanners (branch protection is **tighten-only**); force-push / history-rewrite of `main`; deleting branches, releases, tags, or data; changing `.github/workflows/**` security-relevant config without a `human-required` gate |

- **Default time-box (auto-proceed window for the `time-boxed` tier):** {{24h}}
- **Risk tolerance:** {{conservative · balanced · aggressive}} — shifts borderline actions between
  `time-boxed` and `human-required`.
- **Production release gate:** {{human-required}} — the first production deploy/publish *of each release*
  (staging/preview stays `auto`); set to `time-boxed` or `auto` only if you accept shipping to production
  unattended. Enforce it with a protected **Environment** (required reviewers) on the production job.
- **Project overrides** (move specific actions to a different tier): {{list, or "use the defaults above".}}
- **Pre-authorized specifics** (kept for clarity; these are `auto`): {{the stack in §3 + standard CI + the deploy/distribution pipeline.}}

## 10. Resource governance (concurrency & cost)

Caps the fleet so it can't runaway-spawn or overspend. Defaults below; override per project. The
orchestrator and watchdog honor these — on breach they **queue** new work and finish in-flight increments
first; they never exceed a cap.
- **Max concurrent workers / worktrees:** {{4}}
- **Per-watchdog-tick spawn cap:** {{3}}
- **Per-milestone token/cost budget (soft — queue at the cap, raise a `needs:decision` to exceed):** {{set a number, or "no cap".}}
