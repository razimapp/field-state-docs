<!--
canonical: docs-src/model-evidence.md
html-export: ../model-evidence.html (explainer page; numbers still live only in frozen artifacts)
             this doc EXPLAINS the evidence system and links artifacts — it never restates numbers)
audience: data-science diligence, technical advisors
owner: Razim
status: stub — new document
last-reviewed: 2026-07-11
-->

# Fieldstate — Model Evidence Explainer

> This document explains HOW Fieldstate evidence works. The numbers themselves live in
> frozen, commit-pinned artifacts in `fieldstate-models` and are rendered by the
> product's evidence page. **No metric is ever hand-typed into any doc, including this
> one.** If you are reading a Fieldstate number, it traces to an artifact; this page
> tells you how to verify that.

## The evidence system
<!-- frozen artifacts, pinned commits, pre-registered gates written before evals run -->
## Gate anatomy
<!-- breadth, baselines, delta CIs, calibration (pooled / per-competition / LOCO), oracle quarantine -->
## Current artifacts
<!-- table: artifact name → what it evidences → where served (/evidence/...) → commit.
     Links only. No values. -->
## How to reproduce a number
<!-- artifact → commit → command -->
## Known limitations we state proactively
<!-- endpoint contamination, freeze-frame visibility, open-data breadth, label rules -->

### Belongs here
Methodology, gate definitions, artifact index, reproduction instructions, limitations.

### Must NOT go here
Any metric value (link the artifact); commercial framing; model roadmap promises.
