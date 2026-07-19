# Football YOLO Analytics Reference

- Source: https://github.com/wagJoker/FootballAnalytycsAIProject
- Local research clone: `/Users/razimwasti/Documents/Billion Dollar Booms/Sports Simulator/reference-repos/football-analytics-ai-project`
- Date added: 2026-07-19
- Stage: Stage 4 / Stage 5 pending review
- Capability category: computer vision / tracking pipeline
- Licence noted by project: no licence file found during local inspection

## Why It Matters

This reference is useful for understanding a broader football computer-vision pipeline: YOLO player detection, ByteTrack-style tracking, dataset preparation, model evaluation, and visualisation.

It is less directly tied to pass prediction than the pass-receiver graph project, but it is useful for later tracking and video infrastructure planning.

## Fieldstate Inspiration

- Player detection and tracking workflow.
- Dataset download and preparation structure.
- A/B testing of model configurations.
- Tracking visualisation and metric reporting.
- C4-style architecture documentation.

## What We Should Avoid Copying

- No licence file was found during local inspection, so do not copy code.
- Treat experimental quantum/RAG components as out of scope for Fieldstate unless separately justified.
- Do not add computer-vision dependencies to the MVP.
- Do not imply Fieldstate currently has video tracking.

## Data / Model Requirement

- Football video dataset with permission to use.
- Player and ball annotations or reliable pretrained detectors.
- Tracking evaluation set.
- GPU training/inference plan.
- Clear separation between visual detection, tactical modelling, and product claims.

## Follow-Up Action

Use as Stage 4/5 research material for tracking infrastructure and computer-vision experimentation, after the event-data model evidence remains stable.
