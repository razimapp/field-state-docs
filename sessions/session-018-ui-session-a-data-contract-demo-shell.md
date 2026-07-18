# Session 018 — UI Session A: Data Contract + Demo Shell

## Objective

Implement Session A of the advanced UI plan: the backend data contract the UI needs,
plus the demo shell (landing page, match strip, moment picker, static moment page).
No animation controls (Session B) and no counterfactual interaction (Session C) yet.

## Decisions

- Zero new dependencies. The codebase convention is hand-rendered HTML in
  `visualization/` modules; the demo shell follows it. No Jinja2, no HTMX yet —
  HTMX only becomes useful with Session B/C interactivity.
- Existing SVG endpoints already return bare `<svg>` elements, so no fragment mode
  was needed; demo pages inline the SVG server-side.
- The evidence page (Session D) will render only from a frozen, committed artifact —
  never from live recomputation — so quoted numbers stay pinned to a commit.
- Provenance is a contract-level concept: modelled payloads carry a `provenance`
  field so the frontend cannot render an estimate as recorded fact.

## Implementation Notes

New endpoints:
- `GET /matches/{match_id}/events/{event_id}/pass-chain/timeline.json` — animation
  timeline as JSON (exposes the existing `build_pass_chain_timeline`), tagged
  `provenance: recorded`. Session B's stepping module drives this.
- `GET /evidence/pass-options/frozen` — serves the committed evidence artifact;
  `404` with regeneration instructions if absent.
- `GET /demo` — landing page: marquee moment with inline pass-chain SVG, curated
  moment cards, match strip with 360 badges.
- `GET /demo/moments` (+ `?match_id=`) — curated demo manifest as JSON.
- `GET /demo/matches/{match_id}` — moment picker: curated moments + showcase events.
- `GET /demo/moments/{match_id}/{event_id}` — static moment page: REPLAY and outcome
  chips, inline SVG, honesty copy ("camera-visible players only"), provenance block.

New modules:
- `fieldstate_models/demo/manifest.py` — data-only curated moments (the two known-case
  events; narratives state recorded facts only).
- `fieldstate_models/evaluation/frozen_evidence.py` + `scripts/generate_frozen_evidence.py`
  — artifact generation (R1 primary + completed-only sensitivity, both at `1000`
  bootstrap samples, with `generated_at`, `git_commit`, label-rule versions, caveats).
- `fieldstate_models/visualization/demo_shell.py` — page renderers with the standard
  footer disclaimer on every page.

Schema additions:
- `DemoMoment`; `Provenance` literal (`recorded | derived | heuristic | learned_gated`).
- `ScenarioMetrics.provenance = "heuristic"`, `Plausibility.provenance = "heuristic"`,
  `PossiblePassee.provenance = "derived"` (additive, defaulted — no breaking change).

## Frozen Evidence Artifact (real run)

Generated at commit `8c61e08`, `1000` bootstrap samples, committed at
`fieldstate_models/evidence/pass_option_evidence_frozen.json`:

- Primary `[R1_DISTANCE_SCALED]`: `3493/6478` labelled events; No-xT heldout top-1
  `0.4543` vs nearest-teammate `0.3438`; delta `+0.1105`, CI `[0.0925, 0.1297]`;
  six per-match rows included; product gate still false (correct).
- Sensitivity `[R1_DISTANCE_SCALED+COMPLETED_ONLY]`: No-xT top-1 `0.4729`; delta vs
  nearest `+0.1282`, CI `[0.1094, 0.1473]`.
- Both CIs exclude zero at 1,000 samples; these are the external-grade numbers,
  superseding all 100/300-sample smoke figures.

## Validation

- `PYTHONPATH=fieldstate-models python3 -m pytest fieldstate-models/tests -q` →
  `43 passed` (5 new tests: timeline endpoint, frozen-evidence endpoint 404/200,
  manifest endpoint, demo shell pages + honesty copy, scenario provenance tags).
- Real-cache smoke run: all six new/changed routes return `200` with expected content
  types; marquee SVG renders on the landing page; frozen artifact serves with
  per-match rows present.

## Known Setbacks

- Demo shell is static: no animation stepping, no counterfactual interaction yet.
- `learned_gated` provenance class is defined but intentionally unused — no product
  surface may emit it until evaluation gates pass.
- The 12 sampled R1 newly-resolved events still need manual SVG spot-check before the
  frozen numbers are quoted externally.

## Next Actions

1. Spot-check the 12 sampled R1 events (now blocking external use of the artifact).
2. Session B: replay + animation controls driven by `timeline.json`.
3. Session C: counterfactual interaction + analyst provenance layer.
4. Session D: evidence page rendered from `/evidence/pass-options/frozen` + offline
   static snapshot.
5. Commit this session (code + artifact together) on `codex/model-lab-v2`.
