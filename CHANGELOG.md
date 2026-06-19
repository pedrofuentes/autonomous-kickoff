# Changelog

All notable changes to the **autonomous-kickoff** template are recorded here. Versioning follows
[Semantic Versioning](https://semver.org/) mapped to the **prompt contract**:

- **MAJOR** — breaking changes to the public prompts, the label/Status vocabulary, or the phase structure.
- **MINOR** — additive, back-compatible features (a new optional phase, role, or piece of guidance).
- **PATCH** — wording fixes and clarifications.

The current version lives in [`template/docs/VERSION`](template/docs/VERSION) and travels into each
consumer's `docs/VERSION`. Releases are git-tagged `vX.Y.Z`.

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

[1.1.0]: https://github.com/pedrofuentes/autonomous-kickoff/releases/tag/v1.1.0
[1.0.0]: https://github.com/pedrofuentes/autonomous-kickoff/releases/tag/v1.0.0
