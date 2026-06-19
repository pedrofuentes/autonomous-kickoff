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

## 3. Tech stack
- **Language(s):** {{e.g., TypeScript}}
- **Framework(s) / key libraries:** {{e.g., React, Vite, Tailwind, Zod}}
- **Package manager:** {{npm · pnpm · uv · pip · go · cargo}}
- **Test runner / e2e:** {{e.g., Vitest + Playwright · pytest · go test}}

## 4. MVP scope (v1)
List the must-have features for the first shippable version (milestone **M1**). Everything else is post-MVP backlog — it feeds the `ROADMAP.md` milestones the agent proposes after each release via the next-milestone gate.
1. {{Feature}}
2. {{Feature}}
3. {{Feature}}
- **Explicitly out of scope for v1:** {{...}}

## 5. Security, privacy & data
- **Auth model:** {{none · API token pasted & stored in-browser · OAuth · API keys · etc.}}
- **Privacy/data constraints:** {{Where user data may live; what must never leave the device/process.}}
- **Network allowlist (runtime origins the app may contact):** {{e.g., only api.example.com — or "N/A".}}
- **Known security risks to research up front:** {{e.g., a flow that may need a proxy/secret and therefore a gated decision.}}
- **Continuous scanning:** Dependabot, code scanning (CodeQL) and secret scanning are enabled and monitored; open **high/critical** vulnerability alerts and any detected secret gate every release (lower-severity tracked on the board).

## 6. Reuse & references
- **Prior art / code to study or port:** {{repo links + what to take from them.}}
- **Design/UX references:** {{links, or "N/A".}}

## 7. Harness pre-answers (so agents-template New-Project-Setup never stalls)
- **Coverage threshold:** {{e.g., 80 — Sentinel ratchets up; never decreases.}}
- **Git author identity (commits):** {{Name <email>}}
- **AI attribution (commit `Co-authored-by` trailer):** {{Name <email>}}
- **Sentinel method:** {{B (CI, enforced by branch protection) for production + A (sub-agent) in dev — recommended.}}
- **Agent identity (for unattended runs):** {{the distinct GitHub identity the agent runs as — a GitHub App, the Copilot coding agent (`copilot-swe-agent[bot]`), or `github-actions[bot]` — NOT your personal account. Required so decisions can't be forged and the agent can merge (author ≠ approver). See `CONTINUOUS-OPERATION.md` §Agent identity.}}
- **Enforced coding patterns:** {{project-specific conventions to enforce.}}
- **Forbidden actions (NEVER):** {{project-specific hard "never"s — secrets, egress, etc.}}
- **Enable branch protection on `main`?** {{yes/no — yes recommended.}}

## 8. Definition of Done (project-specific acceptance)
The generic kickoff already requires: tests green, coverage ≥ threshold, lint/typecheck clean, Sentinel APPROVED/CONDITIONAL on every merge, README/LICENSE/CONTRIBUTING shipped, and an empty board. **Add the acceptance unique to THIS project:**
- {{e.g., a live URL that loads · a published package install works · a binary runs on target OS · a verified privacy/network test.}}

## 9. Authorization — what the agent may do without you (tiered)

The agent sorts every gated action into one of five **authorization tiers** and acts per the tier
*without asking*, except where the tier requires you. These are the defaults; override per project below.

| Tier | The agent… | Default actions in this tier |
|------|------------|------------------------------|
| **auto** | just does it | §3 stack deps + reasonable transitive build/test/lint tooling; authoring CI/CD (tests, lint/typecheck, Sentinel Method B, the scanners, the deploy pipeline); routine **reversible** architecture; **staging/preview** deploys; fixing security alerts + shepherding Dependabot PRs; merging a Sentinel-passed PR |
| **auto-with-audit** | does it, records an ADR/audit note in `DECISIONS.md` | new **non-heavy** dependencies; data-model/schema changes; new config/env vars; new internal module boundaries |
| **time-boxed** | proposes on the board and **auto-proceeds after the timeout** if you don't object | the **next milestone** *within the approved `ROADMAP.md`*; a non-heavy dep with a transitive-risk note; enabling an optional integration |
| **human-required** | **blocks until you approve** (a `decision:approved` label / review from *your* identity) | mission / scope / pivots; auth · crypto · credential · privacy-data design; the **first** production deploy or package publish; a **new backend / proxy / external origin**; **heavy or unusual** deps; **accepting** a high/critical security risk; sending user data off the §5 allowlist |
| **never** | refuses | the §7 NEVER list; committing secrets; weakening/removing Sentinel, tests, branch protection, or the scanners; force-push / history-rewrite of `main`; deleting branches, releases, or data |

- **Default time-box (auto-proceed window for the `time-boxed` tier):** {{24h}}
- **Risk tolerance:** {{conservative · balanced · aggressive}} — shifts borderline actions between
  `time-boxed` and `human-required`.
- **Project overrides** (move specific actions to a different tier): {{list, or "use the defaults above".}}
- **Pre-authorized specifics** (kept for clarity; these are `auto`): {{the stack in §3 + standard CI + the deploy/distribution pipeline.}}
