# Session 019 — UI Sessions B + C: Replay Controls, Counterfactual Interaction, Analyst Layer

## Objective

Implement Sessions B and C of the advanced UI plan on top of the Session A data
contract: interactive replay with full stepping controls, live counterfactual editing
against `/scenario`, and the analyst provenance layer — all without rendering any
learned model score anywhere in the demo.

## Decisions

- Replay timeline JSON is embedded server-side in the page (no fetch), so the moment
  page keeps working in the Session D static offline snapshot.
- Counterfactual target selection uses a top-down 120x80 pitch, because the click-to-
  coordinate mapping is a direct SVG viewBox transform; the perspective view stays for
  replay only. The 360 `visible_area` polygon is drawn on the top-down pitch.
- **Learned scores are not rendered anywhere, including the analyst view.** The plan
  allowed an analyst-only experimental toggle, but the standing guardrail (no learned
  output on product surfaces until gates pass) outranks it. The analyst panel shows
  the gate status from the frozen evidence artifact instead, pinned to its commit.
- Zero new dependencies; fragments are hand-rendered HTML + vanilla JS per codebase
  convention.

## Implementation Notes

Session B — `visualization/demo_replay.py`:
- Embeddable fragment reusing the perspective replay SVG and
  `build_pass_chain_timeline` from `pass_chain_animation`.
- Controls: play/pause toggle, step forward/back, reset, scrubber with step counter.
- Keyboard: space = play/pause, arrow keys = step, R = reset.
- Persistent REPLAY chip; per-step status line from recorded `pause_label` /
  `state_label`; "player movement between frames is not tracking data" caption.
- Static SVG retained as `<noscript>` fallback.

Session C — `visualization/demo_counterfactual.py` + `visualization/demo_analyst.py`:
- Click on the top-down pitch → dashed edit marker + line → `POST /scenario` →
  HYPOTHETICAL chip, heuristic-tagged metric deltas (xT, turnover risk, chance
  creation, plausibility), and branch cards with source ("reshaped from a real event
  in this match" vs "deterministic fallback"), rationale, plausibility flags.
- Rejected edits surface the API error inline; fragment renders empty for
  non-editable events.
- Analyst panel (collapsible, off by default): four-class provenance legend
  (recorded / derived / heuristic / learned-gated), the value-vs-likelihood
  distinction, camera-visibility caveat, and a GATE status line sourced from the
  frozen artifact (`GATE: NOT PASSED`, commit `8c61e08`, rule `R1_DISTANCE_SCALED`).
- Fixed hypothetical disclaimer: "Fieldstate does not claim to know what would have
  happened."

## Validation

- `PYTHONPATH=fieldstate-models python3 -m pytest fieldstate-models/tests -q` →
  `46 passed` (3 new: replay controls + embedded timeline; counterfactual/analyst
  layers incl. the no-learned-score honesty invariant; empty fragment for
  non-editable events).
- Real-cache smoke run on the Messi moment page: all fragments present (scrubber,
  timeline JSON, cfPitch, HYPOTHETICAL, analyst toggle, gate line pinned to commit);
  the exact `/scenario` POST the click handler sends returns `200` with three
  `similar_event` branches, all provenance tags `heuristic`.

## Known Setbacks

- Replay player layers swap per freeze-frame snapshot; interpolation between frames is
  intentionally absent (would fabricate movement).
- Counterfactual metric deltas remain heuristic proxies and are labelled as such on
  every rendered number.
- The 12 sampled R1 newly-resolved events still await manual spot-check; this
  continues to block external use of the frozen evidence numbers.

## Next Actions

1. Session D: evidence page rendered from `/evidence/pass-options/frozen` (two
   altitudes: headline + technical details) and the static offline snapshot script.
2. Spot-check the 12 sampled R1 events.
3. Commit Sessions A–C together with the frozen artifact on `codex/model-lab-v2`.
