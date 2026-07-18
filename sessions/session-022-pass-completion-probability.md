# Session 022: Pass Completion Probability Baseline

## Objective

Start the predictive pass-completion track while preserving the evidence discipline from the pass-option model. The target is `P(pass completes)` for an actual or edited endpoint, but no product surface should show this probability until gates pass.

## Decisions

- Quarantine the Session 021 oracle issue before adding learned models.
- Split momentum scoring into a causal `scoring_threat_prior` and retrospective `scoring_threat_10s_descriptive`.
- Keep the default momentum curve on `prior` mode.
- Add explicit period checks to future-shot/future-goal descriptive label helpers.
- Build the first pass-completion model as event-only Tier E so it can scale beyond 360 matches.
- Use `scikit-learn` logistic regression first; defer gradient boosting and neural models until the data/evaluation foundation is stable.

## Implementation Notes

- Added `fieldstate_models.features.pass_completion_extractor`.
- Added `fieldstate_models.evaluation.pass_completion`.
- Added `GET /evaluations/pass-completion`.
- Completion label: `1` when the normalized pass outcome is complete, `0` otherwise.
- Current features: start/end coordinates, pass length, angle, forward distance, target centrality, target xT proxy, distance to goal, minute, and period.
- Current comparisons: always-complete baseline, length-only logistic CV, and full event-only logistic CV.
- Current metrics: AUC, Brier score, accuracy, and expected calibration error.

## Validation

- Unit tests cover completion feature extraction, model report generation, API response, causal/descriptive momentum split, and default prior momentum mode.
- Existing pass-chain, scenario, pass-option, SVG, and demo API tests still pass.

## Known Setbacks

- The current fixture-scale evaluation validates the pipeline, not market-grade accuracy.
- No 360 lane-pressure features are included yet.
- No frozen evidence artifact exists yet for pass completion.
- No `completion_probability` is wired into `/scenario` yet because the evidence gate has not passed.

## Next Actions

- Run the extractor over a larger event-only open-data corpus.
- Add bootstrap confidence intervals and frozen evidence artifacts.
- Add Tier F 360-enriched features such as defenders near target and pass lane.
- Add gated `completion_probability` to scenario output only after held-out AUC/Brier/calibration gates pass.

## Review Addendum — Calibration & Gate Integrity (Session 022 review)

Implementation verified: oracle quarantine correct (`scoring_threat_prior` vs
`scoring_threat_10s_descriptive`, default momentum mode `prior`, descriptive banned as
baseline/feature in the caveats), period checks present in both future-event helpers,
and the completion label matches the loader's outcome normalisation (missing pass
outcome → `complete`). Three fixes applied during review:

1. **Removed `class_weight="balanced"` from the completion logistic.** Balanced
   weighting reweights the class prior and systematically biases predicted
   probabilities — wrong for a model whose gate is calibration and whose product
   surface displays P(complete). (The pass-option ranker keeps balanced weighting
   because it only ranks.) Real-data ECE after the fix: `0.011`.
2. **Hardened the product gate to the model that would actually ship.** The old gate
   used best-AUC/min-ECE across all learned variants, letting the length-only
   reference pass the gate on the full model's behalf. Now the full event-only model
   itself must beat the prevalence baseline AND the length-only reference on AUC, and
   clear the ECE gate on its own calibration.
3. **Added a pre-registered breadth guard (`PRODUCT_MIN_MATCHES = 12`).** On the
   8-match local cache the metrics cleared the AUC/ECE bars, flipping
   `product_ready: true` while the report's own caveats said broad ingestion was still
   required — a screenshot waiting to contradict us. The gate now also requires
   minimum corpus breadth, so flag and caveats cannot disagree.

Real-cache run after fixes (pipeline evidence, not claims): `8628/8628` passes
included (100% coverage — no exclusion problem in this model class),
completion rate `0.8508`; full event-only logistic AUC `0.7931` vs length-only
`0.5967` vs prevalence `0.5`; Brier `0.1015` vs `0.1269`; ECE `0.011` (gate `0.08`).
`product_ready: false` — correct, breadth guard binding. Validation: `52 passed`.
