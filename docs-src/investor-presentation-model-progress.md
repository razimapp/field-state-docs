# Investor presentation: model progress

Updated 4 September 2026. Companion to `Fieldstate_Investor_Presentation_V2.html`.

## Preliminary research comparison

Same aligned cohort: 20,184 passes across 21 matches in Bundesliga and La Liga; 17,918 completed and 2,266 incomplete. Five-fold match-grouped cross-validation; ECE uses ten bins. Three of 24 downloaded matches lacked usable alignment and were excluded.

| Model | AUC ↑ | Brier ↓ | ECE ↓ |
|---|---:|---:|---:|
| Contextual target-aware logistic | 0.8547 | 0.0758 | 0.0125 |
| Contextual + five lane features logistic | 0.8876 | 0.0726 | 0.0130 |
| Nested-calibrated lane histogram gradient boosting | 0.8988 | 0.0692 | 0.0043 |

AUC is ranking discrimination, not classification accuracy. Brier is mean squared probability error, not an error percentage. ECE is an aggregate binned calibration gap, not a guarantee for each pass. The lane-logistic model improves ranking and Brier but slightly worsens ECE.

Paired match-clustered AUC improvement intervals: logistic +0.0329 [0.0279, 0.0379]; tree +0.0441 [0.0370, 0.0512]. These do not establish performance in other competitions.

## Status and limitations

Source: preliminary research evaluation reported from `model-lane-pressure-12`, implementation in `fieldstate-models/fieldstate_models/evaluation/intended_lane_pass_completion.py`. This research work is uncommitted; a frozen, release-approved evaluation artifact is still pending. These are not promoted product metrics (`product_ready=false`).

Targets are reconstructed offline using provider-linked Ball Receipt information as a proxy, not verified intent. Incomplete passes lacking usable receiver labels are excluded, creating a selection limitation. Partial 360 freeze frames do not establish continuous movement, speed, defensive reactions or causal effects of changing pass height.

The larger 107,327-pass, 105-match contextual-model evaluation shown elsewhere in the presentation uses a different cohort. Do not attribute a direct improvement from its AUC to this research result. The earlier 113,598-pass baseline is also a different evaluation.

The experimental localhost demo is a separate research preview, not a published production upgrade. Single-scenario predictions are not validation metrics. This static presentation does not host the interactive model.
