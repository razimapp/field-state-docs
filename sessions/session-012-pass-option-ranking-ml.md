# Session 012 - Pass-Option Ranking ML Baseline

## Objective
Build the first defensible learned model for Fieldstate: a `scikit-learn` pass-option ranking baseline using StatsBomb event data and aligned 360 freeze-frames.

The model should rank visible teammate options for a pass event. This improves the current heuristic option sort in the 360 pass-chain demo without making commercial accuracy claims.

## Decisions
- Build pass-option ranking first.
- Treat this sprint as a pipeline and evaluation build, not a production model-quality claim.
- Use `fieldstate-models` as the only football truth source.
- Use one row per `(pass_event, visible_candidate)` pair.
- Use a deterministic recipient-resolution rule based on pass endpoint proximity.
- Exclude whole events when the positive candidate cannot be resolved.
- Compare the learned ranker against the existing heuristic sort with the same evaluation harness.
- Keep the learned ranker behind a flag until multi-match held-out evaluation beats the heuristic.
- Do not build pass-completion probability, turnover-danger, deep learning, learned xT, or product wiring in this session.

## Implementation Notes

### Model Scope
First model:
- Pass-option ranking.

Deferred models:
- Pass-completion probability.
- Turnover-danger estimate.
- Continuation-value model.
- Learned xT/VAEP-style value surfaces.
- PyTorch/TensorFlow sequence models.

### Label Definition
Observation unit:
- `(pass_event, visible_candidate)`.

Candidate set:
- All teammates in the event freeze-frame where `teammate == true`.
- Exclude the actor/passer where `actor == true`.
- Keep keeper candidates because keeper passes are valid options.

Positive label:
- `y = 1` for the visible candidate nearest to the pass `end_location`, if distance is less than or equal to `5.0` StatsBomb pitch units.

Negative label:
- `y = 0` for every other visible teammate candidate in the same freeze-frame.

Exclusion rules:
- Exclude the whole pass event if there is no aligned 360 freeze-frame.
- Exclude the whole pass event if no visible teammate is within `5.0` units of the endpoint.
- Exclude the whole pass event if the two nearest candidate distances are within `1.0` unit of each other.
- Never train on negative rows from an event whose positive candidate cannot be resolved.

Audit requirements:
- Log total pass events.
- Log aligned 360 pass events.
- Log excluded no-freeze-frame events.
- Log excluded no-recipient-match events.
- Log excluded ambiguous-recipient events.
- Log matched-distance distribution.
- Log completed/incomplete mix in the final training table.

### Feature Table Schema
Suggested output:
- `data/features/pass_options_{match_id}.parquet`.

CSV is acceptable for the first implementation if `pyarrow` is not available.

Columns:
- `match_id`
- `event_id`
- `possession_id`
- `candidate_idx`
- `passer_x`
- `passer_y`
- `cand_x`
- `cand_y`
- `dist`
- `forward_dist`
- `angle`
- `cand_centrality`
- `cand_xt_proxy`
- `nearest_opp_dist`
- `opp_within_5m`
- `opp_within_10m`
- `n_candidates`
- `minute`
- `period`
- `y`

Coordinate convention:
- Keep all coordinates in StatsBomb `120 x 80`.
- Normalize attacking direction only if the existing loader/model layer already exposes a reliable team-direction convention.
- Persist enough raw identifiers to audit labels later without re-parsing the original match manually.

### Baselines
Primary learned baseline:
- `StandardScaler()`
- `LogisticRegression(penalty="l2", C=1.0, class_weight="balanced", max_iter=1000)`

Reference baselines:
- Existing heuristic sort.
- Distance-only logistic regression.
- No-`cand_xt_proxy` ablation.

Do not use:
- Isotonic calibration in the one-match regime.
- Gradient boosting before the label audit and split strategy are stable.
- Learning-to-rank libraries in v1.
- PyTorch or TensorFlow.

### Evaluation Strategy
Never use random row splits.

One-match regime:
- Use `GroupKFold(n_splits=5)` grouped by `possession_id`.
- Treat results as pipeline validation only.
- Do not claim broad accuracy.

Multi-match regime:
- Use leave-one-match-out evaluation as the product-readiness gate.
- Use possession-level cross-validation only for development/tuning within training matches.

Metrics:
- Top-1 accuracy.
- Top-3 recall.
- Mean reciprocal rank.
- Log loss.

One-match acceptance:
- Feature table for `3773372` builds without crashing.
- Exclusion rate is below `30%`, or the threshold/label logic is reviewed before training.
- Messi known example `3b5e3497-1a0b-465c-aa33-7df873864189` ranks the actual receiver in top 3.
- Learned model matches or beats heuristic on top-1 and top-3 under possession-grouped CV.

Multi-match product gate:
- Learned model beats heuristic on held-out matches for top-1 and top-3.
- Bootstrap confidence interval on the difference excludes zero.
- Log loss beats uniform baseline `ln(n_candidates)` per event.
- Known-case tests continue passing.
- Product surfaces still label output as predicted selection likelihood.

## Validation
- Unit-test feature extraction on a small fixture from `3773372`.
- Unit-test candidate filtering excludes actor and keeps teammate options.
- Unit-test recipient matching for the Messi known event.
- Unit-test exclusion behavior for no freeze-frame, no endpoint match, and ambiguous nearest candidates.
- Unit-test ranking metrics on a fixed synthetic table.
- Integration-test feature table generation for `3773372`.
- Regression-test existing pass-chain endpoints and evaluation report.

## Implementation Result
- Added pass-option feature extraction with an auditable row table.
- Added deterministic endpoint-proximity recipient matching.
- Added exclusion counters for missing 360, no endpoint, no candidates, no recipient match, and ambiguous recipient.
- Added heuristic ranking evaluation with top-1, top-3, MRR, and log loss.
- Added a non-product logistic regression baseline wrapper with grouped cross-validation.
- Kept all learned model wiring out of product surfaces.

Full cached `3773372` audit:
- `1079` pass events.
- `974` aligned 360 pass events.
- `465` included labelled events.
- `3584` candidate rows.
- `56.9%` exclusion rate.
- Main exclusion reason: `500` events with no visible candidate within the `5.0` endpoint threshold.

Initial one-match possession-grouped CV:
- Heuristic: top-1 `0.0817`, top-3 `0.2645`, MRR `0.2810`, log loss `2.0532`.
- Distance-only logistic: top-1 `0.3881`, top-3 `0.7875`, MRR `0.6076`, log loss `1.8330`.
- No-`cand_xt_proxy` logistic: top-1 `0.4826`, top-3 `0.8708`, MRR `0.6845`, log loss `1.7478`.
- Full-feature logistic: top-1 `0.4804`, top-3 `0.8708`, MRR `0.6834`, log loss `1.7478`.

Interpretation:
- The pipeline works and the learned baseline strongly beats the first heuristic on one-match grouped CV.
- The exclusion rate is above the planned `30%` gate, so recipient-matching/visibility bias must be reviewed before product claims or model wiring.
- `cand_xt_proxy` does not improve the first logistic baseline; the no-`cand_xt_proxy` ablation is slightly cleaner.

## Known Setbacks
- StatsBomb 360 freeze-frames are anonymous; recipient matching is positional inference.
- Excluding off-frame recipients creates selection bias.
- One-match results validate pipeline mechanics, not model quality.
- Freeze-frame visibility can hide defenders and candidates outside the camera frame.
- The model learns observed selection likelihood, not objectively correct tactical decisions.
- `cand_xt_proxy` may overlap with the heuristic baseline; ablation is required.

## Next Actions
1. Add `fieldstate_models/features/pass_option_extractor.py`.
2. Add a label-audit report for `match_id=3773372`.
3. Add a shared ranking evaluation harness.
4. Wrap the existing heuristic sort in the harness.
5. Train logistic, distance-only, and no-`cand_xt_proxy` baselines.
6. Generate a comparison report.
7. Add known-case tests for Messi top-3 receiver ranking.
8. Keep learned product wiring behind a flag and off by default.
