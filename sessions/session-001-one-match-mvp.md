# Session 001 - One-Match MVP

## Objective
Build the first real-data modelling/API slice for a single match: Bayer Leverkusen vs Borussia Dortmund, Bundesliga 2023/24, `match_id=3895158`.

## Decisions
- Use StatsBomb Open Data as the first data source.
- Keep `fieldstate-models` as the football truth layer.
- Use deterministic/scikit-learn baselines before deep learning.
- Keep Fable downstream for explanation only.

## Implementation Notes
- Added StatsBomb cache loading for events and match metadata.
- Added editable pass/carry filtering.
- Added scenario comparison with xT, turnover-risk, chance-creation, plausibility, and 2-3 branches.
- Added fallback demo sequence when network/cache is unavailable.

## Validation
- Fixture-backed model/API tests pass.
- Real cached `3895158` smoke test parsed the match and returned same-match similar-event branches.

## Known Setbacks
- The public `three-sixty/3895158.json` file does not align with the event IDs in `events/3895158.json`.

## Next Actions
- Keep Leverkusen-Dortmund as event-only/fallback.
- Use an aligned 360 match for player-option visuals.
