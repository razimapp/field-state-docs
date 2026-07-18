<!--
canonical: docs-src/investor-pack-v2.md
html-export: ../investor-pack-v2.html
audience: Vlad, Valeri Ojf, prospective investors
owner: Razim Wasti
status: current
last-reviewed: 2026-07-11
-->

# Fieldstate — Investor Pack v2

## The one-paragraph version

Fieldstate is a football decision-intelligence product. It replays real match moments,
lets you move the pass, and shows the likely value and risk of the alternative —
grounded in real professional match data, with every estimate labelled as an estimate.
It can earn revenue as an analyst and storytelling tool **before** it becomes a full
AI platform, and each funding stage buys measurable evidence, not promises.

## What exists today (built and demonstrable)

- A working interactive demo on real professional matches: pass-chain replay,
  counterfactual pass editing, explainable value/risk estimates.
- A trained pass-completion probability model evaluated on **113,598 passes across
  105 matches and five competitions**, including competitions held out entirely from
  training — with calibration good enough that when it says 80%, roughly 80% of those
  passes complete. (Methodology and verification: see the model evidence explainer.)
- An evidence-gate system: no learned model output reaches the product until
  pre-registered accuracy and calibration gates pass. In a market of overclaimed
  sports AI, Fieldstate's numbers are built to survive due diligence.
- A live walkthrough is available on request.

## Why now

Football analytics sells *what happened* (event and tracking data) and *who is good*
(ratings and scouting platforms). Nobody owns *what should have been done* — the
question every coach, analyst, pundit and fan actually argues about. The wedge is an
affordable decision-review tool; the endgame is the decision layer of football:
clubs, broadcasters, and data partners querying the same counterfactual engine.

## Funding stages and figures

Each stage produces a concrete asset with its own commercial use, and each later
stage is only unlocked by the results of the one before.

| Stage | Indicative budget | What it delivers | What it unlocks |
|---|---|---|---|
| 1. Feasibility Sprint | **£15k–£30k** fixed, plus **£6.4k/month** founder-operator delivery retainer while active | Working demo on real matches, counterfactual flow, evidence pack | An asset investors, clubs and partners can touch within weeks |
| 2. Pilot-Ready Product | **£30k–£60k** | Demo made repeatable across matches; first paid pilot delivered | First revenue signal and a reference customer |
| 3. Expanded Model-Lab | **£60k–£120k** | More competitions, held-out validation, new decision signals | Measured proof accuracy improves with data |
| 4. Data & Validation | **£100k–£250k+** | Licensed premium data, domain-expert review, agreed targets | Club-grade credibility |
| 5. Proprietary Data Creation | **£150k–£350k+** | Research into generating Fieldstate's own football-state data from footage | A data asset competitors cannot license |
| 6. Scaled Product Platform | **£250k–£750k+** | Commercial platform, integrations, hardened infrastructure | Recurring revenue across clubs, media, data partners |

Supporting cost detail (data licensing tiers from ~£5k–£25k early to £25k–£100k at
validation scale; cloud costs from ~£50–£1k/month in early stages) is in the
Model/Data/Cloud cost brief. Stage budgets above are the canonical figures.

## Dream Product Preview

These are static concept previews showing the product destination. They use sample values
and do not represent live model execution. The MVP Scope funds the first usable
pass-decision product; the dream preview shows where the staged roadmap can go.

| Preview room | Purpose | Status |
|---|---|---|
| [Home / analysis launcher](../concepts/dream-app/home.html) | Choose a competition, team, match or player as the starting point. | `Concept preview` |
| [Command Centre](../concepts/dream-app/index.html) | Rank the match moments most worth reviewing. | `Concept preview` |
| [Match Room](../concepts/dream-app/match-room.html) | Turn a full match into reviewable decision moments. | `Concept preview` |
| [Moment Replay](../concepts/dream-app/moment.html) | Inspect the recorded action and the context around it. | `Concept preview` |
| [Counterfactual Lab](../concepts/dream-app/lab.html) | Test a clearly labelled alternative to the recorded choice. | `Concept preview` |
| [Evidence Centre](../concepts/dream-app/evidence.html) | Inspect model gates, release status and provenance. | `Concept preview` |
| [Scout / Player profile](../concepts/dream-app/scout.html) | Connect decision review to recruitment and development. | `Concept preview` |
| [Feed Desk](../concepts/dream-app/feed.html) | Review a compact stream of ranked analysis signals. | `Concept preview` |
| [Terminal Desk](../concepts/dream-app/terminal.html) | Explore a dense analyst workspace for deeper review. | `Concept preview` |

> **Concept only:** sample values, no live models, no production claim.

## Use of first-cheque funds (Stage 1)

Sprint fee covers: productionising the current demo into a rehearsed, repeatable
investor/club walkthrough; the evidence pack; and delivery of defined acceptance
criteria (see MVP Scope). The retainer covers continuous founder-operator delivery:
build, data pipeline, evaluation, documentation, and demo operation — the same person
who built everything to date, at materially below open-market rate for this
combination of ML engineering and product delivery, in exchange for staged commitment.

## How it earns before the big stages

Paid pilots (clubs, academies, analyst groups, media) → analyst tool subscriptions →
paid tactical report products → later, API access for partners. Stage 2 is explicitly
gated on delivering the first paid pilot.

## Team and execution

Fieldstate's product concept originated in conversation between Vlad, Valeri and
Razim; everything since — architecture, data pipeline, models, evaluation system,
demo, documentation — has been designed and built by **Razim Wasti** as founding
technical lead. The build record is fully auditable: dated session-by-session
engineering logs, versioned model-evidence artifacts pinned to code commits, and a
working product. Continuity of that record is a large part of the asset's value: the
evaluation discipline and data pipeline are not transferable by handover document.

## Technical Leadership and Delivery Discipline

Fieldstate is being built as a governed technical programme, not a loose demo.
The same discipline required of a startup CTO is already visible in the build.

| Discipline | What it means for Fieldstate |
|---|---|
| **Architecture** | Modular data, model, API, demo and evidence layers. |
| **Source control** | Auditable source-control history, session logs and controlled branches. |
| **Testing** | Automated checks for model logic, APIs, visual outputs and known cases. |
| **Evidence gates** | Frozen artifacts, calibration checks, held-out validation and safe claims. |
| **Roadmap** | Staged delivery from MVP Scope to licensed data, set pieces and full engine. |
| **Security and technical debt** | Public/private documentation separation, no premature infrastructure and debt tracked before scaling. |

This matters because the first sprint is not only about producing screens. It is
about proving that Razim can build, govern, validate and scale the technical
programme investors would be funding.

## Rights and structure

Commercial routes (founder-led venture, funded sprint, commissioned build, licence,
full IP assignment) carry different prices because they transfer different rights —
summarised in the Legal Pointer. Specific structure, roles and equity are agreed in a
term sheet with counsel; this pack deliberately contains no equity figures.

## Recommended next steps

1. Live walkthrough for Valeri (30 minutes, real matches, hands on the counterfactual).
2. Agree the Stage 1 feasibility sprint (fixed fee + retainer) — smallest commitment,
   fastest proof, clear acceptance criteria.
3. Term-sheet conversation on structure and roles in parallel, with counsel.

### Belongs here
Commercial narrative, staged budgets, retainer figure, route summary, next steps.

### Must NOT go here
Stack/vendor/repo names; model metrics beyond what the evidence explainer licenses;
equity figures; anything from private memos.
