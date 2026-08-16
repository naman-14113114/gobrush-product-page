(function () {
  "use strict";

  const arrowIcon = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  const bagIcon = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.55"><path d="M5.5 8.5h13l-1 12h-11l-1-12Z"/><path d="M9 9V6.5a3 3 0 0 1 6 0V9"/></svg>';
  const menuIcon = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.55"><path d="M3 8h18M3 16h18"/></svg>';
  const closeIcon = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.55"><path d="m5 5 14 14M19 5 5 19"/></svg>';
  const supportIcon = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M4 13a8 8 0 0 1 16 0v4a2 2 0 0 1-2 2h-2v-6h4M4 13h4v6H6a2 2 0 0 1-2-2v-4Z"/></svg>';
  const deliveryIcon = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M3 6h12v11H3zM15 10h3l3 3v4h-6z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg>';
  const trialIcon = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M12 3 4.5 6v5.5c0 4.7 3.1 7.9 7.5 9.5 4.4-1.6 7.5-4.8 7.5-9.5V6L12 3Z"/><path d="m9 12 2 2 4-4"/></svg>';
  const warrantyIcon = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';

  const headerTarget = document.querySelector("[data-site-header]");
  const footerTarget = document.querySelector("[data-site-footer]");
  const currentPage = document.body.dataset.page || "";
  const isOverlayHeader = Boolean(headerTarget?.hasAttribute("data-overlay-header"));
  const current = (pages) => pages.includes(currentPage) ? ' aria-current="page"' : "";
  const flipLabel = (label) => `<span class="nav-link__flip"><span>${label}</span><span aria-hidden="true">${label}</span></span>`;

  if (headerTarget) {
    headerTarget.classList.toggle("header-layer--overlay", isOverlayHeader);
    headerTarget.innerHTML = `
      <div class="announcement"><span>Free tracked UK delivery</span><span>90-day home trial</span></div>
      <header class="site-header${isOverlayHeader ? " site-header--overlay" : ""}">
        <div class="site-header__inner">
          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu">${menuIcon}</button>
          <nav class="site-nav" aria-label="Main navigation">
            <a class="nav-link" href="/shop"${current(["shop"])}>${flipLabel("Shop")}</a>
            <a class="nav-link" href="/products/miroooo-x2" data-product-link>${flipLabel("Miroooo X2")}</a>
            <a class="nav-link" href="/contact"${current(["contact"])}>${flipLabel("Contact")}</a>
            <a class="nav-link" href="/faq"${current(["faq"])}>${flipLabel("FAQ")}</a>
          </nav>
          <a class="site-logo" href="/" aria-label="Miroooo home">MIROOOO</a>
          <div class="site-actions">
            <a class="nav-link site-actions__track" href="/order-tracking"${current(["tracking"])}>${flipLabel("Track order")}</a>
            <a class="site-actions__bag" href="/shop" aria-label="Shop Miroooo">${bagIcon}<span>0</span></a>
          </div>
        </div>
      </header>
      <nav class="mobile-panel" id="mobile-menu" aria-label="Mobile navigation" aria-hidden="true">
        <div class="mobile-panel__top">
          <span>Menu</span>
          <button class="mobile-panel__close" type="button" aria-label="Close menu">${closeIcon}</button>
        </div>
        <div class="mobile-panel__links">
          <a href="/shop"><span>Shop</span>${arrowIcon}</a>
          <a href="/products/miroooo-x2" data-product-link><span>Miroooo X2</span>${arrowIcon}</a>
          <a href="/about"><span>Our approach</span>${arrowIcon}</a>
          <a href="/faq"><span>FAQs</span>${arrowIcon}</a>
          <a href="/order-tracking"><span>Track order</span>${arrowIcon}</a>
          <a href="/contact"><span>Contact</span>${arrowIcon}</a>
        </div>
        <div class="mobile-panel__bottom">
          <p>Precision without the noise.</p>
          <span>support@miroooo.co</span>
        </div>
      </nav>`;
  }

  if (footerTarget) {
    footerTarget.innerHTML = `
      <aside class="service-strip" aria-label="Miroooo customer care">
        <div class="service-strip__item">${supportIcon}<div><strong>Customer support</strong><span>Real help when you need it</span></div></div>
        <div class="service-strip__item">${deliveryIcon}<div><strong>Tracked UK delivery</strong><span>Free with every brush</span></div></div>
        <div class="service-strip__item">${trialIcon}<div><strong>90-day home trial</strong><span>Take time to decide</span></div></div>
        <div class="service-strip__item">${warrantyIcon}<div><strong>Two-year warranty</strong><span>Made for daily use</span></div></div>
      </aside>
      <footer class="site-footer">
        <div class="site-footer__main">
          <div class="site-footer__brand">
            <a class="site-footer__logo" href="/" aria-label="Miroooo home">MIROOOO</a>
            <p>Quietly precise sonic care, designed around the everyday ritual.</p>
          </div>
          <div class="site-footer__column">
            <strong>Shop</strong>
            <a href="/products/miroooo-x" data-product-link>Miroooo X</a>
            <a href="/products/miroooo-x2" data-product-link>Miroooo X2</a>
            <a href="/shop">Compare models</a>
          </div>
          <div class="site-footer__column">
            <strong>Help</strong>
            <a href="/faq">FAQs</a>
            <a href="/delivery-returns">Delivery &amp; returns</a>
            <a href="/warranty">Warranty</a>
            <a href="/order-tracking">Track order</a>
          </div>
          <div class="site-footer__column">
            <strong>Miroooo</strong>
            <a href="/about">Our approach</a>
            <a href="/contact">Contact</a>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
          </div>
        </div>
        <div class="site-footer__bottom">
          <span>© <span data-current-year></span> Miroooo</span>
          <span>United Kingdom · GBP</span>
        </div>
      </footer>`;
  }

  const toggle = document.querySelector(".nav-toggle");
  const mobilePanel = document.querySelector(".mobile-panel");
  const mobileClose = document.querySelector(".mobile-panel__close");

  function setMenu(open) {
    if (!toggle || !mobilePanel) return;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    toggle.innerHTML = open ? closeIcon : menuIcon;
    mobilePanel.classList.toggle("is-open", open);
    mobilePanel.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("nav-open", open);
  }

  toggle?.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
  mobileClose?.addEventListener("click", () => setMenu(false));
  mobilePanel?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) setMenu(false);
  });

  document.querySelectorAll("[data-current-year]").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  const allowedAttribution = ["msclkid", "gclid", "fbclid", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
  const incoming = new URLSearchParams(window.location.search);
  const captured = {};

  allowedAttribution.forEach((key) => {
    const value = incoming.get(key);
    if (value) captured[key] = value;
  });

  if (Object.keys(captured).length) {
    try {
      sessionStorage.setItem("miroooo_attribution", JSON.stringify(captured));
    } catch (_) {
      // Navigation must never depend on storage access.
    }
  }

  let attribution = captured;
  if (!Object.keys(attribution).length) {
    try {
      attribution = JSON.parse(sessionStorage.getItem("miroooo_attribution") || "{}");
    } catch (_) {
      attribution = {};
    }
  }

  document.querySelectorAll("a[data-product-link]").forEach((link) => {
    if (!Object.keys(attribution).length) return;
    const target = new URL(link.href, window.location.origin);
    Object.entries(attribution).forEach(([key, value]) => target.searchParams.set(key, value));
    link.href = target.toString();
  });

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealItems = document.querySelectorAll(".reveal");

  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -5%" });
    revealItems.forEach((item) => observer.observe(item));
  }

  requestAnimationFrame(() => document.body.classList.add("is-ready"));

  document.querySelectorAll("[data-drag-scroll]").forEach((scroller) => {
    let pointerDown = false;
    let pointerStart = 0;
    let scrollStart = 0;
    let moved = false;

    scroller.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "touch") return;
      pointerDown = true;
      moved = false;
      pointerStart = event.clientX;
      scrollStart = scroller.scrollLeft;
      scroller.classList.add("is-dragging");
      scroller.setPointerCapture(event.pointerId);
    });
    scroller.addEventListener("pointermove", (event) => {
      if (!pointerDown) return;
      const distance = event.clientX - pointerStart;
      if (Math.abs(distance) > 5) moved = true;
      scroller.scrollLeft = scrollStart - distance;
    });
    const endDrag = (event) => {
      if (!pointerDown) return;
      pointerDown = false;
      scroller.classList.remove("is-dragging");
      if (scroller.hasPointerCapture(event.pointerId)) scroller.releasePointerCapture(event.pointerId);
    };
    scroller.addEventListener("pointerup", endDrag);
    scroller.addEventListener("pointercancel", endDrag);
    scroller.addEventListener("click", (event) => {
      if (!moved) return;
      event.preventDefault();
      event.stopPropagation();
      moved = false;
    }, true);
  });

  const trackingForm = document.querySelector("[data-tracking-form]");
  trackingForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = document.querySelector("[data-tracking-message]");
    if (!message) return;
    message.classList.add("is-visible");
    message.focus();
  });
})();
