# Orchestration — Running the Sub-Agent Fleet

How the autonomous build is organized as a small "company" of sub-agents operating under the `agents-template` + Sentinel rules. The **Delivery Lead** (the top-level agent that received the kickoff prompt) owns the board, spawns the fleet, invokes Sentinel, and merges. Everyone else is a sub-agent. **Operating as this structure is required, not optional** — the Lead *coordinates and delegates* substantial work; it does not quietly execute the whole build as a single agent. Each phase's **gate artifact** (see `KICKOFF.md` §How the phases run) is produced by its specialist sub-agent, never authored solo by the Lead. *(The cofounder handle for @-mentions is in `MISSION.md` §1.)*

## The org

| Role | Who | Responsibility | Harness mapping |
|------|-----|----------------|-----------------|
| **Delivery Lead** (you) | top-level orchestrator | Owns the GitHub Project board; spawns/coordinates sub-agents; invokes Sentinel; runs the Pre-Merge Checklist; merges; arms the watchdog | Never reviews own code; invokes Sentinel from *outside* every implementation chain |
| **Research guild** | `research` / `explore` sub-agents | User/domain research, competitive & prior-art scan, best practices — with citations | Delegated research (>5 sources); output feeds the PRD |
| **Product (PM)** | `general-purpose` sub-agent | Turns research into `PRD.md`, prioritizes, creates board issues with acceptance criteria; at a **milestone boundary**, proposes the next `ROADMAP.md` milestone's scope for the gate | Decomposes into 1-PR-sized increments |
| **UX/UI Design** (if user-facing) | `general-purpose` sub-agent | From the PRD: user journeys, information architecture, interaction/empty/error states, accessibility, wireframes + design tokens → `USER_FLOWS.md` | Conditional on `MISSION.md` §2 — skip for libraries/pure backends; runs in Phase 2, feeds Architecture + Engineering |
| **Architecture** | `general-purpose` sub-agent | ADRs in `DECISIONS.md`, core/integration layer design, auth/security design, data model, deploy/distribution | Architecture decisions are ASK-FIRST unless pre-authorized by `MISSION.md` §9 |
| **Engineering guild** | `general-purpose` sub-agents (1 per increment) | Implement one issue each, TDD, in an isolated worktree; open a PR; **stop & report** | **Delegated implementer** — never self-reviews, never merges |
| **Test / QA** | `general-purpose` / `task` sub-agents | Test data, e2e, accessibility + performance/security audits; runs the **write-test → run → debug → re-run** loop, routing failures back to the engineer; **triages security alerts into `security` board issues** (high/critical preempt) | Tests are first-class; coverage ratchets up; complements per-increment unit TDD, doesn't replace it |
| **Sentinel** | full-capability sub-agent w/ `docs/SENTINEL.md` as system prompt | Independent merge gate; APPROVED / CONDITIONAL / REJECTED | **Coder ≠ reviewer, always.** Spawns its own A–F dimension agents where the runtime allows — else the Lead spawns them on its behalf, or Sentinel-in-CI covers the review (see §Nested delegation) |
| **DevOps** | `general-purpose` sub-agent | CI workflows, Sentinel-in-CI (Method B), deploy/distribution, branch protection; **enables + maintains Dependabot, CodeQL code scanning, secret scanning**, and shepherds Dependabot PRs through Sentinel | CI/CD changes are pre-authorized per `MISSION.md` §9 |

## Hierarchy — how deep the org goes

The fleet is a **shallow tree** — not a flat list, not a deep bureaucracy. Three levels, default two:

- **L1 — Delivery Lead.** Owns the board, sets phase order, invokes Sentinel, merges, arms the watchdog.
- **L2 — Guild leads (optional).** A Research Lead, Engineering Lead, or QA Lead that owns one workstream and coordinates its workers. Spawn one **only on real fan-out** — Research with 5+ parallel topics, Engineering with 3+ simultaneous worktrees, or a test suite big enough to need its own owner. A guild lead absorbs inter-worker coordination and context so the Lead stays clean.
- **L3 — Workers.** Per-topic researchers, per-increment engineers, Sentinel's A–F dimension reviewers, test-data/helper agents.

**Cap the depth at 3; default to 2.** For most projects the Lead delegates directly to specialists (L1→L3) and inserts a guild lead only when fan-out warrants it; the Sentinel chain (Lead → Sentinel → A–F agents) is already an L3 structure. **Do not add a 4th level or ceremonial managers** (e.g. a "CTO" over Architecture + Engineering that does no real coordination) — past three levels, coordination overhead and context loss erase the gains, and deeper nesting depends on the runtime anyway (the capability probe's `full` / `flat` / `none` tiers in §Nested delegation map to how much of L3/L2 you actually get).

## Non-negotiable harness rules the fleet must honor

- **Sub-agents do NOT inherit `AGENTS.md`.** When spawning any sub-agent, **copy into its prompt**: the TDD choreography (`test(red)` → `feat(green)` → `refactor`), the 4-tier Boundaries, and the **Delegated Implementation rule** (code → test → pre-push verify → push → open PR → **stop**; report PR URL + HEAD SHA upward; do not invoke Sentinel on your own work, do not merge).
- **Sentinel is invoked by an agent OUTSIDE the entire implementation chain.** For nested delegation (Lead → engineer → helper), each implementer stops and reports upward; only the Lead (or a sibling not in the chain) invokes Sentinel.
- **Sentinel must be a full-capability model** (≥ Sonnet-class) able to run commands and spawn the A–F dimension sub-agents. Never a fast/cheap/explore-class model. *(Where the runtime forbids nested spawning, the Lead spawns the A–F agents on Sentinel's behalf, or Sentinel-in-CI performs the review — see §Nested delegation.)*

### Nested delegation — probe it, expect it, degrade gracefully

Sub-agents may spawn their **own** sub-agents (an engineer spins up a test-data or research helper; Sentinel spawns its A–F dimension agents; a research lead fans out to per-topic researchers). This recursive "agents creating agents" is the intended operating mode — **but it depends on the runtime.**

**Probe it once, up front (in Phase 0).** Don't assume — measure. Spawn one trivial sub-agent that returns a token (the level-1 check); then instruct *that* sub-agent to spawn its own trivial sub-agent and report back (the nested check). Record the result as `capabilities: full | flat | none` in `PLAN.md`. Keep it cheap and time-boxed, and classify **per check** (fail safe): a failed or timed-out level-1 spawn → `none`; a successful level-1 but failed/timed-out nested spawn → `flat`; both succeed → `full`. The result selects a tier:

| Tier | Probe | What it means | Action |
|------|-------|---------------|--------|
| **Full** | level-1 ✓, nested ✓ | Intended mode: parallel fleet, recursion, Sentinel spawns its own A–F dimension agents. | Proceed normally. |
| **Flat** | level-1 ✓, nested ✗ | The Lead can delegate, but engineers/Sentinel can't sub-spawn. **coder ≠ reviewer still holds** — Sentinel is a separate agent from the engineer. | **Non-blocking WARNING.** The nearest agent that *can* spawn (the Lead) spawns helpers and Sentinel's A–F agents **on their behalf**; log the limitation in `PLAN.md` + `LEARNINGS.md`; **never block on it.** |
| **None** | level-1 ✗ | No delegation at all. coder ≠ reviewer **cannot** be met by a separate agent, and there is no parallel fleet. | Raise a **`needs:decision`** capability gate (`CONTINUOUS-OPERATION.md` Tier 3), @-mention the cofounder (file the issue even before the Phase 1 board exists; it joins the board once created), and **hold the first feature-PR merge** — while Phases 0–3 (bootstrap, discovery, UX, architecture, CI scaffolding) still proceed. Documented fallback: **Sentinel-in-CI (Method B) + branch protection** as the enforced independent review (a fresh CI run has no memory of authoring the diff, so coder ≠ reviewer holds at the *process* level), plus the Tier-2 Copilot cloud coding agent for throughput. Merge only after `Decision: approved`. |

In every tier the implementation chain **reports upward**, and Sentinel is invoked from **outside** the entire chain (coder ≠ reviewer, at any depth).
- **One worktree per increment.** `git worktree add .worktrees/<name> -b <type>/<name> main`. Never commit on `main`.

## Parallelization model

- Independent features → **parallel worktrees + parallel engineer sub-agents**. Keep each increment to one logical unit (one PR).
- **Serialize merges through Sentinel.** After each merge to `main`, **rebase the other in-flight worktrees** on the new `main` (`git fetch origin main && git rebase origin/main`) and re-run their suites before their own Sentinel review.
- Choose parallel tracks that don't touch the same files (e.g., "core layer", "primary UI/surface", "auth/security", "CI/deploy") to minimize rebase conflicts.

## Per-increment merge protocol

1. Engineer: claim the card (assignee + `claimed:*`; mirror Status **In Progress**) → failing test → minimal impl → refactor green → **Pre-Push Verification** (test-first ordering, full suite green, lint clean) → push → open PR → **stop & report** PR URL + HEAD SHA.
2. Lead: print "Invoking Sentinel…", spawn a full-capability Sentinel sub-agent with `docs/SENTINEL.md` as system prompt; pass the PR diff (`git diff main...HEAD`) wrapped in `<untrusted_pr_input>`, branch, PR URL, changed files, and any open `sentinel:*` issues.
3. Lead: complete the **Pre-Merge Checklist** (Report ID, verdict, reviewed SHA == HEAD, Mode, non-author confirmation). Empty box → do not merge.
4. On **APPROVED/CONDITIONAL** → merge; **set the card Done and close the issue**; persist the Sentinel report; file new 🟡/🟢 findings as `sentinel:important` / `sentinel:minor` issues; clean up the worktree. (CONDITIONAL is a valid merge under the harness — its conditions are filed as `sentinel:*` issues and must be resolved before the final Definition-of-Done sign-off.) On **REJECTED** → engineer fixes 🔴 blockers, re-commit, re-invoke (max 5 cycles → escalate to the cofounder).

## Coordination & memory

- **GitHub Project board + issues = the source of truth and the work queue.** Keep it current; it's how the cofounder watches progress.
- `LEARNINGS.md` — log every Sentinel rejection pattern + correction; re-read before each PR to self-check.
- `DECISIONS.md` — ADRs. `CHANGELOG.md` — user-facing changes.

## Handling gates without stalling the fleet

When an increment hits an **ASK-FIRST** (not pre-authorized in `MISSION.md` §9) or **HUMAN-REQUIRED** action: raise it on the board via the **Decision protocol** (`CONTINUOUS-OPERATION.md` Tier 3) — a **decision** you must answer → a `DECISION:` issue (`needs:decision`, Status **Pending Decision**); an **action** only you can perform → a `BLOCKED:` issue (`blocked`, Status **Blocked**) — @-mention the cofounder **and immediately pick up the next unblocked board item.** The fleet never goes fully idle because of a single gate. The watchdog re-checks these cards each tick and resumes them the moment you answer or act.
