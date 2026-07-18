# Session 002 - Showcase Event Selection And Flat SVG

## Objective
Create a repeatable way to pick demo-worthy events and render a simple flat-pitch SVG scenario.

## Decisions
- Keep the output API-first.
- Select showcase events by forward movement, value delta, and next-phase context.
- Prefer a diverse set of players in showcase suggestions.

## Implementation Notes
- Added showcase-event scoring and suggested edits.
- Added flat SVG renderer showing original action, edited action, and branch paths.
- Added endpoints for showcase events and flat scenario SVG.

## Validation
- Fixture-backed tests cover showcase ranking, SVG output, and API behavior.
- Real cached match smoke test generated `tmp/showcase-scenario.svg`.

## Known Setbacks
- Flat SVG is useful for proof, but it lacks tactical/player context.

## Next Actions
- Add perspective tactical renderer.
- Add real 360-backed player markers where data aligns.
