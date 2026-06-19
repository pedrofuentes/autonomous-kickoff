# SETUP — Instantiating a project from autonomous-kickoff

A 5-minute checklist to point this at a new project.

## 1. Pull the template into your project (the agent does this)
In an agent session in your project repo, paste:

> **Fetch the autonomous-kickoff template from https://github.com/pedrofuentes/autonomous-kickoff — download all files from `template/` into this project's root (`MISSION.md` + `docs/KICKOFF.md`, `docs/ORCHESTRATION.md`, `docs/CONTINUOUS-OPERATION.md`, `docs/VERSION`). Then read `docs/KICKOFF.md`, auto-fill what you can in `MISSION.md`, ask me for the concrete missing facts, and act as a thought partner to draft the vision-level fields (mission, users, success vision) with me — don't just collect, and don't invent product scope. Don't start building yet.**

Manual fallback:
```bash
git clone https://github.com/pedrofuentes/autonomous-kickoff.git /tmp/ak
cp /tmp/ak/template/MISSION.md ./MISSION.md && cp -r /tmp/ak/template/docs ./docs && rm -rf /tmp/ak
```
(Place alongside the `agents-template` files; `KICKOFF.md` Phase 0 bootstraps the harness.)

**Staying current.** The template is versioned (SemVer; see `CHANGELOG.md`), and your repo carries `docs/VERSION`. To upgrade later, paste the README **Update** prompt (between runs) or **Migrate a running project** prompt (mid-build) — both compare your `docs/VERSION` to the latest and apply the changelog's migration steps.

## 2. Fill in `MISSION.md` (the setup prompt gathers most of this)
The setup prompt auto-fills what it can infer and asks you for the rest — this is the reference list. Replace every `{{...}}`. Use `examples/github-dashboard-MISSION.md` as a worked example. Checklist:
- [ ] §1 Identity & mission — name, `owner/repo`, **cofounder handle**, one-line mission, users, success vision
- [ ] §2 Product shape — product type, hosting/distribution, backend or not
- [ ] §3 Tech stack — language, frameworks, package manager, test runner
- [ ] §4 MVP scope — the must-have v1 features (+ what's out of scope)
- [ ] §5 Security/privacy/data — auth model, constraints, network allowlist, risks to research
- [ ] §6 Reuse & references — prior art to study/port
- [ ] §7 Harness pre-answers — coverage threshold, git identity, AI attribution, Sentinel method, patterns, forbidden actions, branch protection (these stop agents-template's setup from stalling)
- [ ] §8 Definition of Done — project-specific acceptance (a live URL, a published package, etc.)
- [ ] §9 Authorization — what's pre-authorized vs. what always needs your sign-off

> Leave a field as `{{...}}` only if you *want* the agent to handle it at launch — for **vision-level** fields (mission, users, success vision) the agent acts as a **thought partner**, drafting a proposal from your repo + light research and refining it with you, not just collecting answers.

## 3. (Optional, for durable 24/7) Enable platform toggles
Per `CONTINUOUS-OPERATION.md` Tier 2: enable the Copilot coding agent, GitHub Actions, and your deploy/distribution target (e.g. Pages or a registry token).

## 4. Launch
Open a fresh agent session in the repo and paste the launch pointer from the README (or the `BEGIN…END` block in `docs/KICKOFF.md`). Watch the GitHub Project board; respond fast when @-mentioned on a gate. **Keep it running:** the **Tier-1** watchdog runs only while this CLI session is open; for **machine-off, unattended** operation enable **Tier 2** (§3). To restart the heartbeat after closing the CLI, a crash, the kill switch, or an update, see *Starting & restarting the heartbeat* in `CONTINUOUS-OPERATION.md`.

## 5. Pause/stop
See the **Kill switch** section of `CONTINUOUS-OPERATION.md`.
