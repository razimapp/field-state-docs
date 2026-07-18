# Session 005 - Animated Pass-Chain Replay

## Objective
Build a browser replay that animates the ball through an actual StatsBomb event chain, pauses on receipt/interception, and keeps visible 360 player context on screen.

## Decisions
- Use a self-contained HTML endpoint with inline SVG and JavaScript.
- Reuse the existing `3773372` pass-chain JSON as the source of truth.
- Keep players static because StatsBomb 360 is freeze-frame data, not continuous tracking data.
- Animate only the ball, active highlights, and event markers in this sprint.

## Implementation Notes
- Add a deterministic timeline from selected pass plus continuation events.
- Add browser controls for play, pause, step, reset, and speed.
- Pause at event endpoints to show receiver, interceptor, or next actor state.
- Label the visual as actual event data plus visible StatsBomb 360 options.

## Validation
- Unit-test complete and incomplete replay timelines.
- API-test the animation endpoint returns standalone HTML.
- HTML-test for ball, controls, timeline JSON, pass lanes, pause labels, and replay disclaimer.
- Regression-test existing pass-chain and scenario endpoints.

## Known Setbacks
- Player movement is not real tracking data.
- Continuation is actual event history, not a simulated or predicted outcome.

## Next Actions
- Add a simple browser demo link from docs or a local preview page.
- Add Fable explanation once the replay format is stable.
