# Session 003 - Perspective Tactical Visual

## Objective
Add a custom trapezium/perspective SVG renderer with rectangular player/marker glyphs and stat badges.

## Decisions
- Do not add `mplsoccer`, Matplotlib, canvas, or a frontend framework.
- Use real StatsBomb 360 players when event IDs align.
- Use labelled fallback markers only when 360 is missing.
- Do not invent off-ball players.

## Implementation Notes
- Added freeze-frame player/context schemas.
- Added StatsBomb 360 cache lookup.
- Added perspective projection and tactical SVG renderer.
- Added `GET /freeze-frame` and `POST /scenario.perspective.svg`.

## Validation
- Fixture-backed tests cover 360 parsing, projection, SVG labels, and endpoints.
- Real Leverkusen-Dortmund perspective SVG generated with fallback markers.

## Known Setbacks
- `3895158` has no usable event/360 ID overlap, so real off-ball rectangles cannot be shown for that match.

## Next Actions
- Switch the visual demo to aligned StatsBomb 360 data.
- Implement pass-chain visualization.
