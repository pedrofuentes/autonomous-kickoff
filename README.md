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
SETUP.md                         # how to instantiate a project
examples/
  github-dashboard-MISSION.md    # a fully filled brief, for reference
```

## Quick start

1. Copy `template/MISSION.md` and `template/docs/` into your project (alongside `agents-template`'s files). See `SETUP.md`.
2. Fill in `MISSION.md` (use `examples/github-dashboard-MISSION.md` as a model).
3. In a fresh agent session in the repo, paste the launch pointer:

   > **You are launching an autonomous build. Read `docs/KICKOFF.md` (your operating instructions) and `MISSION.md` (this project's brief), then begin Phase 0. Work continuously until the Definition of Done is met; only stop for a HUMAN-REQUIRED gate or when truly done.**

   (Or paste the whole `BEGIN…END` block from `docs/KICKOFF.md`.)

## Keeping it always working

`CONTINUOUS-OPERATION.md` gives three tiers: the **board is the heartbeat**, a **Tier-1 in-session watchdog** (a recurring schedule that resumes the agent if it idles), and **Tier-2 durable 24/7** (a scheduled GitHub Actions cron → Copilot cloud coding agent + Sentinel-in-CI), plus a Definition of Done and a kill switch so it stops on purpose. An atomic issue-claim protocol prevents the two tiers from double-working a card.

## Relationship to agents-template

`autonomous-kickoff` assumes `agents-template` is the harness — Phase 0 of `KICKOFF.md` bootstraps it. That bootstrap is isolated to one paragraph, so swapping harnesses is a one-section change.

## License

MIT — see [`LICENSE`](LICENSE).
