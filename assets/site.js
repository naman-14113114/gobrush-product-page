(function () {
  "use strict";

  const arrowIcon = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  const bagIcon = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M5.5 8.5h13l-1 12h-11l-1-12Z"/><path d="M9 9V6.5a3 3 0 0 1 6 0V9"/></svg>';
  const menuIcon = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
  const closeIcon = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m6 6 12 12M18 6 6 18"/></svg>';

  const headerTarget = document.querySelector("[data-site-header]");
  const footerTarget = document.querySelector("[data-site-footer]");
  const currentPage = document.body.dataset.page || "";

  const current = (page) => currentPage === page ? ' aria-current="page"' : "";

  if (headerTarget) {
    headerTarget.innerHTML = `
      <a class="skip-link" href="#main">Skip to content</a>
      <div class="announcement">Free tracked UK delivery · 90-day home trial</div>
      <header class="site-header">
        <div class="site-shell site-header__inner">
          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu">${menuIcon}</button>
          <nav class="site-nav" aria-label="Main navigation">
            <a href="/shop"${current("shop")}>Shop</a>
            <a href="/about"${current("about")}>Our approach</a>
            <a href="/faq"${current("faq")}>Help</a>
          </nav>
          <a class="site-logo" href="/" aria-label="Miroooo home">Miroooo</a>
          <div class="site-actions">
            <a class="site-actions__text" href="/order-tracking"${current("tracking")}>Track order</a>
            <a class="site-actions__shop" href="/shop" aria-label="Shop Miroooo toothbrushes">${bagIcon}<span class="site-actions__text">Shop</span></a>
          </div>
        </div>
      </header>
      <nav class="mobile-panel" id="mobile-menu" aria-label="Mobile navigation" aria-hidden="true">
        <a href="/shop">Shop ${arrowIcon}</a>
        <a href="/about">Our approach ${arrowIcon}</a>
        <a href="/faq">Help &amp; FAQs ${arrowIcon}</a>
        <a href="/order-tracking">Track order ${arrowIcon}</a>
        <a href="/contact">Contact ${arrowIcon}</a>
        <p class="mobile-panel__meta">Designed for quieter, more considered daily care.</p>
      </nav>`;
  }

  if (footerTarget) {
    footerTarget.innerHTML = `
      <footer class="site-footer">
        <div class="site-shell">
          <div class="site-footer__top">
            <div class="site-footer__brand">
              <a class="site-footer__logo" href="/" aria-label="Miroooo home">MIROOOO</a>
              <p>Quietly precise electric toothbrushes, built to make better brushing feel uncomplicated.</p>
            </div>
            <div class="site-footer__column">
              <strong>Shop</strong>
              <a href="/products/miroooo-x" data-product-link>Miroooo X</a>
              <a href="/products/miroooo-x2" data-product-link>Miroooo X2</a>
              <a href="/shop">Compare models</a>
            </div>
            <div class="site-footer__column">
              <strong>Support</strong>
              <a href="/faq">FAQs</a>
              <a href="/delivery-returns">Delivery &amp; returns</a>
              <a href="/warranty">Warranty</a>
              <a href="/order-tracking">Track order</a>
              <a href="/contact">Contact</a>
            </div>
            <div class="site-footer__column">
              <strong>About</strong>
              <a href="/about">Our approach</a>
              <a href="/privacy">Privacy</a>
              <a href="/terms">Terms</a>
            </div>
          </div>
          <div class="site-footer__bottom">
            <span>© <span data-current-year></span> Miroooo. All rights reserved.</span>
            <div class="site-footer__legal">
              <a href="/privacy">Privacy policy</a>
              <a href="/terms">Terms of service</a>
            </div>
          </div>
        </div>
      </footer>`;
  }

  const toggle = document.querySelector(".nav-toggle");
  const mobilePanel = document.querySelector(".mobile-panel");

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
  mobilePanel?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 980) setMenu(false);
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
    }, { threshold: 0.12, rootMargin: "0px 0px -5%" });
    revealItems.forEach((item) => observer.observe(item));
  }

  const trackingForm = document.querySelector("[data-tracking-form]");
  trackingForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = document.querySelector("[data-tracking-message]");
    if (!message) return;
    message.classList.add("is-visible");
    message.focus();
  });
})();
