# Session 007 - Pass-Chain Evaluation

## Objective
Create a repeatable evaluation surface for the pass-chain model so known complete and turnover examples can be checked outside ad hoc visual inspection.

## Decisions
- Start with deterministic known-case evaluation rather than statistical model benchmarking.
- Use Barcelona vs Atlético Madrid `match_id=3773372` because it has aligned event and 360 data.
- Evaluate both the complete Messi chain and the incomplete Jordi Alba turnover chain.
- Return structured pass/fail checks through the API for demo and CI usage.

## Implementation Notes
- Added typed evaluation report schemas.
- Added a pass-chain evaluator with expected outcome, possession flip, visible-options, timeline-context, and state-label checks.
- Added `GET /evaluations/pass-chain`.
- Kept evaluation scoped to model and replay correctness, not prediction accuracy claims.

## Validation
- Unit-test evaluation report scoring.
- API-test evaluation endpoint.
- Regression-test existing pass-chain, animation, scenario, and SVG endpoints.

## Known Setbacks
- This is a known-case quality gate, not a large benchmark.
- More matches are needed before claiming general model accuracy.

## Next Actions
- Add more evaluation cases from additional 360-backed matches.
- Add a CLI command or CI script that fails when evaluation checks fail.
- Track evaluation reports as artifacts when running larger experiments.
