# Passing Path Predicts Shooting Outcome

- Source: https://github.com/shun-cao/Passing-Path-Predicts-Shooting-Outcome-in-Football
- Local research clone: `/Users/razimwasti/Documents/Billion Dollar Booms/Sports Simulator/reference-repos/passing-path-predicts-shooting-outcome`
- Date added: 2026-07-19
- Stage: Stage 3 - Data-Rich Decision Intelligence
- Capability category: possession-path value / shot-outcome modelling
- Licence noted by project: no licence file found during local inspection

## Why It Matters

This reference is aligned with Fieldstate's next model layer: whether the passing path before a shot contains useful signal about shooting outcome.

The useful idea is not to predict one magic pass. The useful idea is to measure whether a pass choice improves the possession path toward a shot, goal, or higher-value chance.

## Fieldstate Inspiration

- Path length and directness.
- Possession time and tempo.
- Distance-to-goal progression.
- Width, centrality, and zone movement.
- Attack intensity before the shot.
- Model comparison across simple baselines and tree/neural methods.

## What We Should Avoid Copying

- Do not copy third-party code into Fieldstate without licence review.
- Do not use future possession information as a feature at the moment of decision.
- Do not claim exact next-pass prediction from a shot-outcome model.
- Do not present shot/goal path value as part of the current MVP unless it has Fieldstate-specific evaluation.

## Data / Model Requirement

- Event sequences grouped by possession.
- Shot and goal labels with period-safe future windows.
- Match-grouped or competition-held-out evaluation.
- Baselines for pass length, field position, and possession context.
- Leakage checks to ensure only information known at the decision moment is used.

## Follow-Up Action

Build a Fieldstate possession-path value experiment that estimates:

- `P(possession produces shot)`;
- `P(possession produces goal or high-value chance)`;
- `possession momentum delta = alternative path value - actual path value`.

Display as "momentum toward shot/goal", not as a guaranteed outcome.
