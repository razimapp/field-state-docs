# Session 016 - Label Rule Experiment

## Objective
Improve pass-option label coverage without weakening evidence discipline.

The previous held-out evaluation showed a genuine learned advantage over nearest teammate, but the label-resolution exclusion rate remained high. This session makes recipient matching pluggable and evaluates fixed, distance-scaled, and direction-gated label rules as explicit label experiments.

## Decisions
- Treat recipient matching as a versioned label rule, not a silent config tweak.
- Preserve `R0_FIXED_5M` as the control rule.
- Add `R1_DISTANCE_SCALED` and `R2_DISTANCE_SCALED_DIRECTION_GATED`.
- Keep product wiring off regardless of results.
- Do not mix metrics from different label-rule versions without naming the rule.

## Implementation Notes
- Extended `PassOptionExtractionConfig` with:
  - `label_rule_version`
  - `threshold_per_meter`
  - `threshold_cap`
  - `direction_gate_tolerance`
  - scaled ambiguity margin support.
- Added config presets:
  - `fixed_5m_label_config()`
  - `distance_scaled_label_config()`
  - `direction_gated_label_config()`
- Added label-rule version to audit summaries.
- Added `evaluate_pass_option_label_rules()`.
- Added endpoint:
  - `GET /evaluations/pass-options/label-experiment`
- Added tests for:
  - R0 regression;
  - rule versioning;
  - label experiment report;
  - label experiment API endpoint.

## Validation
- `fieldstate-models`: `37 passed`, `1 warning`.

## Current Evidence
Real cached label experiment used matches:
- `3773372`
- `3895348`
- `3895340`
- `3895333`
- `3895320`
- `3895302`

### R0 — Fixed 5m Control
- Included events: `2708`
- Total pass events: `6478`
- Overall exclusion rate: `0.5820`
- Label-resolution exclusion rate: `0.5048`
- No-xT logistic top-1: `0.4727`
- No-xT logistic top-3: `0.8582`
- Delta vs nearest top-1: `+0.0938`
- Bootstrap CI vs nearest top-1: `[0.0750, 0.1152]`

Pass-length no-match rates:
- `0-10m`: `0.2796`
- `10-20m`: `0.4089`
- `20-40m`: `0.7135`
- `40m+`: `0.9380`

### R1 — Distance Scaled
- Included events: `3493`
- Total pass events: `6478`
- Overall exclusion rate: `0.4608`
- Label-resolution exclusion rate: `0.3612`
- Coverage delta vs R0: `+0.1212`
- Label-resolution delta vs R0: `+0.1436`
- No-xT logistic top-1: `0.4543`
- No-xT logistic top-3: `0.8400`
- Delta vs nearest top-1: `+0.1105`
- Bootstrap CI vs nearest top-1: `[0.0922, 0.1277]`

Pass-length no-match rates:
- `0-10m`: `0.2129`
- `10-20m`: `0.2405`
- `20-40m`: `0.4879`
- `40m+`: `0.8446`

### R2 — Distance Scaled + Direction Gated
- Included events: `3493`
- Total pass events: `6478`
- Overall exclusion rate: `0.4608`
- Label-resolution exclusion rate: `0.3612`
- Coverage delta vs R0: `+0.1212`
- Label-resolution delta vs R0: `+0.1436`
- No-xT logistic top-1: `0.4535`
- No-xT logistic top-3: `0.8403`
- Delta vs nearest top-1: `+0.1097`
- Bootstrap CI vs nearest top-1: `[0.0936, 0.1308]`

Pass-length no-match rates:
- `0-10m`: `0.2129`
- `10-20m`: `0.2405`
- `20-40m`: `0.4879`
- `40m+`: `0.8450`

## Interpretation
- R1 is the current recommended rule because it materially improves coverage while preserving a positive held-out delta over nearest teammate.
- R2 did not materially improve over R1 with the current tolerance, so the direction gate is available but not yet adding value.
- The headline top-1 drops from `0.4727` to `0.4543`, which is expected because the dataset becomes less short-pass-biased.
- The more important metric improves: delta vs nearest teammate rises from `+0.0938` to `+0.1105`.
- Product gate still remains false because overall exclusion rate and label-resolution exclusion remain above target.

## Known Setbacks
- R1 still misses many long passes: `40m+` no-match rate remains `0.8446`.
- Distance-scaled matching may add label noise, so newly resolved events need spot checks before investor-facing claims.
- R2 currently mirrors R1 because the direction gate is not restrictive enough to affect most matches.
- These rules are label definitions; metrics from R0/R1/R2 are not directly interchangeable.

## Next Actions
1. Add an investor-safe evidence page generated from the R1 report artifact.
2. Manually spot-check the sampled newly resolved R1 events (see addendum) via the pass-chain SVG endpoint before external use.
3. ~~Add agreement diagnostics between R0 and R1 on co-resolved events.~~ Done in review addendum.
4. Consider tuning R1/R2 constants only on the designated development match before freezing.
5. Keep learned ML output out of product surfaces until gates pass.

## Review Addendum — Label-Quality Diagnostics (Session 016 review)

A review of the label-rule experiment confirmed the implementation is sound and added the
missing label-quality guard before R1 evidence is used externally.

### Agreement diagnostics (real run, six cached matches)
- **Positive-label agreement R1 vs R0: `1.0` on `2,678` co-resolved events.** R1 adds
  labels without changing any existing R0 label — a wider threshold cannot change which
  candidate is nearest, so this is expected, and now verified rather than assumed.
- **Newly resolved events: `815`.** These carry the label-noise risk and are the ones that
  need manual spot-checks before investor-facing claims.
- **`30` events resolved by R0 but not by R1** (`2,708 − 2,678`): the scaled ambiguity
  margin (`max(1.0, 0.2 × threshold)`) excludes events whose second-nearest candidate now
  falls inside the wider margin. This is the conservative direction — ambiguous labels are
  dropped, not guessed.
- A deterministic cross-match spot-check sample (12 events, 2 per match, round-robin) is
  emitted as `newly_resolved_event_sample` (`match_id:event_id`), reviewable via
  `GET /matches/{match_id}/events/{event_id}/pass-chain.svg`.

### Why R2 mirrors R1 (geometric, not a bug)
Any candidate within threshold `t` of the pass endpoint is automatically within `t` of the
pass line, so the `10.0` perpendicular tolerance only binds when the effective threshold
exceeds `10.0` — i.e. pass length above roughly `41.7m` under the current
`5.0 + 0.12/m` (cap `15.0`) settings. R2 as configured can only differ from R1 on very
long passes, which matches the observed near-identical results. A materially different
direction gate needs a tolerance below typical effective thresholds, tuned on the
development match only.

### Recommendation hardening (code change)
`recommended_rule` no longer selects purely on coverage. A rule now qualifies only if:
- its positive labels agree with the control on `>= 99%` of co-resolved events, and
- at least one learned model still beats the nearest-teammate baseline with a bootstrap
  CI lower bound above zero.
If no rule qualifies, the control rule is recommended. Under these harder criteria the
recommendation remains `R1_DISTANCE_SCALED` (agreement `1.0`; No-xT delta vs nearest
`+0.1105`, CI `[0.0919, 0.1283]` at 300 bootstrap samples — regenerate at 1,000 samples
for any external artifact).

### Other review outcomes
- Multi-match report summaries now prefix the label rule version (e.g. `[R1_DISTANCE_SCALED]`)
  so quoted summaries cannot silently mix label rules.
- Product gate unchanged and still conservative: overall exclusion `<= 30%` plus positive
  CI lower bounds against both baselines. Gate remains false; that is correct.
- Direction-gate geometry (point-to-line distance, projection bounds) verified correct;
  gate filters matching only — candidate feature rows and negatives are unaffected.
- Validation after review changes: `37 passed`.
