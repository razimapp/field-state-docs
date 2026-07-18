# Session 011 - Fable ML Research Setup

## Objective
Use Fable for rigorous ML/model research on pass prediction, pass completion, and iteration strategy while keeping model truth in `fieldstate-models`.

## Decisions
- Focus research on actual model improvement, not UI polish.
- Start with interpretable features and `scikit-learn` baselines.
- Defer PyTorch/TensorFlow until labelled data volume and evaluation justify it.
- Require Fable output to include features, labels, experiments, metrics, iteration loop, and Codex build instructions.

## Implementation Notes
- Added ML research schemas.
- Added an ML model research prompt.
- Added a task and workflow for ML research briefs.
- Added `fieldstate-ml-research-brief` CLI.
- Added an example ML project-state JSON file.

## Validation
- Unit-test ML research schema validation.
- Unit-test workflow behavior with a fake Fable client.
- Validate CLI help without live Fable calls.

## Known Setbacks
- Live Fable calls still require `ANTHROPIC_API_KEY` or manual Pro-plan copy/paste.
- Research briefs are planning artifacts; they do not prove model accuracy.

## Next Actions
- Run the first live/manual Fable ML research brief.
- Convert the approved brief into a Codex build plan for a pass-option ranking baseline.
