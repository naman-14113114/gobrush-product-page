(function () {
  "use strict";

  const arrowIcon = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  const accountIcon = '<svg class="icon icon-account icon-lg" viewBox="0 0 24 24" stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="10.5" height="10.5" x="6.75" y="1.75" rx="5.25"></rect><path stroke-linecap="round" d="M12 15.5c1.5 0 4 .333 4.5.5.5.167 3.7.8 4.5 2 1 1.5 1 2 1 4m-10-6.5c-1.5 0-4 .333-4.5.5-.5.167-3.7.8-4.5 2-1 1.5-1 2-1 4"></path></svg>';
  const bagIcon = '<svg class="icon icon-cart icon-lg" viewBox="0 0 24 24" stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M1 1h.5v0c.226 0 .339 0 .44.007a3 3 0 0 1 2.62 1.976c.034.095.065.204.127.42l.17.597m0 0 1.817 6.358c.475 1.664.713 2.496 1.198 3.114a4 4 0 0 0 1.633 1.231c.727.297 1.592.297 3.322.297h2.285c1.75 0 2.626 0 3.359-.302a4 4 0 0 0 1.64-1.253c.484-.627.715-1.472 1.175-3.161l.06-.221c.563-2.061.844-3.092.605-3.906a3 3 0 0 0-1.308-1.713C19.92 4 18.853 4 16.716 4H4.857ZM12 20a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm8 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"></path></svg>';
  const menuIcon = '<svg class="icon icon-hamburger icon-lg" viewBox="0 0 24 24" stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" d="M3 6H21M3 12H11M3 18H16"></path></svg>';
  const closeIcon = '<svg class="icon icon-close icon-sm" viewBox="0 0 20 20" stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M5 15L15 5M5 5L15 15"></path></svg>';
  const supportIcon = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M4 13a8 8 0 0 1 16 0v4a2 2 0 0 1-2 2h-2v-6h4M4 13h4v6H6a2 2 0 0 1-2-2v-4Z"/></svg>';
  const deliveryIcon = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M3 6h12v11H3zM15 10h3l3 3v4h-6z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg>';
  const trialIcon = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M12 3 4.5 6v5.5c0 4.7 3.1 7.9 7.5 9.5 4.4-1.6 7.5-4.8 7.5-9.5V6L12 3Z"/><path d="m9 12 2 2 4-4"/></svg>';
  const warrantyIcon = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';

  const headerTarget = document.querySelector("[data-site-header]");
  const footerTarget = document.querySelector("[data-site-footer]");
  const currentPage = document.body.dataset.page || "";
  const isOverlayHeader = Boolean(headerTarget?.hasAttribute("data-overlay-header") || currentPage === "home");
  const current = (pages) => pages.includes(currentPage) ? ' aria-current="page"' : "";
  const flipLabel = (label) => `<span class="nav-link__flip"><span>${label}</span><span aria-hidden="true">${label}</span></span>`;
  const menuPill = (href, label, pages) => `
    <li>
      <a href="${href}" class="menu__item nav-link text-sm-lg flex items-center font-medium z-2 relative cursor-pointer" is="magnet-link" data-magnet="0"${pages ? current(pages) : ""}>
        <span class="btn-text" data-text="${label}">${label}</span>
        <span class="btn-text btn-duplicate">${label}</span>
      </a>
    </li>`;

  if (headerTarget) {
    headerTarget.classList.toggle("header-layer--overlay", isOverlayHeader);
    headerTarget.innerHTML = `
      <div class="announcement"><span>Free tracked UK delivery</span><span>90-day home trial</span></div>
      <header class="site-header${isOverlayHeader ? " site-header--overlay" : ""}">
        <div class="site-header__inner">
          <div class="site-header__left">
            <button class="nav-toggle menu-drawer-button flex items-center justify-center lg:hidden" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu" is="magnet-button">
              <span class="sr-only">Navigation</span>
              ${menuIcon}
            </button>
            <nav class="header__menu site-nav hidden lg:flex" role="navigation" aria-label="Main navigation">
              <ul class="flex flex-wrap list-menu with-block">
                ${menuPill("/shop", "Shop", ["shop"])}
                ${menuPill("/products/miroooo-x2", "Bundles", ["bundles"])}
                ${menuPill("/contact", "Contact", ["contact"])}
                ${menuPill("/faq", "FAQ", ["faq"])}
              </ul>
            </nav>
          </div>
          <div class="site-header__center">
            <a class="site-logo header__logo-link flex items-center relative" href="/" aria-label="Miroooo home">
              <span>MIROOOO</span>
            </a>
          </div>
          <div class="site-header__right site-actions header__icons header__icons--end flex justify-end z-2">
            <div class="header__buttons flex items-center gap-1d5">
              <a class="account-link hidden lg:flex items-center justify-center" href="/order-tracking" aria-label="Track order" is="magnet-link" rel="nofollow"${current(["tracking"])}>
                ${accountIcon}
              </a>
              <a class="site-actions__bag cart-drawer-button flex items-center justify-center relative" href="/cart" aria-label="Cart" is="magnet-link" aria-controls="CartDrawer" aria-expanded="false" data-no-instant>
                ${bagIcon}
                <cart-count class="count absolute top-0 right-0 text-xs" aria-label="0 items" hidden>0</cart-count>
              </a>
            </div>
          </div>
        </div>
      </header>
      <nav class="mobile-panel menu-drawer" id="mobile-menu" aria-label="Mobile navigation" aria-hidden="true">
        <div class="mobile-panel__top">
          <span>Menu</span>
          <button class="mobile-panel__close button button--close" type="button" aria-label="Close menu">${closeIcon}</button>
        </div>
        <div class="mobile-panel__links">
          <a class="drawer__menu-item" href="/shop"><span>Shop</span>${arrowIcon}</a>
          <a class="drawer__menu-item" href="/products/miroooo-x2" data-product-link><span>Miroooo X2 (Bundles)</span>${arrowIcon}</a>
          <a class="drawer__menu-item" href="/about"><span>Our approach</span>${arrowIcon}</a>
          <a class="drawer__menu-item" href="/faq"><span>FAQs</span>${arrowIcon}</a>
          <a class="drawer__menu-item" href="/order-tracking"><span>Track order</span>${arrowIcon}</a>
          <a class="drawer__menu-item" href="/contact"><span>Contact</span>${arrowIcon}</a>
        </div>
        <div class="mobile-panel__bottom">
          <p>Precision without the noise.</p>
          <span>support@miroooo.co</span>
        </div>
      </nav>`;
  }

  // Scroll listener for sticky transition on scroll on transparent home page
  if (isOverlayHeader) {
    const headerEl = headerTarget?.querySelector(".site-header");
    const checkScroll = () => {
      if (!headerEl) return;
      if (window.scrollY > 40) {
        headerEl.classList.add("is-scrolled");
      } else {
        headerEl.classList.remove("is-scrolled");
      }
    };
    window.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
  }

  // Authentic GoBrush Magnet Spring Hover Physics
  const initMagnet = () => {
    const magnetTargets = document.querySelectorAll(
      '[is="magnet-link"], [is="magnet-button"]'
    );
    magnetTargets.forEach((target) => {
      if (target.dataset.magnetAttached) return;
      target.dataset.magnetAttached = "true";

      const btnText = target.querySelector("[data-text]");

      target.addEventListener("mousemove", (e) => {
        const rect = target.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;

        if (btnText) {
          btnText.style.transform = `translate3d(${x}px, ${y}px, 0px)`;
          btnText.style.transition = "transform 0.08s ease-out";
        } else {
          target.style.transform = `translate3d(${x}px, ${y}px, 0px)`;
          target.style.transition = "transform 0.08s ease-out";
        }
      });

      target.addEventListener("mouseleave", () => {
        if (btnText) {
          btnText.style.transform = "translate3d(0px, 0px, 0px)";
          btnText.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
        } else {
          target.style.transform = "translate3d(0px, 0px, 0px)";
          target.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
        }
      });
    });
  };

  // Authentic GoBrush Flickity Horizontal Sliding Hover Track on Cards
  const initSlideGalleries = () => {
    document.querySelectorAll("[data-slide-gallery]").forEach((gallery) => {
      if (gallery.dataset.slideAttached) return;
      gallery.dataset.slideAttached = "true";

      const track = gallery.querySelector(".gb-product-card__track");
      const slides = gallery.querySelectorAll(".gb-product-card__slide");
      const dots = gallery.querySelectorAll(".flickity-page-dots .dot");
      const count = slides.length;
      if (!track || count <= 1) return;

      const selectSlide = (index) => {
        track.style.transform = `translate3d(-${index * (100 / count)}%, 0, 0)`;
        dots.forEach((dot, i) => {
          dot.classList.toggle("is-selected", i === index);
        });
      };

      gallery.addEventListener("mousemove", (e) => {
        const rect = gallery.getBoundingClientRect();
        const mouseX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        const index = Math.min(Math.floor((mouseX / rect.width) * count), count - 1);
        selectSlide(index);
      });

      gallery.addEventListener("mouseleave", () => {
        selectSlide(0);
      });
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      initMagnet();
      initSlideGalleries();
    });
  } else {
    initMagnet();
    initSlideGalleries();
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

  const toggleButtons = document.querySelectorAll(".nav-toggle, .menu-drawer-button");
  const mobilePanel = document.querySelector(".mobile-panel");
  const mobileClose = document.querySelector(".mobile-panel__close");

  function setMenu(open) {
    if (!mobilePanel) return;
    toggleButtons.forEach((btn) => {
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    mobilePanel.classList.toggle("is-open", open);
    mobilePanel.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("nav-open", open);
  }

  toggleButtons.forEach((btn) => {
    btn.addEventListener("click", () => setMenu(!mobilePanel?.classList.contains("is-open")));
  });
  mobileClose?.addEventListener("click", () => setMenu(false));
  mobilePanel?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) setMenu(false);
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
