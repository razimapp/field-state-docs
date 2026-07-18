# Session 010 - Fable Build Brief Setup

## Objective
Set up Fable to produce research-backed build instructions for Sonnet and Codex without making Fable the football simulator.

## Decisions
- Keep Fable downstream of `fieldstate-models`.
- Use Fable for research synthesis, factor discovery, planning, and instruction drafting.
- Split output into Sonnet instructions and Codex instructions.
- Require explicit guardrails and acceptance tests in every build brief.

## Implementation Notes
- Added structured build-brief schemas.
- Added a build-brief prompt.
- Added a task and workflow for creating build briefs.
- Added `fieldstate-build-brief` CLI.
- Added an example current-project-state JSON file.

## Validation
- Unit-test schema validation.
- Unit-test workflow behavior with a fake Fable client.
- Keep live Fable calls manual because they require `ANTHROPIC_API_KEY`.

## Known Setbacks
- The build brief is only as good as the supplied project-state JSON.
- Live Fable calls are not run in automated tests.

## Next Actions
- Add a richer generated project-state exporter from `fieldstate-models`.
- Add a saved build-brief artifact after the first live Fable run.
