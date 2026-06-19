# SETUP — Instantiating a project from autonomous-kickoff

A 5-minute checklist to point this at a new project.

## 1. Copy the files into your project
From this template's `template/` directory, copy into your project root:
- `MISSION.md`
- `docs/KICKOFF.md`, `docs/ORCHESTRATION.md`, `docs/CONTINUOUS-OPERATION.md`

(Place them alongside the `agents-template` files. If you haven't set up the harness yet, that's fine — `KICKOFF.md` Phase 0 bootstraps it.)

## 2. Fill in `MISSION.md`
Replace every `{{...}}`. Use `examples/github-dashboard-MISSION.md` as a worked example. Checklist:
- [ ] §1 Identity & mission — name, `owner/repo`, **cofounder handle**, one-line mission, users, success vision
- [ ] §2 Product shape — product type, hosting/distribution, backend or not
- [ ] §3 Tech stack — language, frameworks, package manager, test runner
- [ ] §4 MVP scope — the must-have v1 features (+ what's out of scope)
- [ ] §5 Security/privacy/data — auth model, constraints, network allowlist, risks to research
- [ ] §6 Reuse & references — prior art to study/port
- [ ] §7 Harness pre-answers — coverage threshold, git identity, AI attribution, Sentinel method, patterns, forbidden actions, branch protection (these stop agents-template's setup from stalling)
- [ ] §8 Definition of Done — project-specific acceptance (a live URL, a published package, etc.)
- [ ] §9 Authorization — what's pre-authorized vs. what always needs your sign-off

> Leave a field as `{{...}}` only if you *want* the agent to ask you about it at launch.

## 3. (Optional, for durable 24/7) Enable platform toggles
Per `CONTINUOUS-OPERATION.md` Tier 2: enable the Copilot coding agent, GitHub Actions, and your deploy/distribution target (e.g. Pages or a registry token).

## 4. Launch
Open a fresh agent session in the repo and paste the launch pointer from the README (or the `BEGIN…END` block in `docs/KICKOFF.md`). Watch the GitHub Project board; respond fast when @-mentioned on a gate.

## 5. Pause/stop
See the **Kill switch** section of `CONTINUOUS-OPERATION.md`.
