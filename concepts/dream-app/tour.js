(() => {
  "use strict";

  const steps = [
    {
      page: "home.html",
      selector: '[data-tour-id="analysis-launcher"]',
      title: "Start with the football question",
      body: "Choose a competition, team, match or player to open the right analysis path.",
      nextHref: "index.html"
    },
    {
      page: "index.html",
      selector: '[data-tour-id="command-centre-cards"]',
      title: "Rank what deserves review",
      body: "The Command Centre brings the most important decision moments to the top.",
      nextHref: "match-room.html"
    },
    {
      page: "match-room.html",
      selector: '[data-tour-id="top-leverage-moment"]',
      title: "Reduce the full match",
      body: "A full match becomes a short list of reviewable decision moments.",
      nextHref: "moment.html"
    },
    {
      page: "moment.html",
      selector: '[data-tour-id="recorded-choice"]',
      title: "Begin with recorded fact",
      body: "Fact mode shows what happened and keeps the actual choice visually clear.",
      nextHref: "lab.html"
    },
    {
      page: "lab.html",
      selector: '[data-tour-id="hypothetical-branch"]',
      title: "Separate the alternative",
      body: "Dashed styling keeps the counterfactual branch distinct from recorded facts.",
      nextHref: "evidence.html"
    },
    {
      page: "evidence.html",
      selector: '[data-tour-id="evidence-gates"]',
      title: "Gate every model output",
      body: "Model outputs only earn product use after evidence and provenance checks.",
      nextHref: "scout.html"
    },
    {
      page: "scout.html",
      selector: '[data-tour-id="player-decision-profile"]',
      title: "Connect analysis to development",
      body: "Later stages can turn decision evidence into player review and development workflows.",
      nextHref: "home.html"
    }
  ];

  const params = new URLSearchParams(window.location.search);
  const currentPage = window.location.pathname.split("/").pop() || "home.html";
  const startButton = document.createElement("button");
  const banner = document.querySelector(".concept-banner");
  let activeTarget = null;
  let overlay = null;
  let dialog = null;
  let previousFocus = null;

  startButton.type = "button";
  startButton.className = "tour-start";
  startButton.textContent = "Start guided tour";
  startButton.addEventListener("click", () => {
    window.location.href = tourHref("home.html", 0);
  });
  if (banner) banner.appendChild(startButton);

  if (params.get("tour") === "1") {
    const requestedStep = Number.parseInt(params.get("step") || "0", 10);
    showStep(Number.isFinite(requestedStep) ? requestedStep : 0);
  }

  function tourHref(href, stepIndex) {
    const url = new URL(href, window.location.href);
    url.searchParams.set("tour", "1");
    url.searchParams.set("step", String(stepIndex));
    return url.href;
  }

  function showStep(stepIndex) {
    const step = steps[stepIndex];
    if (!step) {
      finishTour();
      return;
    }

    if (currentPage !== step.page) {
      window.location.replace(tourHref(step.page, stepIndex));
      return;
    }

    const target = document.querySelector(step.selector);
    if (!target) {
      moveToStep(stepIndex + 1);
      return;
    }

    previousFocus = document.activeElement;
    activeTarget = target;
    target.scrollIntoView({ block: "center", inline: "nearest" });
    target.classList.add("tour-highlight");

    overlay = document.createElement("div");
    overlay.className = "tour-overlay";
    overlay.setAttribute("aria-hidden", "true");
    document.body.appendChild(overlay);

    dialog = document.createElement("section");
    dialog.className = "tour-dialog";
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");
    dialog.setAttribute("aria-labelledby", "tour-title");
    dialog.setAttribute("aria-describedby", "tour-body");

    const count = document.createElement("div");
    count.className = "tour-count";
    count.textContent = `${stepIndex + 1} of ${steps.length}`;

    const title = document.createElement("h2");
    title.id = "tour-title";
    title.textContent = step.title;

    const body = document.createElement("p");
    body.id = "tour-body";
    body.textContent = step.body;

    const actions = document.createElement("div");
    actions.className = "tour-actions";

    const skip = document.createElement("button");
    skip.type = "button";
    skip.className = "tour-skip";
    skip.textContent = "Skip tour";
    skip.addEventListener("click", closeTour);

    const next = document.createElement("button");
    next.type = "button";
    next.className = "tour-next";
    next.textContent = stepIndex === steps.length - 1 ? "Finish" : "Next";
    next.addEventListener("click", () => {
      if (stepIndex === steps.length - 1) {
        window.location.href = step.nextHref;
      } else {
        window.location.href = tourHref(step.nextHref, stepIndex + 1);
      }
    });

    actions.append(skip, next);
    dialog.append(count, title, body, actions);
    document.body.appendChild(dialog);
    positionDialog();
    next.focus();

    window.addEventListener("resize", positionDialog);
    window.addEventListener("scroll", positionDialog, true);
    document.addEventListener("keydown", onKeydown);
  }

  function moveToStep(stepIndex) {
    const step = steps[stepIndex];
    if (!step) {
      finishTour();
      return;
    }
    window.location.replace(tourHref(step.page, stepIndex));
  }

  function positionDialog() {
    if (!activeTarget || !dialog) return;

    const gap = 14;
    const edge = 16;
    const targetRect = activeTarget.getBoundingClientRect();
    const dialogRect = dialog.getBoundingClientRect();
    let top = targetRect.bottom + gap;

    if (top + dialogRect.height > window.innerHeight - edge) {
      top = targetRect.top - dialogRect.height - gap;
    }
    top = Math.max(edge, Math.min(top, window.innerHeight - dialogRect.height - edge));

    let left = targetRect.left;
    if (left + dialogRect.width > window.innerWidth - edge) {
      left = window.innerWidth - dialogRect.width - edge;
    }
    left = Math.max(edge, left);

    dialog.style.top = `${top}px`;
    dialog.style.left = `${left}px`;
  }

  function onKeydown(event) {
    if (event.key === "Escape") closeTour();
  }

  function finishTour() {
    const url = new URL("home.html", window.location.href);
    window.location.replace(url.href);
  }

  function closeTour() {
    if (activeTarget) activeTarget.classList.remove("tour-highlight");
    if (overlay) overlay.remove();
    if (dialog) dialog.remove();
    window.removeEventListener("resize", positionDialog);
    window.removeEventListener("scroll", positionDialog, true);
    document.removeEventListener("keydown", onKeydown);

    const cleanUrl = new URL(window.location.href);
    cleanUrl.searchParams.delete("tour");
    cleanUrl.searchParams.delete("step");
    window.history.replaceState({}, "", cleanUrl.href);

    if (previousFocus && typeof previousFocus.focus === "function") previousFocus.focus();
    activeTarget = null;
    overlay = null;
    dialog = null;
  }
})();
