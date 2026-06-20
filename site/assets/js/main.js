/* ============================================================================
   autonomous-kickoff — site behavior
   Progressive enhancement: everything renders without JS; this adds polish.
   ========================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Header: scrolled state ------------------------------------------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.setAttribute("data-scrolled", window.scrollY > 8 ? "true" : "false");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- Mobile nav toggle ------------------------------------------------- */
  var toggle = document.querySelector(".nav-toggle");
  if (toggle && header) {
    var setOpen = function (open) {
      header.setAttribute("data-nav-open", open ? "true" : "false");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    };
    toggle.addEventListener("click", function () {
      setOpen(header.getAttribute("data-nav-open") !== "true");
    });
    header.querySelectorAll(".nav-links a").forEach(function (a) {
      a.addEventListener("click", function () { setOpen(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
  }

  /* ---- Reveal on scroll (PURE enhancement) ------------------------------ */
  var revealEls = document.querySelectorAll(".reveal, .reveal-stagger");
  function revealAll() { revealEls.forEach(function (el) { el.classList.add("is-in"); }); }
  if (revealEls.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealAll();
    } else {
      revealEls.forEach(function (el) {
        if (el.classList.contains("reveal-stagger")) {
          Array.prototype.forEach.call(el.children, function (child, i) {
            child.style.setProperty("--i", i);
          });
        }
      });
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      }, { rootMargin: "0px 0px -10% 0px", threshold: 0.12 });
      revealEls.forEach(function (el) { io.observe(el); });
      // Failsafe: never leave content hidden for a non-scrolling renderer
      // (search/JS bots, automated capture). Real users get the scroll effect first.
      setTimeout(revealAll, 2200);
      window.addEventListener("beforeprint", revealAll);
    }
  }

  /* ---- Copy to clipboard ------------------------------------------------- */
  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).then(function () { return true; }, fallbackCopy.bind(null, text));
    }
    return Promise.resolve(fallbackCopy(text));
  }
  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "-1000px";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }

  var live = document.getElementById("copy-live");
  document.querySelectorAll(".copy-btn").forEach(function (btn) {
    var resetTimer;
    btn.addEventListener("click", function () {
      var targetId = btn.getAttribute("data-copy-target");
      var src = targetId && document.getElementById(targetId);
      if (!src) return;
      var text = src.textContent.replace(/^\s+|\s+$/g, "");
      copyText(text).then(function (ok) {
        if (!ok) { if (live) live.textContent = "Press Ctrl/Cmd+C to copy."; return; }
        btn.classList.add("is-copied");
        var label = btn.querySelector(".copy-label");
        var prev = label ? label.textContent : null;
        if (label) label.textContent = "Copied";
        if (live) live.textContent = "Copied " + (btn.getAttribute("data-copy-name") || "prompt") + " to clipboard.";
        clearTimeout(resetTimer);
        resetTimer = setTimeout(function () {
          btn.classList.remove("is-copied");
          if (label && prev !== null) label.textContent = prev;
        }, 2200);
      });
    });
  });

  /* ---- TOC scrollspy (reference page) ----------------------------------- */
  var tocLinks = document.querySelectorAll(".toc a[href^='#']");
  if (tocLinks.length && "IntersectionObserver" in window) {
    var linkFor = {};
    tocLinks.forEach(function (a) { linkFor[a.getAttribute("href").slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = linkFor[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          tocLinks.forEach(function (l) { l.removeAttribute("aria-current"); });
          link.setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-20% 0px -70% 0px", threshold: 0 });
    Object.keys(linkFor).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) spy.observe(el);
    });
  }

  /* ---- Footer year ------------------------------------------------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
