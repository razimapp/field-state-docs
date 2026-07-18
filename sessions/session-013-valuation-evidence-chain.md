# Session 013 - Valuation Evidence Chain

## Objective
Turn the pass-option ML baseline into a valuation-ready evidence artifact without claiming product-grade accuracy or wiring learned scores into the user-facing decision product.

The purpose is to help show that Fieldstate is becoming a working product with measurable model infrastructure, not just a visual demo.

## Decisions
- Add an evaluation-only pass-option model report.
- Expose the report as JSON and browser-friendly HTML.
- Keep learned model output out of product/demo surfaces.
- Use the report to support funding/product value discussions.
- Keep caveats explicit: one-match CV is pipeline evidence, not broad model accuracy.

## Implementation Notes
- Added `PassOptionModelReport` schemas.
- Added `evaluate_pass_option_model()` to combine:
  - label audit;
  - heuristic baseline metrics;
  - distance-only logistic CV;
  - no-`cand_xt_proxy` logistic CV;
  - full-feature logistic CV;
  - valuation signals;
  - caveats;
  - next actions.
- Added HTML rendering for the pass-option ML evidence report.
- Added API endpoints:
  - `GET /evaluations/pass-options`
  - `GET /evaluations/pass-options.json`

## Validation
- Added tests for report generation.
- Added API tests for JSON and HTML report endpoints.
- Regression-tested existing pass-chain, scenario, SVG, animation, and evaluation behavior.

Latest validation:
- `fieldstate-models`: `30 passed`, `1 warning`.

## Known Setbacks
- Full cached `3773372` report is not product-ready because the recipient exclusion rate is `56.9%`.
- The first learned ranker beats the heuristic on one-match grouped CV, but this is not a market-grade accuracy claim.
- More aligned 360 matches and better recipient handling are required before product wiring or commercial model-accuracy claims.

## Current Evidence
Full cached `3773372` report:
- `465/1079` pass events produced labelled option rows.
- `3584` candidate rows.
- Best top-1: `0.4826` from no-`cand_xt_proxy` logistic CV.
- Heuristic top-1: `0.0817`.
- Best top-3: `0.8708`.
- Exclusion rate: `0.5690`.
- Product-ready gate: `false`.

## Next Actions
1. Review excluded events and threshold sensitivity.
2. Add more aligned StatsBomb 360 matches.
3. Add leave-one-match-out evaluation.
4. Generate an investor-facing demo/report page once the evidence is cleaner.
5. Keep Fable focused on critique, caveats, and next experiment design rather than inventing outcomes.
