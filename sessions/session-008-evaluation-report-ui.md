# Session 008 - Evaluation Report UI

## Objective
Turn the pass-chain evaluation output from raw browser JSON into a readable analyst/developer report while preserving machine-readable JSON.

## Decisions
- Keep `/evaluations/pass-chain` as the browser-friendly report when the client requests HTML.
- Add `/evaluations/pass-chain.json` as the explicit raw JSON endpoint.
- Keep the report dependency-free using server-rendered HTML.
- Link from the report to the raw JSON and both replay examples.

## Implementation Notes
- Added an HTML renderer for evaluation reports.
- Added content negotiation based on the request `Accept` header.
- Preserved structured `EvaluationReport` output for API clients and tests.

## Validation
- API-test JSON response remains structured.
- Browser-style request returns `text/html`.
- Report HTML includes status, score, checks, raw JSON link, and replay links.

## Known Setbacks
- The report is static server-rendered HTML, not a full dashboard.
- It covers known-case gates only, not broad model benchmarking.

## Next Actions
- Add browser screenshot regression for the report page.
- Add export/download of evaluation artifacts for longer model experiments.
