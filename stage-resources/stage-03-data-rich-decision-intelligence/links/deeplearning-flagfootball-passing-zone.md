# Deep Learning Flag Football Passing Zone Prediction

- Source: https://github.com/Lalde004/DeepLearning_FlagFootball_Prediction
- Local research clone: `/Users/razimwasti/Documents/Billion Dollar Booms/Sports Simulator/reference-repos/deeplearning-flagfootball-prediction`
- Date added: 2026-07-19
- Stage: Stage 3 / Stage 4 bridge
- Capability category: passing-zone probability distribution
- Licence noted by project: no licence file found during local inspection

## Why It Matters

This reference shows a simple neural approach for predicting a distribution over passing zones.

For Fieldstate, the useful pattern is the output shape: instead of only saying "one likely pass", the model can show a probability distribution across pass zones or receiver areas.

## Fieldstate Inspiration

- Probability distribution over possible pass zones.
- Coach-readable zone labels.
- Confidence attached to model output.
- Class imbalance handling for rare passing areas.
- Later comparison between logistic, tree, and neural zone models.

## What We Should Avoid Copying

- It is flag/American-football oriented, not football/soccer.
- Do not transfer features, labels, or tactical assumptions directly.
- Do not copy code or pretrained models without licence review.
- Do not use it to imply Fieldstate currently has neural pass-zone prediction.

## Data / Model Requirement

- Football-specific event or tracking data.
- Explicit pass-zone labels in a 120 x 80 pitch coordinate system.
- Held-out match validation against simple baselines.
- Calibration checks if probabilities are shown to users.

## Follow-Up Action

Use as architecture inspiration for a later Fieldstate pass-zone probability head:

- `P(pass target zone)`;
- `P(pass receiver zone)`;
- zone-level uncertainty display.
