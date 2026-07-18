# Session 009 - Replay Visual Corrections

## Objective
Fix replay clarity issues where visible-option lanes persisted too long, receivers were not represented clearly at pass endpoints, and opponent possessions appeared on the wrong side of the pitch.

## Decisions
- Show visible-option lanes only during the first selected-pass decision.
- Add explicit endpoint markers labelled `RECEIVER`, `OUT`, `LOST`, or `END`.
- Normalize opponent-team event coordinates into the selected team's visual direction for replay continuity.
- Keep raw event coordinates available in the timeline payload for auditability.

## Implementation Notes
- Added display coordinates alongside raw coordinates in timeline steps.
- Flipped opponent event/player/marker coordinates visually using `120 - x` and `80 - y`.
- Updated continuation paths to use display coordinates.
- Updated browser JavaScript to hide the possible-options layer after step 0.

## Validation
- Unit-test receiver endpoint markers.
- Unit-test opponent throw-in display coordinates remain near the prior out-ball side.
- HTML-test option layer visibility logic and coordinate-normalization notes.
- Browser-verify the open replay after reload.

## Known Setbacks
- This still uses snapshot-to-snapshot context, not real tracking.
- Player movement is represented by step changes and endpoint markers, not continuous off-ball trajectories.

## Next Actions
- Add smoother marker transitions for receiver/actor handoff.
- Add a visual toggle for options, continuation paths, and raw/normalized coordinates.
