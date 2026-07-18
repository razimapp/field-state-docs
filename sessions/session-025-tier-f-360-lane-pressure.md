# Session 025: Tier F 360 Lane Pressure

## Objective

Measure whether StatsBomb 360 freeze-frame geometry improves pass-completion modelling over the stable event-only Tier E base, without changing product surfaces or weakening the event-only evidence gate.

## Decisions

- Branch: `codex/model-lab-v2.3`.
- Keep `/scenario` unchanged.
- Keep Tier E as the product gate model.
- Add Tier F as a measured enrichment experiment on the 360-covered subset only.
- Promote leave-one-competition-out transfer from report-only to a product-readiness gate.
- Keep delta evidence paired against the correct reference model.

## Implementation Notes

- Added Tier F features:
  - nearest opponent distance to pass target.
  - opponents within 5m/10m of target.
  - nearest opponent distance to pass lane.
  - opponents within 3m/5m of pass lane.
- Optimized 360 extraction by loading each match's 360 file once instead of once per pass.
- Added `tier_f_audit` and `tier_f_comparisons` to the pass-completion report.
- Added a generic paired AUC delta field so Tier F can state its reference clearly.
- Leave-one-competition-out now gates product readiness.

## Validation

- Frozen artifact reports Tier F on `5468` 360-covered passes.
- Tier E on the same 360 subset: AUC `0.7996`, Brier `0.0980`, ECE `0.0167`.
- Tier F 360 lane-pressure model: AUC `0.8869`, Brier `0.0856`, ECE `0.0196`.
- Paired AUC delta versus Tier E: `[0.0689, 0.1013]`.
- The main event-only gate still passes on `105` matches and `5` competitions.

## Known Setbacks

- Tier F is restricted to the 360-covered subset, so it is not the broad product gate model.
- Freeze-frame data is static; it does not include velocities, body orientation, or full tracking.
- Lane pressure improves the model on the aligned subset, but this does not yet imply live product behaviour.

## Next Actions

- Ask Fable to review Tier F claim safety.
- Decide whether `v2.4` should wire gated event-only `completion_probability` into `/scenario`.
- Keep Tier F as evidence for the value of richer positional data and future licensed-data funding.

## Review Addendum — Endpoint Contamination (v2.3 review)

Tier F implementation verified: fair same-subset comparison (identical rows, identical
grouped CV, paired resamples), geometry sound (point-to-segment lane distance), no
future *events* read, LOCO gate correctly promoted and passing. One material finding:

### The Tier F uplift is an upper bound, not pure positional signal

For incomplete passes, StatsBomb `end_location` is the **failure point** — often the
interception itself. Tier F's lane/target proximity features are therefore computed
against a lane that mechanically terminates at the intercepting defender. Diagnostics
on the 5,468-pass 360 subset:

- `nearest_opp_lane_dist` **alone** achieves CV AUC `0.7834` — nearly the entire
  Tier E model's discrimination from one feature.
- Median lane distance: complete `3.06`, incomplete `1.19`.
- Median target distance: complete `10.41`, incomplete `6.09`.

Part of this is genuine signal (a defender near the lane at release genuinely threatens
the pass — a live model would see him). Part is the recording convention. The two
cannot be separated with freeze-frame data alone, so the `+0.0689–0.1013` delta must be
quoted as an **upper bound on positional uplift**, and Tier F probabilities must not be
used for edited (intended) targets without an intended-endpoint sensitivity study.
Note Tier E inherits a milder version through length truncation of failed passes —
standard for xPass-style models on this data, now stated in the caveats.

### Fixes applied in review
- Contamination caution embedded in the Tier F comparison notes and report caveats.
- Frozen artifact `safe_claim`/caveats rewritten: the stale "no 360 features in this
  artifact" line (false since v2.3) replaced with the Tier F enrichment-only framing
  and the contamination caveat; artifact regenerated; test updated to pin the new
  wording. Validation: `54 passed`.

### Recommended for a later session (not this one)
- Intended-endpoint sensitivity: re-evaluate Tier F with lane truncated to a fixed
  fraction of recorded length (direction is far less contaminated than endpoint
  magnitude) and report the delta under that definition.
- Report the completed-only Tier F delta as a cleaner secondary view.
