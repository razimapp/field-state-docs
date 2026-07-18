# Session 017 — ML Robustness Evidence

## Objective

Strengthen the pass-option ranking evidence before investor presentation by adding robustness checks that can be validated with the current open-data cache.

## Decisions

- Keep `codex/investor-demo-v1` frozen as the stable investor demo.
- Continue model credibility work on `codex/model-lab-v2`.
- Add per-held-out-match metrics to expose whether pooled uplift is concentrated in one match.
- Add a completed-pass-only extraction mode as a sensitivity condition, not as a recommended production label rule.
- Keep pooled bootstrap confidence intervals as the significance claim; per-match rows are a robustness table only.

## Implementation Notes

- `PassOptionHeldoutComparison` now includes `per_match`, a list of held-out match metrics and deltas versus the nearest-teammate baseline.
- `PassOptionExtractionConfig` now supports `completed_only=True`.
- Completed-only reports stamp the audit label rule as `<RULE>+COMPLETED_ONLY` to prevent metric mixing with normal R0/R1/R2 reports.
- Completed-only filtering happens before feature extraction, so audit denominators describe the filtered population consistently.

## Validation

- Unit tests assert every held-out comparison emits one per-match row for each usable match.
- Unit tests assert completed-only extraction excludes incomplete included events and carries the label-rule suffix.
- Focused validation:
  - `PYTHONPATH=fieldstate-models python3 -m pytest fieldstate-models/tests -q` → `38 passed, 1 warning`
  - `PYTHONPATH=fieldstate-ai python3 -m pytest fieldstate-ai/tests -q` → `8 passed`
- Real cached-data smoke run with six matches and `100` bootstrap samples:
  - R1 normal: `3493/6478` labelled pass events, No-xT top-1 `0.4543`, delta vs nearest teammate `+0.1105`.
  - R1 normal per-match top-1 deltas vs nearest teammate: `3773372 +0.1305`, `3895348 +0.1123`, `3895340 +0.1114`, `3895333 +0.1552`, `3895320 +0.1330`, `3895302 +0.0314`.
  - R1 completed-only: `3246/5552` labelled pass events, No-xT top-1 `0.4729`, delta vs nearest teammate `+0.1282`.
  - R1 completed-only per-match top-1 deltas vs nearest teammate: `3773372 +0.1416`, `3895348 +0.1296`, `3895340 +0.1299`, `3895333 +0.1855`, `3895320 +0.1516`, `3895302 +0.0453`.

## Known Setbacks

- Per-match rows do not include per-match bootstrap confidence intervals.
- Completed-only sensitivity reduces the evaluated population and should not be compared against normal R1 coverage as if it were a production rule.
- R1 newly resolved events still require manual SVG spot-check before external use.
- The real-data smoke run used `100` bootstrap samples to validate behavior quickly; investor artifacts should use `1000`.

## Next Actions

- Spot-check the 12 sampled R1 newly resolved events.
- Regenerate the R1 multi-match report with `1000` bootstrap samples.
- Run the same report with `completed_only=True`.
- Use the resulting tagged evidence pack for investor-safe claims.

## Review Addendum — Robustness Read (Session 017 review)

Implementation verified against spec: per-match metrics computed from the existing fold
rows (no extra model fits), nearest baseline evaluated once per fold, pooled bootstrap CI
retained as the significance claim, completed-only filtering applied at event selection so
audit denominators stay consistent, and `+COMPLETED_ONLY` version stamping flows through
pooled audits and summaries. Tests re-run after review: `38 passed`.

### The `3895302` outlier is explained, not concerning
Per-match delta vs nearest teammate is positive in all six matches under both conditions,
but `3895302` is 3-5x weaker (`+0.0314` normal, `+0.0453` completed-only). Diagnostic run:
that match's nearest-teammate baseline is unusually strong (top-1 `0.4230` vs `0.28-0.35`
in the other five matches), while its event count (`636`) is the second-highest and its
label-resolution exclusion (`0.3319`) is among the best. Interpretation: that match's
passing was more nearest-teammate-dominated, so the trivial baseline is harder to beat —
the model's headroom shrinks, but it still wins. This is the correct answer to the
diligence question "is one match carrying the pooled delta?": no match carries it, and
the weakest match is weak because its baseline is strong, not because the model fails.

### Completed-only result strengthens the label story
Delta vs nearest teammate *rises* under completed-only (`+0.1282` vs `+0.1105`), and
absolute top-1 rises as expected on the easier slice. The "incomplete-pass labels are
noise driving the result" objection is dead: the advantage grows when only
certain-outcome labels are used.

### Housekeeping notes
- Two cached matches (`3895158`, `3895309`) produce zero labelled events and are dropped
  as unusable by the report machinery; they are correctly absent from `match_ids`. Keep
  them out of any "matches evaluated" count in external material.
- The completed-only test now derives its config via `dataclasses.replace` on the R1
  preset instead of a hand-copied constant block, so the sensitivity condition cannot
  silently drift from the production preset.
- All smoke-run numbers above use `100` bootstrap samples; the tagged evidence pack must
  regenerate at `1000` before any figure goes external.
