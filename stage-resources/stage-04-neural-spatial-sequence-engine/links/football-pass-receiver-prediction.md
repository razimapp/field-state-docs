# Football Pass Receiver Prediction

- Source: https://github.com/sanjeevnara7/FootballPassPrediction
- Local research clone: `/Users/razimwasti/Documents/Billion Dollar Booms/Sports Simulator/reference-repos/football-pass-prediction`
- Date added: 2026-07-19
- Stage: Stage 4 - Neural Spatial/Sequence Engine
- Capability category: neural pass-receiver prediction / graph modelling
- Licence noted by project: MIT

## Why It Matters

This is a highly relevant later-stage reference for Fieldstate because it connects visual football context to pass-receiver prediction.

The system described by the project combines player and ball detection, team identification, perspective transformation, player graph construction, and Graph Attention Network receiver prediction.

## Fieldstate Inspiration

- Broadcast/video-derived player and ball positions.
- Team identification from image context.
- Perspective transformation into tactical coordinates.
- Player graph construction.
- Graph-based receiver prediction.
- A clear staged pipeline from vision input to football decision output.

## What We Should Avoid Copying

- Do not copy third-party code into Fieldstate without licence and attribution review.
- Do not imply Fieldstate currently has broadcast video receiver prediction.
- Do not treat a small visual dataset as enough for production claims.
- Do not wire neural outputs into product UX until evaluated against simpler baselines.

## Data / Model Requirement

- Licensed or approved broadcast/video frames.
- Player/ball labels or a reliable detection model.
- Team identification and pitch calibration.
- Receiver labels for pass events.
- Match-held-out and competition-held-out evaluation.
- Runtime plan for inference cost and latency.

## Follow-Up Action

Use this as a Stage 4 blueprint for:

- `P(pass receiver)`;
- graph-based pass-option ranking;
- tracking/video-enhanced alternative-pass evaluation.
