# autonomous-kickoff

> A reusable, **product-agnostic** kickoff for fully-autonomous, end-to-end software builds — give an AI agent a goal and it researches, plans, builds (TDD + worktrees), reviews (Sentinel), ships, and **doesn't stop until it's done**. Pairs with [`agents-template`](https://github.com/pedrofuentes/agents-template).

## The idea

`agents-template` is the **harness** (quality rules: TDD, worktrees, the Sentinel review gate). `autonomous-kickoff` is the **mission layer** on top: a single prompt that turns a goal into a finished, shipped product — coordinating a fleet of sub-agents via a GitHub Project board and running continuously.

The trick to reuse: **one generic prompt, one short per-project brief.**

- **`template/docs/KICKOFF.md`** — the generic, product-neutral operating instructions. Identical across every project. Works for a web app, CLI, library, service, or bot.
- **`template/MISSION.md`** — the *only* file you fill per project: mission, users, product shape, stack, MVP, security/privacy, references, harness pre-answers, Definition-of-Done acceptance, and what's pre-authorized vs. gated.

The generic prompt reads the brief; if a field is blank it asks you once, then runs.

## What's inside

```
template/
  MISSION.md                     # the per-project brief (fill this in)
  docs/
    KICKOFF.md                   # generic autonomous-build prompt (reads MISSION.md)
    ORCHESTRATION.md             # the sub-agent "company" + merge protocol
    CONTINUOUS-OPERATION.md      # keep-it-running (watchdog/cron) + kill switch
    VERSION                      # template version (SemVer); travels into your docs/VERSION
CHANGELOG.md                     # version history + migration steps
SETUP.md                         # how to instantiate a project
examples/
  github-dashboard-MISSION.md    # a fully filled brief, for reference
```

**Versioning.** The template uses [SemVer](https://semver.org/) mapped to the prompt contract (see `CHANGELOG.md`). `template/docs/VERSION` travels into your repo as `docs/VERSION`, so an agent can tell which version it's on and the **Update** / **Migrate** prompts can compare and apply the right migrations. Releases are git-tagged `vX.Y.Z`.

## Quick start

You don't copy files by hand — like `agents-template`, you hand the agent a prompt and it sets itself up. Two steps: **set up**, then **launch**.

### 1. Set up — paste into an agent session in your project repo

> **Fetch the autonomous-kickoff template from https://github.com/pedrofuentes/autonomous-kickoff — download all files from the `template/` directory into this project's root (you'll get `MISSION.md` plus `docs/KICKOFF.md`, `docs/ORCHESTRATION.md`, `docs/CONTINUOUS-OPERATION.md`, and `docs/VERSION`). Then read `docs/KICKOFF.md`. Scan my project and auto-fill everything you can in `MISSION.md` (name, repo, stack, package manager, test runner from manifests/config); then ask me — in one batch — for the concrete facts you can't infer (MVP, security/auth, harness pre-answers, what's pre-authorized vs. gated); and for the vision-level fields (mission, target users, success vision), be a thought partner — propose a concrete draft from what you found + light research, ask me a few focused questions, and refine to my approval (help me sharpen it, don't just collect; don't invent product scope). Show me the filled `MISSION.md` for confirmation. Do NOT start building yet.**

### 2. Launch — once `MISSION.md` looks right

> **Read `docs/KICKOFF.md` (your operating instructions) and `MISSION.md` (this project's brief), then begin Phase 0. Work continuously until the current milestone's Definition of Done is met, then open the next-milestone Decision gate and continue on approval; only stop for a HUMAN-REQUIRED gate or when the project is complete.**

The agent then bootstraps `agents-template`, researches, plans, builds (TDD + Sentinel), and ships. **Prefer a single paste?** Use the Set-up prompt and append: *"…then, once I confirm `MISSION.md`, immediately read `docs/KICKOFF.md` and begin Phase 0."*

### Update an existing project to the latest template

> **Fetch the latest autonomous-kickoff template from https://github.com/pedrofuentes/autonomous-kickoff — read its `template/docs/VERSION` and compare to my `docs/VERSION`. If I'm behind, show me the `CHANGELOG.md` entries between the two versions, then update `docs/KICKOFF.md`, `docs/ORCHESTRATION.md`, `docs/CONTINUOUS-OPERATION.md` and `docs/VERSION` from `template/docs/*` (they're generic — nothing project-specific to preserve) and run any Migration steps the changelog lists for those versions. Leave my `MISSION.md` untouched. Show me a diff summary before applying, then re-arm the continuous-operation watchdog (see `CONTINUOUS-OPERATION.md`) so work resumes.**

### Migrate a running project to the latest version (mid-build)

Use this when an agent is **already building** and you want it to adopt a newer template version without disrupting the run (the Update prompt above is for a repo between sessions). Paste into the running agent's session:

> **Migrate this project to the latest autonomous-kickoff template, safely and mid-run. (1) First read and record my current `docs/VERSION` (if it's absent, treat my version as pre-1.0 / unversioned). (2) Fetch https://github.com/pedrofuentes/autonomous-kickoff and overwrite `docs/KICKOFF.md`, `docs/ORCHESTRATION.md`, `docs/CONTINUOUS-OPERATION.md` and `docs/VERSION` from its `template/docs/*`; leave `MISSION.md` untouched. (3) Read `CHANGELOG.md` and follow the Migration steps from my recorded old version up to the new one — apply them additively, without disrupting in-flight work: keep all current cards, worktrees, and the open increment as they are; create any missing board Status options and labels; adopt the new comment/identity and decision rules; and apply new phase gates only to work not yet started. (4) Re-read the three docs, record the new `docs/VERSION` in `PLAN.md`, **re-arm the watchdog**, then continue the build from where you left off — do this at the next safe point (after the current PR is opened) and report a one-line summary of what changed.**

### Manual fallback (no fetch)

```bash
git clone https://github.com/pedrofuentes/autonomous-kickoff.git /tmp/ak
cp /tmp/ak/template/MISSION.md ./MISSION.md && cp -r /tmp/ak/template/docs ./docs && rm -rf /tmp/ak
```
Then fill `MISSION.md` (model: `examples/github-dashboard-MISSION.md`) and paste the Launch prompt.

## Worked example — a tiny CLI (proof it's product-agnostic)

To show this isn't just for web apps, here's a minimal `MISSION.md` for a one-command CLI published to npm. Only the load-bearing fields are shown; the rest follow the template defaults.

```md
# MISSION — slugify-cli

## 1. Identity & mission
- Project name: slugify-cli
- Repo: yourname/slugify-cli
- Cofounder handle: @yourname
- One-line mission: A zero-dependency CLI that turns any text into a URL-safe slug.
- Target users & the problem: Devs who want consistent slugs in scripts/CI without a web tool.
- Success vision: the go-to `npx` one-liner for slugs.

## 2. Product shape
- Product type: CLI
- Hosting / distribution: npm package (`npx slugify-cli "Hello World"` → `hello-world`)
- Backend? None.

## 3. Tech stack
- Language: TypeScript · Package manager: npm · Test runner: Vitest

## 4. MVP scope (v1)
1. `slugify "<text>"` prints the slug
2. flags: `--sep <char>` (default `-`), `--lower/--no-lower`
3. reads from stdin when no argument is given

## 5. Security, privacy & data
- No auth, no network calls, no data collected. Network allowlist: N/A.

## 7. Harness pre-answers
- Coverage threshold: 90 · Sentinel: B (CI) + A (dev)
- Git identity / AI attribution: <fill in>
- NEVER: publish a release with failing tests.

## 8. Definition of Done
- `npx slugify-cli "A B"` prints `a-b` from the *published* package; README has usage + examples.

## 9. Authorization
- Pre-authorized: the §3 deps + the npm-publish CI workflow.
- Sign-off first: the npm publish token / the first `npm publish`.
```

Then, in a fresh agent session in the repo, launch:

> **Read `docs/KICKOFF.md` + `MISSION.md`, begin Phase 0.**

From there the agent: bootstraps `agents-template` → researches CLI ergonomics and writes a PRD + GitHub Project board → builds `slugify` test-first in isolated worktrees with a Sentinel review on every PR → wires an npm-publish workflow (pausing to ask you to approve the publish token, per §9) → ships → and stops once `npx slugify-cli "A B"` prints `a-b` from the published package. Same prompt, same flow — only `MISSION.md` changed.

## Keeping it always working

`CONTINUOUS-OPERATION.md` gives three tiers: the **board is the heartbeat**, a **Tier-1 in-session watchdog** (a recurring schedule that resumes the agent if it idles), and **Tier-2 durable 24/7** (a scheduled GitHub Actions cron → Copilot cloud coding agent + Sentinel-in-CI), plus a Definition of Done and a kill switch so it stops on purpose. An atomic issue-claim protocol prevents the two tiers from double-working a card. **Does the CLI need to stay open?** Only for Tier 1 — the in-session watchdog fires while your CLI session is open; Tier 2 runs machine-off, unattended. To restart the heartbeat after a stop, pause, crash, or update, see *Starting & restarting the heartbeat* in `CONTINUOUS-OPERATION.md`.

Builds run **milestone by milestone**: at each milestone's Definition of Done the agent proposes the next `ROADMAP.md` milestone via a Decision gate and resumes on your approval — so "the next round" is just you answering that gate (from anywhere). It also **continuously watches security** (Dependabot / code scanning / secret scanning), filing alerts as board issues and gating releases on high/critical vulnerabilities and any detected secret. It stops for good only when you declare the project complete or the roadmap is empty.

**Start the next round manually** (e.g., to resume a stopped run or inject a new direction):

> **A milestone shipped — start the next round: read `ROADMAP.md` and `MISSION.md`, propose the next milestone's scope as a `DECISION:` issue and @-mention me; on my approval, re-seed the board from that milestone and continue. If I've added a new direction to `ROADMAP.md`/`MISSION.md`, use that.**

## Relationship to agents-template

`autonomous-kickoff` assumes `agents-template` is the harness — Phase 0 of `KICKOFF.md` bootstraps it. That bootstrap is isolated to one paragraph, so swapping harnesses is a one-section change.

## License

MIT — see [`LICENSE`](LICENSE).
