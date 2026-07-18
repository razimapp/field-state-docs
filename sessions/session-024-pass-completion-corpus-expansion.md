# Session 024: Pass Completion Corpus Expansion

## Objective

Expand the pass-completion evidence base from a small 8-match cache to a broader event-only corpus, then harden the evaluation so product-readiness cannot be claimed from pooled metrics alone.

## Decisions

- Branch: `codex/model-lab-v2.2`.
- Keep `completion_probability` out of `/scenario`; this session generates evidence only.
- Keep the Session 022 feature set frozen.
- Prefer event-only breadth before 360-enriched Tier F features.
- Use cluster bootstrap by match instead of row bootstrap.
- Use paired AUC delta CI against the length-only model, not overlapping per-model CIs.
- Add leave-one-competition-out transfer as a report-only section, not a hard gate yet.

## Implementation Notes

- Added `fieldstate_models.data.statsbomb_event_cache`.
- Added `scripts/cache_event_corpus.py` with a balanced default competition/season selection.
- Cached a capped event-only corpus from five StatsBomb Open Data competition/season pairs.
- Extended pass-completion audit with per-competition match/pass counts, completion rates, ECE, and outlier flags.
- Extended pass-completion comparisons with paired AUC delta CI versus length-only.
- Added leave-one-competition-out transfer metrics to the report.
- Regenerated `pass_completion_evidence_frozen.json`.

## Validation

- Frozen artifact now reports:
  - `105` matches.
  - `5` competitions.
  - `113598/113598` passes included.
  - completion rate `0.8191`.
  - full event-only logistic AUC `0.7952`.
  - paired AUC delta CI vs length-only `[0.1853, 0.2005]`.
  - pooled ECE `0.0077`.
  - per-competition ECE below `0.10`.
  - `product_ready: true`.
- Tests cover corpus candidate deduplication, per-competition audit shape, paired delta CI, frozen artifact metadata, and API access.

## Known Setbacks

- `product_ready: true` means the evidence gate passed, not that the model is wired into the product.
- Leave-one-competition-out remains report-only until reviewed.
- The artifact is still event-only; no 360 lane-pressure uplift is measured yet.
- The corpus mixes competitions and population types, which is acceptable only because it is reported explicitly.

## Next Actions

- Human-review the regenerated artifact before acting on the gate.
- Ask Fable to review the v2.2 evidence artifact for claim safety.
- Session v2.3 should add Tier F 360 lane-pressure enrichment.
- Session v2.4 can decide whether to wire gated `completion_probability` into `/scenario`.

## Review Addendum (v2.2 review)

Corpus tooling, dedupe, per-competition audit, cluster bootstrap, and LOCO transfer all
verified sound. Four strengthening fixes applied during review; artifact regenerated:

1. **Paired delta CI is now a gate, not just a report.** `product_ready` requires the
   paired cluster-bootstrap AUC-delta CI vs length-only to exclude zero (it was
   computed but unused by the gate). Current artifact: CI `[0.1853, 0.2005]` — passes.
2. **ECE bins 5 → 10.** With 113k samples concentrated in the upper probability range,
   5 bins averaged away within-bin miscalibration: pooled ECE moved from `0.0077` to
   the honest `0.0168` (still ~5x inside the `0.08` gate). Finer bins only make the
   gate stricter. All external quotes should use the 10-bin figure.
3. **CV scores computed once and shared** by the metric comparisons, the delta CI, and
   the per-competition ECE — previously three separate identical CV runs that a future
   edit could silently desynchronize (and ~3x the compute).
4. **Extractor no longer calls `list_matches()` per match** (O(n^2) on a growing corpus).

Clarified semantics in-code: audit per-competition ECE is *in-distribution* calibration
(pooled CV folds may contain same-competition matches); the LOCO block is the
*transfer* view (worst held-out competition ECE `0.0711`, worst AUC `0.7834`). They are
not interchangeable and both stay reported.

Regenerated artifact (same corpus, strengthened evaluation): 105 matches, 5
competitions, AUC `0.7952`, 10-bin ECE `0.0168`, delta CI `[0.1853, 0.2005]`,
`product_ready: true` under the stricter gate. Validation: `54 passed`.
