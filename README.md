# Fieldstate Docs — Map & Rules

**This repository is PUBLIC on GitHub. Every committed file publishes.** Private
material (negotiation strategy, rights/IP positioning, counsel notes) lives outside
this repository in `field-state-private/` and must never be committed here — a
`.gitignore` guard exists, but the rule is behavioral: never `git add -A` without
reading the status list.

## Markdown-first

**`docs-src/*.md` files are the canonical sources. HTML pages are presentation
exports.** If an HTML page and its `.md` source disagree, the `.md` wins and the HTML
is stale. Every canonical `.md` carries a metadata header: canonical path, html-export
target, audience, owner, status, last-reviewed.

## Canonical sources

| Canonical `.md` | HTML export | Audience |
|---|---|---|
| `docs-src/investor-pack-v2.md` | `investor-pack-v2.html` | Vlad / investors |
| `docs-src/mvp-v2-scope.md` | `mvp-v2-scope.html` | Sprint commissioner |
| `docs-src/feature-stage-pack.md` | `feature-stage-pack.html` | Vlad / investors / product reviewers |
| `docs-src/manager-coach-analyst-capabilities.md` | `manager-coach-analyst-capabilities.html` | Managers / coaches / analysts / investors |
| `docs-src/model-data-cloud-costs.md` | `model-data-cloud-costs.html` | Investor/partner |
| `docs-src/model-evidence.md` | `model-evidence.html` | DS/technical diligence |
| `docs-src/engineering-overview.md` | `engineering.html` (absorbing engineering-data/models/roadmap) | Technical reviewers |
| `docs-src/legal-pointer.md` | `legal-pointer.html` | External rights queries |
| `docs-src/term-options/*.md` | `exports/term-options/*.pdf` | Commercial structure discussion |
| `docs-src/term-sheets/*.md` | `exports/term-sheets/*.pdf` | Professional discussion term sheets and cost schedules |

Other content: `sessions/` (build history, append-only), `concepts/` (vision material,
concept banners mandatory), `stage-resources/` (stage-specific public-safe inspiration
and resource notes), `models/` (educational explainers), `archive/` (to create:
superseded pages, never linked).

Legacy pages pending merge/archive: `investor.html`, `index.html`, `market.html`,
`comparison.html`, `use-cases.html`, `selling.html`, `product-paths.html`,
`mvp-proposal.html`, `fieldstate_mvp_proposal_updated_v2.html`,
`engineering-data/models/roadmap.html`.

## Canonical-claim rule

Every number has exactly one home:
- **Model metrics** → frozen, commit-pinned evidence artifacts in the product repo,
  explained by `model-evidence.md`. The investor pack may quote only the approved
  headline claims that the evidence explainer verifies.
- **Stage budgets and the retainer figure** → `investor-pack-v2.md`. The cost brief
  explains cost structure and must not restate stage totals.
- **Build facts** → the session doc that shipped them.
A value appearing in two places is a bug.

## Link rules

Hub-and-spoke from the investor pack (commercial) and engineering overview
(technical). Links flow one way: commercial → evidence explainer; engineering →
evidence. Commercial pages never link into engineering (stack/vendor names live
there). Nothing links into `archive/`.

## Sync rule (md → html)

Edit the `.md` → sync the HTML export the same day → bump `last-reviewed`. If you
cannot sync immediately, banner the HTML "STALE — see docs-src".

## Before pushing or sharing externally

- [ ] `git status` read line by line — no private files staged.
- [ ] Content came from the canonical `.md`, not memory.
- [ ] Every metric traces to the evidence explainer / frozen artifact.
- [ ] No stack/vendor/repo names in commercial pages.
- [ ] No equity figures or negotiation content anywhere.
- [ ] Claims match current gate status (what is and is not wired into the product).
