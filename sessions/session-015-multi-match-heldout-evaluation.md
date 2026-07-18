# Session 015 - Multi-Match Held-Out Evaluation

## Objective
Convert the pass-option ML evidence chain from one-match pipeline evidence into multi-match held-out evidence.

The goal is to increase product value before investor presentation by showing that Fieldstate can run a disciplined model evaluation across unseen matches, while still avoiding premature product-accuracy claims.

## Decisions
- Generalise the StatsBomb loader to support arbitrary cached match IDs.
- Add a StatsBomb 360 candidate discovery/cache utility using existing match metadata.
- Add leave-one-match-out pass-option evaluation.
- Compare learned models against the same heuristic on the same held-out event sets.
- Add bootstrap confidence intervals for top-1 and top-3 deltas.
- Keep learned model scores out of product surfaces.

## Implementation Notes
- Added cached arbitrary-match support to `StatsBombLoader`.
- Added `list_cached_match_ids(require_360=True)`.
- Added `discover_cached_metadata_360_candidates()`.
- Added `cache_360_candidates()`.
- Added `evaluate_pass_option_multimatch()`.
- Added API endpoints:
  - `GET /evaluations/pass-options/multimatch`
  - `GET /evaluations/pass-options/multimatch.json`
- Added fixture tests with a second cached match ID.
- Downloaded six additional StatsBomb Open Data 360 matches into the ignored local cache:
  - `3895348`
  - `3895340`
  - `3895333`
  - `3895320`
  - `3895309`
  - `3895302`

## Validation
- Unit-tested cached arbitrary match discovery.
- Unit-tested leave-one-match-out report on fixture matches.
- API-tested multi-match report endpoints.
- Regression-tested existing scenario, pass-chain, animation, SVG, and evaluation endpoints.

Latest validation:
- `fieldstate-models`: `34 passed`, `1 warning`.

## Current Evidence
Real cached held-out report used usable matches:
- `3773372`
- `3895348`
- `3895340`
- `3895333`
- `3895320`
- `3895302`

Pooled audit:
- `6478` total pass events.
- `5468` aligned 360 pass events.
- `2708` labelled pass-option events.
- `20239` candidate rows.
- `58.2%` exclusion rate.
- `2691` no-recipient-match exclusions.
- `69` ambiguous-recipient exclusions.

Held-out comparison:

| Model | Top-1 | Top-3 | MRR | Log loss | Top-1 delta vs heuristic | Top-3 delta vs heuristic |
|---|---:|---:|---:|---:|---:|---:|
| Distance-only logistic | `0.3759` | `0.7954` | `0.6023` | `1.8171` | `+0.3039` | `+0.5114` |
| No-xT logistic | `0.4727` | `0.8582` | `0.6738` | `1.7375` | `+0.4007` | `+0.5742` |
| Full-feature logistic | `0.4719` | `0.8582` | `0.6734` | `1.7375` | `+0.3999` | `+0.5742` |

Bootstrap intervals:
- Distance-only top-1 delta CI: `[0.2803, 0.3257]`
- Distance-only top-3 delta CI: `[0.4871, 0.5358]`
- No-xT top-1 delta CI: `[0.3800, 0.4228]`
- No-xT top-3 delta CI: `[0.5535, 0.5979]`
- Full-feature top-1 delta CI: `[0.3789, 0.4221]`
- Full-feature top-3 delta CI: `[0.5535, 0.5979]`

## Interpretation
> **Superseded — see Review Addendum below.** The `+0.4007` delta was measured against a
> value-ranking heuristic that scores below uniform random at likelihood ranking, so it
> overstates learning. The corrected headline is `+0.094` top-1 over the nearest-teammate
> baseline, CI `[0.0739, 0.1126]`.
- The learned pass-option ranker shows a real held-out advantage across multiple cached matches (corrected magnitude in the addendum).
- This is materially stronger than the one-match CV evidence from Session 013.
- The product-ready gate still remains false because exclusion rate is `58.2%`, above the `30%` gate.

## Known Setbacks
- High exclusion rate remains the main product-readiness blocker.
- One cached downloaded match did not become usable for labelled pass-option rows in the selected report.
- Bootstrap intervals are useful evidence, but not a substitute for broader competition/team diversity.
- The current heuristic baseline is intentionally simple; future comparison should include a stronger engineered heuristic before product promotion.

## Next Actions
1. Investigate no-recipient-match exclusions and whether 360-visible recipients are being missed by the `5.0` endpoint threshold.
2. Add per-match exclusion diagnostics to the HTML report.
3. Add an investor-safe evidence report page that shows headline held-out results without exposing feature/threshold internals.
4. Add more competitions if available, not just Leverkusen/Bundesliga and Barcelona/Atlético.
5. Keep product wiring off until exclusion and evaluation gates are improved.

## Review Addendum — Baseline Correction (Session 015 review)

A review of the evaluation code found that the `+0.4007` headline delta was measured against
the wrong yardstick and must not be used in investor material.

### Why the original delta overstated learning
- The value heuristic ranks options by estimated *value* (xT-dominated), not selection
  likelihood. Actual passes mostly go to nearby safe options, so the heuristic scored
  `top-1 = 0.0720` — **below uniform random** (`0.1401` expected over a mean `7.5`
  candidates per event). Beating it by `+0.40` mostly measures the task mismatch.
- A trivial nearest-teammate baseline (closest teammate ranks first) scores
  `top-1 = 0.3789`, `top-3 = 0.7987` on the same held-out events.

### Corrected held-out evidence (regenerated after review)
| Ranker | Top-1 | Top-3 | Top-1 delta vs nearest-teammate | CI |
|---|---:|---:|---:|---|
| Uniform random (expected) | `0.1401` | `0.4199` | — | — |
| Value heuristic | `0.0720` | `0.2840` | — | — |
| Nearest-teammate baseline | `0.3789` | `0.7987` | — | — |
| Distance-only logistic | `0.3759` | `0.7954` | `-0.0030` | `[-0.0100, 0.0044]` |
| No-xT logistic | `0.4727` | `0.8582` | `+0.0938` | `[0.0739, 0.1126]` |
| Full-feature logistic | `0.4719` | `0.8582` | `+0.0930` | `[0.0727, 0.1119]` |

The honest headline: the learned ranker beats the strongest trivial baseline by
`+0.094` top-1 (`+0.060` top-3) with bootstrap CIs excluding zero. That is a real,
defensible learning advantage — an order of magnitude smaller than `+0.40`, but it
survives due diligence.

### Exclusion-rate decomposition and cause
- Overall exclusion `58.2%` mixes two problems: `1,010` events with no 360 freeze-frame
  (data coverage) and `2,760` label-resolution failures. Resolution failure over aligned
  events is `50.5%` (`label_resolution_exclusion_rate`, now reported).
- New pass-length diagnostics confirm the mechanism — freeze-frames capture positions at
  release while `end_location` is at arrival, so receivers of longer passes move beyond
  the `5.0` matching threshold before the ball arrives:
  - `0-10m`: `28.0%` no-match; `10-20m`: `40.9%`; `20-40m`: `71.4%`; `40m+`: `93.8%`.
- Consequence: the labelled dataset is heavily biased toward short passes. Fixing
  resolution for long passes (e.g. flight-time-scaled threshold) is the highest-leverage
  label improvement and will likely *reduce* headline top-1 while making it more honest.

### Code changes made in this review
- Added `nearest_teammate_score` baseline and uniform-expected reference metrics.
- Held-out comparisons now report deltas and bootstrap CIs against the nearest-teammate
  baseline alongside the value heuristic.
- The product-ready gate now additionally requires beating the nearest-teammate baseline
  with CI lower bounds above zero (single-match report gate hardened the same way).
- Audit now reports `label_resolution_exclusion_rate` and `pass_length_exclusion_diagnostics`.
- Minor fixes: bootstrap percentile index rounding; explicit `None` handling in the
  feature matrix instead of `or 0`.
- Validation after changes: `34 passed`.
