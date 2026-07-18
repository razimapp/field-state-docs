# Guided View Plan

## Goal

Provide a short, investor-friendly tour of the static dream-product concept without changing normal navigation or implying live product behaviour.

## Approach

- Load one dependency-free `tour.js` file on every dream-app page.
- Mark stable targets with `data-tour-id` attributes.
- Keep the ordered route in one JavaScript array using `{ page, selector, title, body, nextHref }` entries.
- Carry tour progress in the URL query string (`?tour=1&step=N`). No backend, analytics, account state or persistent storage.
- Add the start control only when JavaScript is available. Without JavaScript, every page and link remains unchanged and usable.
- Place a fixed dimming layer behind the selected target, raise the target with `tour-highlight`, and position an accessible dialog beside it.
- If a target is absent, advance to the next route step. `Skip tour` closes the layer and removes tour query parameters.

## Route

1. Home: analysis launcher.
2. Command Centre: ranked review cards.
3. Match Room: top leverage moment.
4. Moment Replay: recorded action.
5. Counterfactual Lab: dashed hypothetical branch.
6. Evidence Centre: release gate and provenance.
7. Scout: player decision profile.
8. The Finish action returns to Home with tour state removed.

## Acceptance checks

- All route selectors resolve on their named pages.
- Next and Skip work with local file navigation and normal hosted navigation.
- Missing selectors do not trap the user.
- Keyboard focus moves to the tour dialog, Escape skips, and reduced-motion preferences are respected.
- No page depends on JavaScript for its existing content or links.
