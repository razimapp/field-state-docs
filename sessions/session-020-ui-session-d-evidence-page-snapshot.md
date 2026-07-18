# Session 020 — UI Session D: Evidence Page + Offline Snapshot

## Objective

Complete the advanced UI plan: the investor-facing model evidence page rendered
exclusively from the frozen artifact, and the static offline snapshot that makes the
demo failure-proof in the room.

## Decisions

- The evidence page reads only `/evidence/pass-options/frozen` (the committed
  artifact, pinned to commit `8c61e08`, 1000 bootstrap samples). No live
  recomputation path exists for it.
- Two altitudes: headline block + baseline bars + gate diagram + coverage statement
  for every viewer; per-match robustness, all-ranker table, completed-only
  sensitivity, and pass-length coverage inside a "Technical details" expandable.
- Hidden by construction: feature lists, matching-rule mechanics, threshold
  constants, R0/R1/R2 internals, and the value-heuristic-below-random history
  (externally: "compared against multiple baselines including the strongest trivial
  baseline"). A test asserts the internals never render.
- Offline snapshot captures the golden path (home, evidence, all match pages, both
  curated moments); links between captured pages are rewritten to relative paths and
  any uncaptured route is neutralised so the snapshot has no dead links. Replay works
  offline (embedded timeline JSON); counterfactual clicks degrade with an inline
  message, which is expected offline behavior.

## Implementation Notes

- `visualization/evidence_page.py` — `render_evidence_page(artifact, style, footer)`:
  headline claim with real artifact numbers in fixed approved language, top-1 bar
  chart (chance / value heuristic / nearest-teammate / learned), gate flow diagram
  with live status, coverage block, technical details tables.
- `GET /demo/evidence` — serves the page; 404 with regeneration instructions when the
  artifact is missing.
- Landing page gains an evidence card; the analyst panel gate line links to the page.
- `scripts/generate_demo_snapshot.py` — writes `demo_snapshot/` via TestClient (no
  running server needed); prints the file to open for offline presentation.

## Validation

- `PYTHONPATH=fieldstate-models python3 -m pytest fieldstate-models/tests -q` →
  `48 passed` (2 new: evidence page renders headline/bars/gate/technical sections
  with internals hidden; snapshot writes offline pages with no absolute demo links).
- Real snapshot generated: 12 pages (home, evidence, 8 match pages, 2 curated
  moments) under `fieldstate-models/demo_snapshot/`.

## Known Setbacks

- The evidence page quotes the frozen numbers; the 12 sampled R1 newly-resolved
  events still await manual SVG spot-check before those numbers are used in an
  actual investor meeting.
- Two cached matches (`3895158`, `3895309`) have match pages but no labelled events;
  they are correctly absent from all evidence counts.

## Next Actions

1. Manual spot-check of the 12 sampled R1 events (final external-use blocker).
2. Rehearse the presenter path: home → Messi moment → replay stepping → one
   counterfactual click → evidence page.
3. Optional Session E polish pass on the marquee moment only.
