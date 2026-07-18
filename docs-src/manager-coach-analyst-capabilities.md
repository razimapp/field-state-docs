<!--
canonical: docs-src/manager-coach-analyst-capabilities.md
html-export: ../manager-coach-analyst-capabilities.html
audience: managers, coaches, analysts, players, Vlad, prospective investor
owner: Razim Wasti
status: discussion draft
last-reviewed: 2026-07-18
confidentiality: shareable product capability outline
-->

# Fieldstate Capabilities by Stage

## Purpose

This page outlines what Fieldstate can offer managers, coaches, analysts, and players at each stage of development. The aim is to make the roadmap commercially understandable while separating current MVP capability from later funded ambition.

## Product Thesis

Football analysis tools help teams understand what happened. Fieldstate is designed to help teams test what could have happened if a decision changed.

## Role Distinctions

- **Manager:** strategic priorities, football risk, match preparation, recruitment signals, and what should change.
- **Coach:** training-ground translation, behaviour change, player feedback, and teachable clips.
- **Analyst:** evidence, filtering, model gates, repeatability, reports, and what the data supports.
- **Player Portal:** self-improvement, reflection, assigned moments, coach notes, and personal scenario practice.

Player Portal turns coaching conversations into trackable reflection and improvement loops. It supports face-to-face coaching; it does not replace it.

## Stage 1 - Pass Decision MVP

Open one pass, adjust the target, and explain how the likely completion, value and risk changes.

### Manager Capability

- Review one key decision quickly.
- Ask whether a better passing option existed.
- Use the moment as a staff discussion starter.
- See simple value, risk and probability language without technical detail.

### Coach Capability

- Show the recorded pass and visible options.
- Compare the actual pass with an edited pass target.
- Explain timing, pressure and receiver availability.
- Use the visual as a face-to-face coaching aid.

### Analyst Capability

- Select real event-data pass moments.
- Use 360 freeze-frame context where available.
- Run original vs edited pass scenario.
- Review completion probability, value proxy, turnover-risk proxy and evidence.

### Player Portal Capability

- Review one assigned personal pass moment.
- See a coach or analyst note.
- Compare actual choice with an alternative.
- Add a short reflection.
- No messaging integrations at this stage.
- No chat or third-party messaging at this stage.
- No live tracking, 3D simulation or neural scenario model at this stage.
- No neural scenario model at this stage.

### UI Features

- 2D rectangular pitch preview.
- Player markers as simple rectangles or dots.
- Recorded pass arrow.
- Visible passing options.
- Actual vs edited pass comparison.
- Probability, value and risk cards.
- Reflection note field for assigned player moment.

### Football Features

- Pass decision review.
- Visible receiver-option analysis.
- Completion probability.
- Turnover-risk proxy.
- Simple continuation branches.
- Coach-led player reflection.

### Data and Model Requirement

- StatsBomb-style event data, 360 freeze frames where available, event-only pass-completion model, deterministic scenario logic and evidence-gated outputs.

### Boundary

- Pass analysis only. No penalties, corners, free kicks, live tracking, 3D simulation, chat integration or neural scenario engine.

## Stage 2 - Pilot-Ready Pass Analysis Product

Turn the pass MVP into a repeatable workflow for matches, players, coaches and reports.

### Manager Capability

- Open a match and see ranked pass-decision moments.
- Identify the five to ten decisions worth discussing with staff.
- Export a clear review pack for a player, unit or team meeting.
- Compare whether repeated decision patterns are helping or hurting the team.

### Coach Capability

- Build coaching clips around pass choices.
- Group moments by build-up, final-third entry, pressure escape, switch opportunity and turnover.
- Use player-facing visuals for actual choice, available option, likely risk and likely value.
- Track whether a player improves decision selection over time.

### Analyst Capability

- Save moments and build reports.
- Filter by period, pitch zone, pressure, pass length, receiver availability and possession context.
- Compare players and teams on pass-decision profiles.
- Use calibrated pass probability and evidence badges in scenario reports.

### Player Portal Capability

- Open a personal dashboard.
- Receive assigned clips from coach or analyst.
- Read coach notes.
- Reply with short reflection.
- Track personal goals and progress history.
- Use in-platform notes only; external messaging remains later.

### UI Features

- Match selector.
- Competition, team and player filters.
- Ranked decision cards.
- Saved moments library.
- Coach view and player view toggle.
- Exportable report.
- Player dashboard with assigned clips, notes and reflections.

### Football Features

- Ranked pass moments.
- Pass and carry grouping.
- Player pass-decision profile.
- Repeated decision-pattern review.
- Improvement tracking.
- Coaching follow-up loop after face-to-face feedback.

### Data and Model Requirement

- Wider open-data match set, frozen model artifacts, held-out match evaluation, calibration reporting and product-ready scenario API.

### Boundary

- Mainly pass and carry decision intelligence. Other event types remain roadmap modules. External chat integrations are not core MVP.

## Stage 3 - Data-Rich Decision Intelligence

Move from pass moments into broader tactical decision patterns across players, teams and matches.

### Manager Capability

- See how team momentum changed across the match.
- Identify the most dangerous action each team created per minute or phase.
- Compare team decision quality across matches.
- Understand whether tactical problems are isolated moments or repeatable patterns.

### Coach Capability

- Analyse carries, turnovers, receiver availability, lane pressure and possession value.
- Coach press escape, switches, final-third entries, counters and recycle decisions.
- Build player-improvement plans from repeated decision moments.
- Compare outcomes against the decisions available at the time.

### Analyst Capability

- Run similar-moment search across matches.
- Build player and team decision profiles.
- Evaluate possession value, pressure, momentum and continuation quality.
- Use richer cohorts by role, zone, pressure, pass type and game state.

### Player Portal Capability

- Use similar-moment learning mode.
- Review personalised decision trends.
- Compare role-specific benchmarks.
- See repeated habit detection.
- Receive optional notifications through club-approved channels.

### UI Features

- Momentum timeline.
- Heatmap-style pitch zones.
- Player profile cards.
- Similar-moment search.
- Team and player comparison filters.
- Evidence-backed model labels.
- Optional notification status for assigned player tasks.

### Football Features

- Possession value.
- Pitch momentum.
- Lane pressure.
- Carries and turnovers.
- Receiver availability.
- Role-specific decision cohorts.
- Player learning trends.

### Data and Model Requirement

- Licensed event data, wider 360 or tracking-style data, team-shape and pressure features, calibrated challenger models and cohort reliability checks.

### Boundary

- First serious decision-intelligence layer. It still should not claim full player movement simulation or unrestricted chat workflows.

## Stage 4 - Set-Piece and Specialist Modules

Add penalties, corners, free kicks and restarts as separate premium modules with their own data and gates.

### Manager Capability

- Understand set-piece strengths and weaknesses in simple football language.
- See where marginal gains may exist.
- Compare tendencies against opponents.
- Prioritise specialist coaching work.

### Coach Capability

- Test corner delivery zones and attacking runs.
- Review defensive marks and second-ball risk.
- Review free-kick shot versus cross decisions.
- Use penalty taker and keeper tendency reports.
- Build set-piece training plans from repeated situations.

### Analyst Capability

- Create specialist datasets for penalties, corners, free kicks and restarts.
- Evaluate outcome probabilities per set-piece type.
- Separate delivery quality, movement, marking, rebound risk and final outcome.
- Produce model cards for each set-piece module.

### Player Portal Capability

- Receive set-piece rehearsal assignments.
- Review penalty, free-kick or corner role notes.
- Complete preparation checklists.
- Add player response after training or match review.

### UI Features

- Set-piece layout board.
- Penalty panel.
- Corner delivery map.
- Free-kick wall and keeper layout.
- Restart templates.
- Specialist module reports.
- Player preparation checklist.

### Football Features

- Penalty probability.
- Keeper and taker tendency.
- Corner delivery outcomes.
- Free-kick shot/cross evaluation.
- Attacking runs.
- Marking and second-ball risk.
- Set-piece rehearsal feedback.

### Data and Model Requirement

- Dedicated set-piece event labels, setup context, freeze-frame or tracking detail, video-derived or licensed data where required and separate evaluation gates per module.

### Boundary

- Each set-piece is its own product and model problem. These should not be bundled into MVP.

## Stage 5 - Full Football What-If Engine

A football decision operating system powered by event, tracking, video and neural scenario models.

### Manager Capability

- Use Fieldstate as a football decision operating system.
- Review team identity, tactical risk, player development, recruitment and match preparation from one platform.
- Ask what should change, who improves us and where value is lost.
- Build club-specific football intelligence over time.

### Coach Capability

- Simulate multi-action tactical scenarios.
- Adjust player positions, runs, pass choices and defensive shapes.
- Compare likely consequences across several phases of play.
- Build training sessions from the decisions that most change outcomes.

### Analyst Capability

- Run tracking and video-informed scenario models.
- Use spatial-temporal neural models where evidence gates pass.
- Compare tactical branches with confidence bands.
- Monitor model drift, data coverage and release gates.
- Build club-specific intelligence from proprietary data.

### Player Portal Capability

- Use a full personal scenario sandbox.
- Try passes, runs and positioning choices.
- Compare decision paths.
- Receive confidence-labelled feedback.
- Track long-term development history.
- Use enterprise-configured integrations where the club approves them.

### UI Features

- 3D or game-style pitch view.
- Tracking containers for player and ball streams.
- Player movement paths.
- Scenario timeline.
- Team-shape editor.
- Simulation controls.
- Full Evidence Centre integration.
- Player sandbox and long-term development record.

### Football Features

- Tracking and video-informed movement.
- Neural spatial/sequence models.
- Multi-action scenario simulation.
- Player positioning adjustments.
- Team-shape what-if modelling.
- Full tactical what-if engine.
- Club-specific intelligence layer.

### Data and Model Requirement

- Licensed event, tracking and video-derived data, GPU-backed training, spatial-temporal sequence models, MLOps, monitoring, validation and domain expert review.

### Boundary

- This is the full dream platform, not the first funded sprint. It requires serious data access, compute, engineering and validation.

## Capability Summary

| Stage | Manager | Coach | Analyst | Player Portal | Product Status |
|---|---|---|---|---|---|
| 1 | Understand one pass decision | Explain actual vs alternative pass | Run pass scenario with evidence | Reflect on assigned pass moment | MVP feasible |
| 2 | Review ranked pass moments | Build player/team pass reports | Filter, save, export, compare | Assigned clips, notes and progress | Pilot-ready target |
| 3 | Understand momentum and patterns | Coach broader decisions | Model pressure, value, profiles | Personalised decision trends | Data-rich funded stage |
| 4 | Target set-piece gains | Train penalties, corners, free kicks | Build module-specific models | Set-piece rehearsal feedback | Specialist modules |
| 5 | Operate full platform | Simulate tactical alternatives | Run neural/tracking what-if engine | Personal scenario sandbox | Full dream product |

## Investor Framing

The commercial path is staged. Stage 1 opens the pass-decision room. Stage 2 makes it pilot-ready and introduces Player Portal as a coaching follow-up layer. Stage 3 expands into broader decision intelligence. Stage 4 adds premium set-piece modules. Stage 5 becomes the full football what-if engine.
