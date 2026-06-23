# Changelog

All notable changes to the **autonomous-kickoff** template are recorded here. Versioning follows
[Semantic Versioning](https://semver.org/) mapped to the **prompt contract**:

- **MAJOR** — breaking changes to the public prompts, the label/Status vocabulary, or the phase structure.
- **MINOR** — additive, back-compatible features (a new optional phase, role, or piece of guidance).
- **PATCH** — wording fixes and clarifications.

The current version lives in [`template/docs/VERSION`](template/docs/VERSION) and travels into each
consumer's `docs/VERSION`. Releases are git-tagged `vX.Y.Z`.

## [2.4.0] — 2026-06-22

Correct the **identity/token model** for driving the board, reframe identity provisioning around the **individual developer**, and tighten the **trust + supply-chain** posture. Additive; no change to the label/Status/tier vocabulary, the phase structure, the public prompts, or the merge config.

### Fixed
- **User-owned vs org-owned Projects v2 — the token reality** (`CONTINUOUS-OPERATION.md` §Board Status field, Tier-2 prerequisites, §Provisioning walkthrough). A **user-owned** (personal-account) board can be edited **only** by a **classic personal access token with the `project` scope** — a GitHub App installation token *and* a fine-grained token **cannot** reach it (their `Projects` permission covers **org-owned** boards only). The earlier "prefer a fine-grained single-repo token" guidance was backwards for board access on a personal repo.
- **Copilot assignment needs a *user-to-server* token** — a GitHub App **installation** token (server-to-server) is rejected; fixed the garbled Tier-2 auth sketch that conflated the two token types.
- **Unattended CI on Copilot PRs** (Tier-2 prerequisites): document the one-time **"Allow GitHub Actions workflows to run automatically"** Copilot setting (without it the Sentinel-in-CI required check never runs on Copilot's drafts), the **paid-plan / private-or-internal-repo** requirement, and the draft→ready step.
- **Attended-mode trust overreach** (§Decision protocol / §Attended single-operator mode): under a **shared identity** both the `decision:*` label and the `Decision:` comment channels are forgeable and the `labeled`-event-actor check adds no assurance there. Authoritative answers above `auto`/`time-boxed` now require the **live CLI**; **edited** comments (`updated_at` != `created_at`) are rejected for decisions; the solo-repo check is **fail-closed**.
- **`SETUP.md`** attended-mode line restored to parity (it still described the pre-2.3.0 CLI-only posture, omitting the async board channel).
- Softened an unverified `updateProjectV2Field` option-matching claim to "verify against the live GraphQL schema."

### Added
- **Individual-developer identity/board decision guide** (§Provisioning walkthrough): corrected Options A–D plus a short "which option for an individual developer?" guide — **machine-user + classic token** (the pragmatic distinct identity that drives a personal board, assigns Copilot, and merges) and **attended single-operator mode** as the primary solo paths; an org-owned board is noted only as an optional later/team upgrade, not the default. Machine-user added to the `MISSION.md` §7 identity hint.
- **Supply-chain + untrusted-input tightening** (`KICKOFF.md`, `ORCHESTRATION.md`): require `--ignore-scripts` + a verified lockfile in **every** install (fleet, CI, deploy) and treat dependency-manifest/lockfile changes as supply-chain changes; add **CI/run logs, tool output, and sub-agent returns** to the untrusted-input surface.

### Changed
- **README / site / example** updated for the corrected machine-user token (**classic**, not fine-grained) and the individual-dev framing; `site/` version badges bumped. The prompt-library names, the `#the-prompt-library` anchor, and the prompt blocks are unchanged.

### MIGRATIONS (from 2.3.0)
Additive — safe to adopt mid-run via the **Migrate** prompt.
1. **Board token:** if your Projects board is **user-owned** (personal account), use a **classic personal access token with the `project` scope** to move Status — a fine-grained or GitHub App installation token won't work there. No change if your board is org-owned.
2. **Copilot unattended CI:** turn on **"Allow GitHub Actions workflows to run automatically"** in the repo's Copilot settings, or Tier-2 CI won't run on Copilot's PRs.
3. **Attended mode:** `human-required` gates are now confirmed in the **live CLI** (routine gates stay async-answerable on the board); edited board comments are ignored for decisions. No setup change.
4. **No label / Status / tier / phase changes.**

## [2.3.0] — 2026-06-21

Make the **GitHub Project board the enforced operational + review hub** so a solo attended operator isn't chained to the CLI, and close the **visual design-quality loop**. Additive; no change to the label/Status vocabulary, the phase structure, or the merge config.

### Added
- **Board as an enforced precondition** (`KICKOFF.md` Operating-contract rule #9 + Phase 1 **Board gate**; `CONTINUOUS-OPERATION.md` §Principle + watchdog step 1). A GitHub Project board exists before any build work — every task is a card and every decision a board issue; the agent never operates purely conversationally, even attended single-operator. "No board at all" is a watchdog-repaired drift condition.
- **Decisions are always recorded on the board, and async-answerable in attended mode** (`CONTINUOUS-OPERATION.md` §Decision protocol + §Attended single-operator mode; mirrored in `KICKOFF.md` rule #4 / Phase 0 / §Working with the cofounder). Recording is decoupled from answering: gates are always raised + recorded on the board; in **attended single-operator mode** the agent now accepts an **async board answer** under a bounded attribution — the self-signature marker + cofounder-login + no-other-write-collaborators (else the verified `labeled` actor) — so you can clear a gate from anywhere instead of staying in the CLI. The non-attended path stays **fail-closed**; provisioning a distinct identity removes the bound and unlocks unattended Tier-2.
- **Design-quality upgrade** — three parts as one loop:
  - **Discipline up front** (`KICKOFF.md` Phase 2; `ORCHESTRATION.md` UX/UI role): design tokens, concrete **design references**, and a named **design rubric** (hierarchy, spacing, contrast, alignment, type scale, token usage, component consistency, empty/loading/error states, responsive, a11y) owned by the UX specialist.
  - **A build-time visual loop** (`KICKOFF.md` Phases 4…N): render the running app with the project's **visual-verification tool**, screenshot each touched view + state, self-critique against the rubric, and iterate to the bar.
  - **Screenshots posted to the board** as design evidence (committed path and/or PR CI artifact, referenced by URL), plus a **`time-boxed` design-review gate** (reuses `needs:decision`) so you can approve design async — it never stalls the build.
- **New `MISSION.md` fields:** §2 **Design direction** and §3 **Visual verification** (both with a sensible "n/a" for non-visual products); §6 **Design/UX references** clarified as reference *links*.

### Changed
- **Definition of Done** (`KICKOFF.md` + `CONTINUOUS-OPERATION.md`): a **user-facing** milestone also requires the built UI to meet the design rubric with its design-review gate resolved.
- **README / site**: narrative reflects board-from-the-start, async attended board decisions, and the visual loop; the prompt-library names, the `#the-prompt-library` anchor, and the prompt blocks are unchanged. `site/` version badges bumped.

### MIGRATIONS (from 2.2.0)
Additive — safe to adopt mid-run via the **Migrate** prompt.
1. **Add the two new `MISSION.md` fields** to your brief: §2 **Design direction** and §3 **Visual verification** (use "n/a" for a non-visual product). The agent asks if they're absent.
2. **Expect a board from the start** — if a run was operating purely in the CLI without a board, the agent creates and seeds one before continuing.
3. **Attended single-operator runs:** the board decision channel is now **bounded-trusted** — you may answer a `Decision:` on the board, not only in the CLI. No action required; provision a distinct identity any time to go fully unattended.
4. **No label/Status/tier changes** — the design-review gate reuses `needs:decision`.

## [2.2.0] — 2026-06-20

Two behavior fixes for true co-founder-mode autonomy: make **non-implementation work actually
delegate** (close the gate-artifact authorship loophole), and let the agent **auto-capture a live
cofounder idea** as the next goal without a hand-pasted prompt. Additive; no change to the merge
config, authorization tiers, untrusted-input rules, label/Status vocabulary, or phase structure.

### Added
- **Hard per-gate delegation enforcement** (`KICKOFF.md` §How the phases run + Operating-contract
  rule #2). Each gate artifact (`PRD.md`, `USER_FLOWS.md`, `DECISIONS.md`/`ARCHITECTURE.md`) must be
  **authored by a specialist sub-agent (≠ Lead)** and red-teamed by a *different* sub-agent; a
  **per-gate self-check** records both ids before the gate passes. Closes the loophole where the Lead
  could solo-author the PRD/plan/tests as long as *some* sub-agent red-teamed it — implementation was
  the only phase where "stop & report → Sentinel" made solo work structurally impossible.
- **`producer ≠ Lead` ledger invariant for gate artifacts** (`ORCHESTRATION.md` §Delegation ledger),
  alongside the existing `producer ≠ reviewer`. The watchdog's delegation audit
  (`CONTINUOUS-OPERATION.md` step 4) now also flags a **Lead-authored gate artifact** as a Lead-solo
  collapse, not just "authored *and* reviewed solo." (The Phase-0 `none` tier waives it when recorded.)
- **Live-session idea auto-capture** (`KICKOFF.md` §Working with the cofounder + §After a milestone;
  `CONTINUOUS-OPERATION.md` §Decision protocol + watchdog step 8). When the cofounder floats an idea
  in the live session — at a milestone boundary *or* mid-build — the agent shapes it
  (draft → ask → refine), confirms in-session, records it to `ROADMAP.md`/`MISSION.md`, and continues
  — **no "Continue" prompt required**. Casual musing is shaped + confirmed before becoming committed
  scope; mid-build a confirmed idea is *queued* (it doesn't derail the active milestone). A live,
  present cofounder is the identity-verified cofounder; async/board text under a shared identity stays
  untrusted.

### Changed
- **Test/QA delegation reinforced** (`KICKOFF.md` Phases 4…N): the cumulative `AC-n` acceptance suite,
  e2e, and a11y/perf/security audits are owned by a Test/QA sub-agent — the Lead never authors the
  suites.
- **README**: the **Continue** prompt is reframed as a **fallback** for when no live session is open
  to catch a floated idea (closed / fully-stopped runs); the prompt-library names and the prompt block
  itself are unchanged.

### MIGRATIONS (from 2.1.0)
- None required. Adopt via the README **Update** prompt (re-copies the three `docs/*` + `docs/VERSION`);
  no `MISSION.md` change.

## [2.1.0] — 2026-06-19

Identity onboarding — make v2.0.0's required agent identity *easy to adopt* (guided provisioning) and give
a solo operator a safe way to *start now* (attended mode). Additive; no change to the v2.0.0 merge config,
authorization tiers, or untrusted-input rules.

### Added
- **Guided identity-provisioning walkthrough** (`CONTINUOUS-OPERATION.md` §Agent identity). When the
  Phase-0 self-check needs a distinct identity, the agent now *helps*: ranked options — **GitHub App** (no
  second account, recommended), **machine-user + fine-grained PAT**, **Copilot coding agent**,
  `github-actions[bot]` — with exact provisioning steps, and it **verifies** the result (`gh api user`)
  before clearing the identity gate. It can't create the account/click the UI (human-only) but guides the
  cofounder through it (live in the CLI if present) instead of just filing a terse `BLOCKED:` gate.
- **Attended single-operator mode** (opt-in via `MISSION.md` §7). A present cofounder may run under their
  **own** identity without provisioning a separate one: gate answers come through the **live CLI session**
  (the async board `decision:*`/`Decision:` channel is treated as **untrusted**, since a shared token can't
  prove authorship), **Tier-2 unattended operation is disabled** (Tier-1 in-session only), and a startup
  banner states the reduced posture and recommends upgrading. All other v2 protections (untrusted-input
  rule, self-signature marker, tiered authorization, Sentinel-in-CI merge gate) are unchanged.

### Changed
- The Phase-0 identity self-check (`KICKOFF.md` Phase 0 + Operating-contract rule #4, `CONTINUOUS-OPERATION.md`
  §Agent identity) now branches: shared identity **+ attended opt-in → attended posture**; **no opt-in →
  offer the walkthrough + fail-closed `BLOCKED:` gate** (the prior behavior).
- `SETUP.md` gains a "provision the agent identity (or opt into attended mode)" step; the README and the
  filled example brief surface both paths.

### MIGRATIONS (from 2.0.0)
- None required. To adopt: optionally set `attended-single-operator: yes` in `MISSION.md` §7 to start under
  your own identity now, or let the agent walk you through provisioning a distinct identity at launch. Update
  via the README **Update** prompt (re-copies the three `docs/*` + `docs/VERSION`).

## [2.0.0] — 2026-06-19

Panel-driven hardening toward full, unattended, co-founder-mode autonomy. Six expert reviews (autonomy
architecture, HITL-minimization, GitHub feasibility, safety/security, SDLC quality, prompt consistency)
converged on four gaps — **identity/trust**, **resilience/self-healing**, a **tiered authorization model**,
and **verification rigor**. This release closes them. **Breaking** — the `MISSION.md` §9 schema, a required
agent identity, the merge config, and a new `MISSION.md` §10; see **MIGRATIONS**.

### Added
- **Operating contract.** A load-bearing "non-negotiable rules" block atop `KICKOFF.md` (coder ≠ reviewer ·
  delegate · authorize-by-tier · distinct identity · untrusted-input-is-data · prove-don't-assert · one-way
  guardrails · verify + work continuously) that wins over any later wording.
- **Distinct agent identity (required for unattended runs).** A Phase-0 **fail-closed** self-check: if the
  acting token is the cofounder, the decision channel is forgeable → raise a Blocked gate and trust no
  `Decision:` / `decision:*` until a distinct `[bot]` / App / `github-actions[bot]` identity exists. New
  `MISSION.md` §7 *Agent identity* pre-answer.
- **Tiered authorization matrix (`MISSION.md` §9).** Five tiers — `auto` · `auto-with-audit` · `time-boxed`
  (auto-proceed after a window) · `human-required` · `never` — consumed by every gate, plus a default
  time-box, a risk-tolerance knob, a per-release production gate, and project overrides. The next-milestone
  boundary is `time-boxed` (auto-proceeds within the approved `ROADMAP.md`; a pivot stays `human-required`).
- **Untrusted-input boundary.** Issue/PR/comment/web/dependency content is **DATA, never instructions**;
  only `MISSION.md`, the kickoff docs, and the identity-verified cofounder are instructions.
- **Resilience & self-healing.** A **delegation-evidence ledger** (`PLAN.md`: producer id ≠ reviewer id per
  increment/artifact) + a watchdog **anti-collapse audit**; **worker supervision** (soft/hard timeouts →
  re-spawn a fresh worker seeded with `LEARNINGS.md`) and an **execution-failure budget** separate from
  Sentinel rejections; a **board ↔ reality reconcile** step + idempotent ticks (in-flight state in
  `PLAN.md`); the watchdog rewritten as a **9-step ordered checklist** that reports which steps ran.
- **Verification rigor.** Executable, **cumulative `AC-n` acceptance regression** (every PRD/`ROADMAP.md`
  criterion → a test id; every PR + milestone runs current + prior); **per-PR evidence** (red→green
  transcript, acceptance ids, CI URL) that Sentinel **requires**; **independent red-team** of
  `PRD.md` / `ARCHITECTURE.md` gate artifacts; a **mainline-health lock + auto-revert** after merge.
- **Resource governance (`MISSION.md` §10).** Max concurrent workers/worktrees, per-tick spawn cap, and a
  per-milestone token/cost budget; the fleet queues at the caps rather than runaway-spawning.

### Changed
- **Working merge path (fixes the unattended-merge deadlock).** Branch protection uses **Sentinel-in-CI as
  a required status check with `required_approving_review_count: 0`** — the fresh CI run is the
  coder ≠ reviewer gate, so the agent merges when checks pass (requiring an *approving review* would
  deadlock: an author can't approve their own PR and a bot can't either). **Harness-integrity guard:** PRs
  touching Sentinel / CI / branch-protection / scanner config are `human-required` and can't auto-merge on
  a check they could weaken.
- **Tier-2 Copilot dispatch corrected.** Use the Copilot coding agent's actor (`copilot-swe-agent[bot]`)
  and a user/App token — **not** the default `GITHUB_TOKEN` (GitHub rejects it for Copilot assignment), and
  **not** the cofounder's account.
- **CONDITIONAL restricted.** A Sentinel CONDITIONAL is valid **only** for non-correctness, non-security
  follow-ups; a correctness/security gap is REJECTED, never CONDITIONAL.
- **`capabilities: none` no longer holds the first merge.** Sentinel-in-CI already gives coder ≠ reviewer at
  the process level, so `none` is a non-blocking WARNING + cofounder notice — not a decision gate.

### Security
- **Agent process security.** The fleet's **egress** is separated from the product allowlist (new
  `MISSION.md` §5 agent-egress allowlist: GitHub + registries + declared research domains); a least-privilege
  fine-grained single-repo token; deploy/registry secrets in GitHub **Environment** secrets; secret-scanning
  **push protection**; dependency installs with `--ignore-scripts` + lockfile integrity on an unprivileged
  runner.
- **One-way guardrails / expanded NEVER.** Force-push/rewrite `main`, relaxing branch protection or the
  Sentinel gate (tighten-only), deleting branches/releases/tags/data, weakening a scanner, or editing
  `.github/workflows/**` security config without a gate. Third-party / first-time-contributor PRs and
  workflow-editing PRs are `human-required`; each release's first production deploy/publish is gated.

### MIGRATIONS (from 1.x)
1. **Provision a distinct agent identity** (a GitHub App, the Copilot coding agent `copilot-swe-agent[bot]`,
   or `github-actions[bot]`) and record it in `MISSION.md` §7 *Agent identity*. Don't run unattended under
   your personal account — the Phase-0 self-check now raises a Blocked gate if you do.
2. **Convert `MISSION.md` §9** from the old "pre-authorized / sign-off-first" bullets to the **five-tier
   matrix**; set the **default time-box**, **risk tolerance**, and **production-release gate**. Old
   "pre-authorized" → `auto`; old "sign-off first" → `human-required`.
3. **Add `MISSION.md` §10** (resource governance: concurrency caps + per-milestone cost budget) from the
   template defaults and tune.
4. **Add the `MISSION.md` §5 agent-egress allowlist** (distinct from the product's runtime origins) and move
   deploy/registry secrets into GitHub **Environment** secrets.
5. **Reconfigure branch protection on `main`:** make the **Sentinel-in-CI check required** and set
   **`required_approving_review_count: 0`**; add a protected **production Environment** with required
   reviewers; enable **secret-scanning push protection**.
6. **Make acceptance executable:** give every `MISSION.md` §8 / PRD criterion a stable `AC-n` test id; the
   suite runs the cumulative acceptance regression every PR + milestone.
7. **Mid-run?** Paste the README **Migrate** prompt — it overwrites `docs/*` from `template/docs/*`, leaves
   `MISSION.md` to you (apply steps 1–6), re-arms the watchdog, and continues without disrupting in-flight
   work.

## [1.2.0] — 2026-06-19

### Added
- **Co-founder collaboration — turning intent into action.** The agent is a thought partner that turns
  vague intent into clear, actionable, **recorded** goals (draft from a repo scan + light research → ask
  focused questions → refine to approval → write to `MISSION.md` / `ROADMAP.md` / 1-PR board issues with
  acceptance criteria), at four moments: initial vision/mission, each next milestone, any ad-hoc request,
  and applying feedback. **Channel:** shape it live in the CLI, but the **GitHub Project board is the
  system of record** — proposals as `DECISION:` issues, feedback via `Decision: changes — …` — durable
  and watchdog-resumable. Never invents product scope unilaterally.
- **Heartbeat lifecycle clarity.** A *Starting & restarting the heartbeat* guide (re-arm after
  closing/reopening the CLI, a crash, the kill switch, a project stop, or an Update/Migrate; how
  to check it's running), and an explicit answer to "does the CLI need to stay open?" (Tier 1 yes; Tier 2
  machine-off / unattended). The **Update** and **Migrate** prompts now re-arm the watchdog.

## [1.1.0] — 2026-06-19

### Added
- **Milestone-by-milestone evolution.** Work is organized into milestones in `ROADMAP.md` (M1 = MVP,
  then prioritized future milestones); the Definition of Done is evaluated **per milestone**. At each
  milestone boundary the agent reports, opens a `DECISION:` "next milestone" gate proposing the next
  ROADMAP scope, and resumes on the cofounder's approval — reusing the Decision protocol + watchdog. It
  **never builds new milestone scope unilaterally**, and stops for good only when the cofounder declares
  the project complete or the roadmap is exhausted.
- **Continuous security vigilance.** The agent enables and monitors **Dependabot**, **CodeQL code
  scanning**, and **secret scanning**: each watchdog tick it triages new alerts and Dependabot PRs onto
  the board as `security` issues (high/critical preempt the queue) and fixes them via TDD + Sentinel.
  **No open high/critical alert (and no detected secret) is a release / Definition-of-Done gate.**
  Routine security and dependency fixes are in-scope maintenance; a fix needing a HUMAN-REQUIRED/ASK-FIRST action still uses the normal gate. Adds the `security`
  label.

## [1.0.0] — 2026-06-19

First versioned release — declares the public prompt contract stable. Everything below is in the generic
`template/docs/*` layer; the `MISSION.md` schema is unchanged.

### Added
- **Capability probe (Phase 0).** The agent measures whether the runtime supports sub-agents and nested
  sub-agents, classifies `full | flat | none`, and degrades gracefully (warn / hold the first merge /
  Sentinel-in-CI fallback) instead of assuming.
- **Board Status lifecycle.** A standard Status field — **Todo · In Progress · Blocked · Pending Decision
  · Done** — driven across the full dev cycle, with labels + issue open/closed state as the source of
  truth and the Status column as a best-effort visual mirror. Two distinct human-input gate types:
  **Pending Decision** (`needs:decision` — you answer) vs **Blocked** (`blocked` — you act). Documents the
  `project` token scope and the safe `updateProjectV2Field` option-creation recipe.
- **Agent identity & trusted input.** A self-signature marker (`<!-- agent:autonomous-kickoff -->`),
  decision-by-label with `labeled`-event-actor verification (the agent never applies `decision:*`
  labels), and a recommendation to run the agent under a separate identity (Copilot cloud agent / a
  GitHub App / `github-actions[bot]`) for durable runs.
- **Phase-gated SDLC.** Each phase ends in an artifact gate (`PRD.md` → optional `USER_FLOWS.md` →
  `DECISIONS.md` + `ARCHITECTURE.md` → Sentinel-approved PRs → a verified deployed artifact), each
  produced by a specialist sub-agent; iteration stays open inside phases.
- **UX/UI Design role + conditional Phase 2** (skipped for libraries / pure backends).
- **Explicit 3-level hierarchy** (Lead → optional guild leads → workers; cap 3, default 2) and a
  strengthened Test/QA loop.
- **Versioning** itself: this `CHANGELOG.md`, `template/docs/VERSION`, and the version-aware README
  **Update** / **Migrate** prompts.

### Migration (from pre-1.0 / unversioned)
Existing projects on the pre-versioning template upgrade **additively** — safe to apply **mid-run**;
nothing rewrites history or disrupts an open PR. Use the README **"Migrate a running project"** prompt,
or do it by hand:

1. Overwrite `docs/KICKOFF.md`, `docs/ORCHESTRATION.md`, `docs/CONTINUOUS-OPERATION.md` and add
   `docs/VERSION` from the repo's `template/docs/*`. Leave `MISSION.md` untouched.
2. Ensure the GitHub Project **Status** field has `Todo · In Progress · Blocked · Pending Decision ·
   Done` (create the two new options per `CONTINUOUS-OPERATION.md` §Board Status field — needs the
   `project` token scope), and that the label vocabulary exists: `ready`, `needs:decision`, `blocked`,
   `decision:approved`, `decision:changes`, `sentinel:important`, `sentinel:minor`, `flaky` (the
   `claimed:<agent-id>` labels are created on the fly when claiming work).
3. Adopt the trust rules: **self-sign** every comment with `<!-- agent:autonomous-kickoff -->`, **never**
   apply `decision:*` labels, and resolve decisions via the cofounder's `decision:*` label (verify the
   `labeled` actor) or an un-self-signed `Decision:` comment.
4. **Keep all in-flight cards, worktrees, and the current increment as-is.** Apply the new phase
   artifact-gates and the conditional UX phase only to work **not yet started** — don't redo finished
   phases. Run the Phase 0 capability probe if you never did.
5. Record the new `docs/VERSION` in `PLAN.md` and continue the build.

[1.2.0]: https://github.com/pedrofuentes/autonomous-kickoff/releases/tag/v1.2.0
[1.1.0]: https://github.com/pedrofuentes/autonomous-kickoff/releases/tag/v1.1.0
[1.0.0]: https://github.com/pedrofuentes/autonomous-kickoff/releases/tag/v1.0.0
