# Session 021: Possession Value and Momentum Contract

## Objective

Add an evidence-first match momentum layer that tracks event-level danger, per-minute team peaks, and time-decayed momentum without claiming calibrated scoring probability.

## Decisions

- Keep this as a derived/heuristic model track on `codex/model-lab-v2`.
- Do not mix momentum into the pass-completion model before completion labels and gates exist.
- Use "scoring threat 10s proxy" language until a supervised goal/shot-within-10s model is trained.
- Track maximum possession value per team per minute so isolated high-impact moments are not watered down by averages.
- Use an exponential decay curve so recent danger matters more than older danger.

## Implementation Notes

- Added `fieldstate_models.features.momentum`.
- Added `GET /matches/{match_id}/momentum`.
- Added schemas for event danger, minute peaks, momentum points, and the match report.
- Event danger currently combines endpoint xT, chance-creation proxy, pass outcome penalty, shot events, and descriptive future shot/goal-within-10s labels.
- Momentum samples each minute and sums team event danger using `exp(-time_since_event / decay_tau_seconds)`.

## Validation

- Unit tests cover peak detection, time-decayed team advantage, incomplete-pass penalty, and the new API endpoint.
- The report includes caveats stating that this is not a calibrated probability model.

## Known Setbacks

- Open-data event coverage is sparse relative to a production tracking/event feed.
- Current scoring threat is heuristic, not trained or calibrated.
- Future goal/shot labels are descriptive scaffolding for supervised training, not enough evidence for an accuracy claim.

## Next Actions

- Add a supervised pass-completion model as the next ML build.
- Train a real shot/goal-within-10s value model once enough labelled data exists.
- Add scenario deltas so edited pass decisions can show their effect on team danger and momentum.
- Compare 30s, 60s, and 120s decay windows against analyst-reviewed match narratives.
