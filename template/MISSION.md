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
List the must-have features for the first shippable version. Everything else is post-MVP backlog.
1. {{Feature}}
2. {{Feature}}
3. {{Feature}}
- **Explicitly out of scope for v1:** {{...}}

## 5. Security, privacy & data
- **Auth model:** {{none · API token pasted & stored in-browser · OAuth · API keys · etc.}}
- **Privacy/data constraints:** {{Where user data may live; what must never leave the device/process.}}
- **Network allowlist (runtime origins the app may contact):** {{e.g., only api.example.com — or "N/A".}}
- **Known security risks to research up front:** {{e.g., a flow that may need a proxy/secret and therefore a gated decision.}}

## 6. Reuse & references
- **Prior art / code to study or port:** {{repo links + what to take from them.}}
- **Design/UX references:** {{links, or "N/A".}}

## 7. Harness pre-answers (so agents-template New-Project-Setup never stalls)
- **Coverage threshold:** {{e.g., 80 — Sentinel ratchets up; never decreases.}}
- **Git author identity (commits):** {{Name <email>}}
- **AI attribution (commit `Co-authored-by` trailer):** {{Name <email>}}
- **Sentinel method:** {{B (CI, enforced by branch protection) for production + A (sub-agent) in dev — recommended.}}
- **Enforced coding patterns:** {{project-specific conventions to enforce.}}
- **Forbidden actions (NEVER):** {{project-specific hard "never"s — secrets, egress, etc.}}
- **Enable branch protection on `main`?** {{yes/no — yes recommended.}}

## 8. Definition of Done (project-specific acceptance)
The generic kickoff already requires: tests green, coverage ≥ threshold, lint/typecheck clean, Sentinel APPROVED/CONDITIONAL on every merge, README/LICENSE/CONTRIBUTING shipped, and an empty board. **Add the acceptance unique to THIS project:**
- {{e.g., a live URL that loads · a published package install works · a binary runs on target OS · a verified privacy/network test.}}

## 9. Project-specific authorization
- **Pre-authorized without asking** (agreed up front — typically the stack deps + the CI/CD + the agreed architecture): {{list, or "the stack in §3 + standard CI + the deploy/distribution pipeline".}}
- **Always require cofounder sign-off first** (beyond the harness defaults): {{e.g., adding a backend/proxy · auth/crypto design · anything sending data off-device · heavy/unusual deps.}}
