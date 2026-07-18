# Session 004 - 360 Pass-Chain Demo

## Objective
Build a 360-backed pass-chain demo that shows passer, possible passees, actual selected pass, and subsequent possession dynamics.

## Decisions
- Use Barcelona vs Atlético Madrid, La Liga 2020/21, `match_id=3773372`, because event IDs align with StatsBomb 360.
- Use complete example `3b5e3497-1a0b-465c-aa33-7df873864189`: Messi to Jordi Alba, then Alba/Pedri continuation.
- Use incomplete example `9a9b0e03-6b93-40b7-bab0-68369b61ebf8`: Jordi Alba incomplete pass, then Atlético continuation.
- Keep Fable explanation for a later session after pass-chain JSON stabilizes.

## Implementation Notes
- Added multi-match StatsBomb cache support for `3895158` and `3773372`.
- Added pass-chain schemas, builder, and SVG renderer.
- Added JSON and SVG endpoints for pass chains.
- Labelled the visual as actual chain from event data plus visible possible options from 360.
- Generated complete and incomplete pass-chain SVG artifacts from real cached `3773372` data.

## Validation
- Unit-tested multi-match event and 360 loading.
- Unit-tested complete and incomplete pass-chain behavior.
- API-tested pass-chain JSON and SVG endpoints.
- Regression-tested existing scenario endpoints.
- Real cached `3773372` smoke test returned aligned event/360 overlap and generated both pass-chain visuals.

## Known Setbacks
- This is still event-data + freeze-frame context, not tracking-data continuity.
- The pass-chain continuation is actual subsequent event data, not a predicted counterfactual branch.

## Next Actions
- Add Fable explanation once pass-chain JSON is stable.
- Add analyst review of whether the visible options and continuation labels are clear enough.
