# Session 006 - Dynamic Replay Frames

## Objective
Fix the replay issue where the ball reaches later event coordinates without a visible player by swapping player context at each timeline step.

## Decisions
- Use each continuation event's own StatsBomb 360 freeze-frame when available.
- Keep fallback event markers for events without 360 data.
- Show actor and endpoint markers on every step so the ball always has visible tactical context.
- Explicitly label out-of-play transitions and opponent restarts.

## Implementation Notes
- Extend the animation timeline with per-step players, markers, frame source, and state labels.
- Update the API endpoint to load freeze-frames for the selected pass and continuation events.
- Update browser JavaScript to redraw the dynamic player layer at each step.
- Extend the pass-chain fixture with Pedri's out-ball and Atlético's throw-in restart.

## Validation
- Unit-test dynamic 360 frame payloads.
- Unit-test out-of-play restart labelling.
- HTML-test dynamic player layer rendering hooks.
- Regression-test existing pass-chain and scenario endpoints.

## Known Setbacks
- Player movement remains snapshot-to-snapshot, not continuous tracking.
- Some real events can still lack 360 data and will use fallback markers.

## Next Actions
- Add browser-level visual QA snapshots for the replay.
- Add model evaluation fixtures for pass-chain outcomes and replay states.
