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
      <div class="announcement" style="overflow: hidden; padding: 3px 0; min-height: 22px;">
        <div class="miroooo-announcement-ticker">
          <div class="miroooo-ticker-item"><span>Free Shipping on all orders</span> <span class="miroooo-ticker-dot" aria-hidden="true"></span></div>
          <div class="miroooo-ticker-item"><span>50% OFF Today + 3 Free Gifts</span> <span class="miroooo-ticker-dot" aria-hidden="true"></span></div>
          <div class="miroooo-ticker-item"><span>Ultra Lightweight</span> <span class="miroooo-ticker-dot" aria-hidden="true"></span></div>
          <div class="miroooo-ticker-item"><span>4.9 Stars from 40,000+ Customers</span> <span class="miroooo-ticker-dot" aria-hidden="true"></span></div>
          <div class="miroooo-ticker-item"><span>90-Day Risk-Free Home Trial</span> <span class="miroooo-ticker-dot" aria-hidden="true"></span></div>
          <div class="miroooo-ticker-item"><span>Free Shipping on all orders</span> <span class="miroooo-ticker-dot" aria-hidden="true"></span></div>
          <div class="miroooo-ticker-item"><span>50% OFF Today + 3 Free Gifts</span> <span class="miroooo-ticker-dot" aria-hidden="true"></span></div>
          <div class="miroooo-ticker-item"><span>Ultra Lightweight</span> <span class="miroooo-ticker-dot" aria-hidden="true"></span></div>
          <div class="miroooo-ticker-item"><span>4.9 Stars from 40,000+ Customers</span> <span class="miroooo-ticker-dot" aria-hidden="true"></span></div>
          <div class="miroooo-ticker-item"><span>90-Day Risk-Free Home Trial</span> <span class="miroooo-ticker-dot" aria-hidden="true"></span></div>
        </div>
      </div>
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
              <a class="account-link flex items-center justify-center" href="/order-tracking" aria-label="Track order" is="magnet-link" rel="nofollow"${current(["tracking", "order-tracking"])}>
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
            <a href="/order-tracking">Track order</a>
            <a href="/shipping-policy">Shipping policy</a>
            <a href="/return-policy">Return policy</a>
            <a href="/refund-policy">Refund policy</a>
            <a href="/warranty">Warranty</a>
          </div>
          <div class="site-footer__column">
            <strong>Miroooo</strong>
            <a href="/about">Our approach</a>
            <a href="/contact">Contact</a>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="/cookies-policy">Cookies</a>
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
      // Don't capture pointer when clicking inside a link – let <a> navigate
      if (event.target.closest("a")) return;
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

  // =========================================================================
  // MIROOOO UNIVERSAL CART & PLUSBASE CHECKOUT REDIRECTION ENGINE
  // =========================================================================
  const CART_STORAGE_KEY = "miroooo_cart_v1";
  const ATTRIBUTION_STORAGE_KEY = "miroooo_attribution";

  const X_VARIANTS = {
    "Grey": "1000020348812113",
    "Gray": "1000020348812113",
    "Pink": "1000020348812111",
    "Rose Gold": "1000020348812111",
    "Silver": "1000020348812112"
  };

  const X2_VARIANTS = {
    "Grey": "1000020348810048",
    "Gray": "1000020348810048",
    "Pink": "1000020348810062",
    "Rose Gold": "1000020348810062",
    "Silver": "1000020348810046"
  };

  const GIFTS_DATABASE = {
    case: {
      id: "travel-case",
      name: "Luxury Travel Case",
      subtitle: "Protect & travel in style",
      value: "£15.95",
      valueNum: 15.95,
      image: "https://cdn.shopify.com/s/files/1/0810/6023/3561/files/Grey-color-5.jpg?v=1734444578&width=120"
    },
    heads: {
      id: "brush-heads",
      name: "2x Extra DuPont Brush Heads",
      subtitle: "Ultra-soft DuPont bristles",
      value: "£19.95",
      valueNum: 19.95,
      image: "https://cdn.shopify.com/s/files/1/0810/6023/3561/files/Grey-color-4.jpg?v=1734444578&width=120"
    },
    dock: {
      id: "charging-dock",
      name: "Magnetic Charging Dock",
      subtitle: "Fast wireless induction dock",
      value: "£24.95",
      valueNum: 24.95,
      image: "https://cdn.shopify.com/s/files/1/0810/6023/3561/files/Grey-color-7.jpg?v=1734444578&width=120"
    }
  };

  function readCapturedAttribution() {
    const currentParams = new URLSearchParams(window.location.search);
    const captured = {};
    const allowed = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "msclkid", "gclid", "fbclid", "source"];

    allowed.forEach((key) => {
      const val = currentParams.get(key);
      if (val) captured[key] = val;
    });

    try {
      const stored = JSON.parse(sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY) || localStorage.getItem(ATTRIBUTION_STORAGE_KEY) || "{}");
      return { ...stored, ...captured };
    } catch (_) {
      return captured;
    }
  }

  function buildPlusbaseCheckoutUrl(item, extraParams = {}) {
    const isX2 = item?.productHandle === "miroooo-x2" || (item?.title && item.title.includes("X2"));
    const productId = isX2 ? "1000000664011618" : "1000000664011633";
    const source = isX2 ? "miroooo-x2" : "miroooo";
    const productHandle = isX2 ? "miroooo-x2" : "miroooo-x";

    const variants = isX2 ? X2_VARIANTS : X_VARIANTS;
    const firstChoice = item?.choices?.[0] || item?.color || "Grey";
    const variantId = item?.variantId || variants[firstChoice] || (isX2 ? "1000020348810048" : "1000020348812113");

    const bundleCount = item?.bundleCount || item?.count || item?.itemCount || (item?.tierId === "bundle-3" ? 3 : item?.tierId === "bundle-2" ? 2 : 1);
    const quantity = Math.max(1, (item?.quantity || 1) * bundleCount);

    const giftQuantity = Math.max(1, quantity);
    const giftVariantId = "1000020384558655";
    const giftProductId = "1000000665008955";

    const url = new URL("https://buudy.com/pages/add-to-cart");
    const params = {
      product_id: productId,
      variant_id: variantId,
      quantity: String(quantity),
      qty: String(quantity),
      product_quantity: String(quantity),
      gift_variant_id: giftVariantId,
      gift_product_id: giftProductId,
      gift_quantity: String(giftQuantity),
      gift: "travel-case",
      redirect: "checkout",
      product_handle: productHandle,
      source: source,
      utm_source: "miroooo_direct",
      utm_medium: "store_cart_checkout",
      utm_campaign: source
    };

    const attribution = readCapturedAttribution();
    Object.assign(params, attribution, extraParams);

    Object.entries(params).forEach(([k, v]) => {
      if (v != null && v !== "") {
        url.searchParams.set(k, String(v));
      }
    });

    return url.toString();
  }

  const MirooooCart = {
    timerInterval: null,
    timerSeconds: 585, // 09m : 45s

    getCart() {
      try {
        if (localStorage.getItem("miroooo_cart_empty") === "true") {
          return { items: [], promoCode: "AUTO", promoApplied: true };
        }

        const storedStandard = localStorage.getItem("miroooo_cart");
        if (storedStandard) {
          const parsed = JSON.parse(storedStandard);
          if (parsed && parsed.quantity > 0) {
            const isX2 = parsed.productId === "miroooo-x2";
            const productHandle = isX2 ? "miroooo-x2" : "miroooo-x";
            const title = isX2 ? "Miroooo X2" : "Miroooo X";
            const colors = Array.isArray(parsed.colors) && parsed.colors.length > 0 ? parsed.colors : ["Grey"];

            let unitPrice = 59;
            let comparePrice = 119;
            if (isX2) {
              if (parsed.quantity === 1) { unitPrice = 79; comparePrice = 159; }
              else if (parsed.quantity === 2) { unitPrice = 148; comparePrice = 318; }
              else if (parsed.quantity === 3) { unitPrice = 198; comparePrice = 477; }
            } else {
              if (parsed.quantity === 1) { unitPrice = 59; comparePrice = 119; }
              else if (parsed.quantity === 2) { unitPrice = 110; comparePrice = 238; }
              else if (parsed.quantity === 3) { unitPrice = 147; comparePrice = 357; }
            }

            const image = isX2
              ? "/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-upright-grip.webp"
              : "/gallery_orig/Grey-color-8.jpg";

            return {
              items: [
                {
                  id: `${parsed.productId}-${parsed.quantity}`,
                  productId: isX2 ? "1000000664011618" : "1000000664011633",
                  productHandle: productHandle,
                  title: parsed.quantity > 1 ? `${title} (Buy ${parsed.quantity})` : title,
                  quantity: 1,
                  bundleCount: parsed.quantity,
                  choices: colors,
                  color: colors[0] || "Grey",
                  unitPrice: unitPrice,
                  comparePrice: comparePrice,
                  image: image,
                  unlockedGifts: parsed.quantity
                }
              ],
              promoCode: "AUTO",
              promoApplied: true
            };
          }
        }

        const stored = localStorage.getItem(CART_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed.items)) return parsed;
        }
      } catch (_) {}
      return { items: [], promoCode: "AUTO", promoApplied: true };
    },

    saveCart(cart) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        if (cart && Array.isArray(cart.items) && cart.items.length > 0) {
          const item = cart.items[0];
          const isX2 = item.productHandle === "miroooo-x2" || item.productId === "1000000664011618";
          localStorage.setItem("miroooo_cart", JSON.stringify({
            productId: isX2 ? "miroooo-x2" : "miroooo-x",
            quantity: item.bundleCount || item.quantity || 1,
            colors: item.choices || [item.color || "Grey"]
          }));
          localStorage.removeItem("miroooo_cart_empty");
        } else {
          localStorage.removeItem("miroooo_cart");
          localStorage.setItem("miroooo_cart_empty", "true");
        }
      } catch (_) {}
      this.updateHeaderBadges(cart);
      document.dispatchEvent(new CustomEvent("miroooo:cart-updated", { detail: cart }));
    },

    updateHeaderBadges(cartState) {
      const cart = cartState || this.getCart();
      const totalCount = cart.items.reduce((sum, item) => sum + (item.bundleCount || item.quantity || 1), 0);
      document.querySelectorAll("cart-count, .cart-count, .site-actions__bag .count, .cart-drawer-button .count").forEach((el) => {
        el.textContent = String(totalCount);
        if (totalCount > 0) {
          el.removeAttribute("hidden");
        } else {
          el.setAttribute("hidden", "true");
        }
      });
    },

    addItem(newItem) {
      const cart = this.getCart();
      const existingIndex = cart.items.findIndex(
        (i) => i.id === newItem.id || (i.productId === newItem.productId && i.tierId === newItem.tierId && JSON.stringify(i.choices) === JSON.stringify(newItem.choices))
      );

      if (existingIndex > -1) {
        cart.items[existingIndex].quantity = (cart.items[existingIndex].quantity || 1) + (newItem.quantity || 1);
      } else {
        cart.items.push(newItem);
      }

      this.saveCart(cart);
      this.renderCartDrawer();
      this.openCart();
    },

    updateQuantity(itemId, quantity) {
      const cart = this.getCart();
      const index = cart.items.findIndex((i) => i.id === itemId);
      if (index > -1) {
        if (quantity <= 0) {
          this.clearCart();
        } else {
          const item = cart.items[index];
          const isX2 = item.productHandle === "miroooo-x2" || item.productId === "1000000664011618";
          const newQty = Math.min(3, Math.max(1, quantity));
          let colors = item.choices || ["Grey"];
          if (newQty === 2 && colors.length < 2) colors = ["Grey", "Pink"];
          if (newQty === 3 && colors.length < 3) colors = ["Grey", "Pink", "Silver"];
          colors = colors.slice(0, newQty);

          try {
            localStorage.setItem("miroooo_cart", JSON.stringify({
              productId: isX2 ? "miroooo-x2" : "miroooo-x",
              quantity: newQty,
              colors: colors
            }));
            localStorage.removeItem("miroooo_cart_empty");
          } catch (_) {}

          this.updateHeaderBadges();
          this.renderCartDrawer();
        }
      }
    },

    removeItem(itemId) {
      this.clearCart();
    },

    clearCart() {
      try {
        localStorage.removeItem("miroooo_cart");
        localStorage.setItem("miroooo_cart_empty", "true");
        localStorage.removeItem(CART_STORAGE_KEY);
      } catch (_) {}
      this.updateHeaderBadges();
      this.renderCartDrawer();
    },

    ensureCartDrawer() {
      let drawer = document.getElementById("CartDrawer");
      if (!drawer) {
        drawer = document.createElement("div");
        drawer.id = "CartDrawer";
        drawer.className = "miroooo-cart-drawer";
        drawer.setAttribute("aria-hidden", "true");
        document.body.appendChild(drawer);
      }

      if (!drawer.querySelector(".miroooo-cart-panel")) {
        drawer.innerHTML = `
          <div class="miroooo-cart-backdrop" aria-label="Close cart overlay"></div>
          <aside class="miroooo-cart-panel" aria-label="Shopping cart" role="dialog" aria-modal="true">
            <div class="miroooo-cart-header">
              <div class="miroooo-cart-header-title-wrap">
                <p class="miroooo-cart-kicker">CART</p>
                <h2 class="miroooo-cart-title">
                  Shopping Bag
                  <span class="miroooo-cart-count-badge" id="cart-item-count-badge">0 items</span>
                </h2>
              </div>
              <button type="button" class="miroooo-cart-close-btn" aria-label="Close cart">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div class="miroooo-cart-body" id="cart-drawer-body">
              <div class="miroooo-cart-delivery-box" id="cart-delivery-box">
                <div class="miroooo-delivery-header">
                  <div class="miroooo-delivery-icon-title">
                    <span class="miroooo-delivery-pulse"></span>
                    <span class="miroooo-delivery-badge">Free Tracked UK Delivery</span>
                  </div>
                  <span class="miroooo-delivery-status">Unlocked</span>
                </div>
                <div class="miroooo-delivery-timer-text">
                  Order in next <strong class="miroooo-timer-highlight" id="cart-countdown-timer">09m : 45s</strong> for Free Tracked UK Delivery
                </div>
                <div class="miroooo-delivery-progress-track">
                  <div class="miroooo-delivery-progress-bar" style="width: 100%;"></div>
                </div>
              </div>
              <div class="miroooo-cart-items" id="cart-items-list"></div>
              <div class="miroooo-cart-gifts-panel" id="cart-gifts-panel"></div>
              <div class="miroooo-cart-promo-box" id="cart-promo-box">
                <div class="miroooo-promo-header">
                  <div class="miroooo-promo-info">
                    <span class="miroooo-promo-label">Promo Code</span>
                    <p class="miroooo-promo-desc" id="cart-promo-desc">Applied automatically for offers and free tracked shipping.</p>
                  </div>
                  <span class="miroooo-promo-badge">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    AUTO
                  </span>
                </div>
              </div>
            </div>
            <div class="miroooo-cart-footer" id="cart-drawer-footer">
              <div class="miroooo-cart-discount-row" id="cart-discount-toggle">
                <div class="miroooo-discount-btn">
                  <span class="miroooo-discount-label">
                    Total discount
                    <svg class="miroooo-chevron-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </span>
                  <span class="miroooo-discount-amount" id="cart-discount-val">-£0.00</span>
                </div>
                <div class="miroooo-discount-details" id="cart-discount-details">
                  <div class="miroooo-discount-detail-item" id="cart-bundle-discount-row">
                    <span>Bundle Special Offer</span>
                    <span id="cart-bundle-discount-val">-£0.00</span>
                  </div>
                  <div class="miroooo-discount-detail-item" id="cart-gift-discount-row">
                    <span>Unlocked Free Gifts</span>
                    <span id="cart-gift-discount-val">-£0.00</span>
                  </div>
                </div>
              </div>
              <div class="miroooo-cart-totals">
                <div class="miroooo-totals-line">
                  <span class="miroooo-totals-label">Subtotal</span>
                  <span class="miroooo-totals-value" id="cart-subtotal-val">£0.00</span>
                </div>
                <div class="miroooo-totals-line">
                  <span class="miroooo-totals-label">Tracked Shipping</span>
                  <span class="miroooo-totals-free">FREE</span>
                </div>
                <div class="miroooo-totals-main">
                  <div>
                    <span class="miroooo-total-title">Total</span>
                    <span class="miroooo-tax-note">Includes all taxes & duties</span>
                  </div>
                  <div class="miroooo-total-price" id="cart-total-val">£0.00 GBP</div>
                </div>
              </div>
              <div class="miroooo-checkout-btn-wrap">
                <button type="button" id="cart-drawer-checkout-btn" class="miroooo-checkout-btn" is="hover-button">
                  <span class="btn-fill"></span>
                  <span class="btn-text">
                    <svg class="miroooo-lock-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <span id="cart-checkout-btn-text">Checkout Securely</span>
                  </span>
                </button>
              </div>
              <div class="miroooo-cart-trust-badges">
                <span>🔒 256-Bit SSL Encryption</span>
                <span>·</span>
                <span>90-Day Trial</span>
                <span>·</span>
                <span>2-Year Warranty</span>
              </div>
            </div>
          </aside>
        `;

        drawer.querySelector(".miroooo-cart-backdrop")?.addEventListener("click", () => this.closeCart());
        drawer.querySelector(".miroooo-cart-close-btn")?.addEventListener("click", () => this.closeCart());
        
        const discountToggle = drawer.querySelector("#cart-discount-toggle");
        discountToggle?.addEventListener("click", () => {
          discountToggle.classList.toggle("is-open");
        });

        const checkoutBtn = drawer.querySelector("#cart-drawer-checkout-btn");
        checkoutBtn?.addEventListener("click", (e) => {
          e.preventDefault();
          this.checkout();
        });
      }
    },

    renderCartDrawer() {
      this.ensureCartDrawer();
      const cart = this.getCart();
      const items = cart.items || [];
      const hasItems = items.length > 0;

      // Header item count
      const totalItemCount = items.reduce((sum, item) => sum + (item.bundleCount || item.quantity || 1), 0);
      const countBadge = document.getElementById("cart-item-count-badge");
      if (countBadge) {
        countBadge.textContent = `${totalItemCount} item${totalItemCount === 1 ? "" : "s"}`;
      }

      // Delivery Box & Promo Box & Footer visibility
      const deliveryBox = document.getElementById("cart-delivery-box");
      const promoBox = document.getElementById("cart-promo-box");
      const giftsPanel = document.getElementById("cart-gifts-panel");
      const footer = document.getElementById("cart-drawer-footer");
      const itemsList = document.getElementById("cart-items-list");

      if (!hasItems) {
        if (deliveryBox) deliveryBox.style.display = "none";
        if (promoBox) promoBox.style.display = "none";
        if (giftsPanel) giftsPanel.style.display = "none";
        if (footer) footer.style.display = "none";

        if (itemsList) {
          itemsList.innerHTML = `
            <div class="miroooo-cart-empty">
              <svg class="miroooo-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <h3 class="miroooo-empty-title">Your shopping bag is empty.</h3>
              <p class="miroooo-empty-text">Add the Miroooo X or Miroooo X2 to unlock current offers and free shipping.</p>
              <a href="/shop" class="miroooo-empty-shop-btn" onclick="window.MirooooCart.closeCart()">
                Shop Miroooo
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
            </div>
          `;
        }
        return;
      }

      if (deliveryBox) deliveryBox.style.display = "flex";
      if (promoBox) promoBox.style.display = "block";
      if (giftsPanel) giftsPanel.style.display = "flex";
      if (footer) footer.style.display = "flex";

      // Render Line Items
      if (itemsList) {
        let itemsHtml = "";
        items.forEach((item) => {
          const colorsLabel = item.choices && item.choices.length > 0 ? `Colors: ${item.choices.join(" + ")}` : (item.color ? `Color: ${item.color}` : "");
          const unitPriceDisplay = `£${Number(item.unitPrice).toFixed(2)}`;
          const comparePriceDisplay = item.comparePrice ? `£${Number(item.comparePrice).toFixed(2)}` : "";

          itemsHtml += `
            <div class="miroooo-cart-item" data-item-id="${item.id}">
              <div class="miroooo-cart-item-thumb">
                <img src="${item.image}" alt="${item.title}" loading="lazy" />
              </div>
              <div class="miroooo-cart-item-content">
                <div class="miroooo-cart-item-top">
                  <div>
                    <h4 class="miroooo-cart-item-title">${item.title}</h4>
                    ${colorsLabel ? `<p class="miroooo-cart-item-colors">${colorsLabel}</p>` : ""}
                  </div>
                  <div class="miroooo-cart-item-pricing">
                    <span class="miroooo-cart-item-price">${unitPriceDisplay}</span>
                    ${comparePriceDisplay ? `<span class="miroooo-cart-item-compare">${comparePriceDisplay}</span>` : ""}
                  </div>
                </div>
                <div class="miroooo-cart-item-bottom">
                  <div class="miroooo-cart-stepper">
                    <button type="button" class="miroooo-stepper-btn" aria-label="Decrease quantity" onclick="window.MirooooCart.updateQuantity('${item.id}', ${(item.bundleCount || item.quantity || 1) - 1})">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    </button>
                    <span class="miroooo-stepper-val">${item.bundleCount || item.quantity || 1}</span>
                    <button type="button" class="miroooo-stepper-btn" aria-label="Increase quantity" onclick="window.MirooooCart.updateQuantity('${item.id}', ${(item.bundleCount || item.quantity || 1) + 1})">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    </button>
                  </div>
                  <button type="button" class="miroooo-cart-remove-btn" aria-label="Remove item" onclick="window.MirooooCart.removeItem('${item.id}')">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          `;
        });
        itemsList.innerHTML = itemsHtml;
      }

      // Calculate totals & unlocked gifts
      let subtotal = 0;
      let compareTotal = 0;
      let maxUnlockedGifts = 1;

      items.forEach((item) => {
        const qty = item.quantity || 1;
        subtotal += Number(item.unitPrice || 0) * qty;
        compareTotal += Number(item.comparePrice || item.unitPrice * 2) * qty;
        const itemGifts = item.unlockedGifts || (item.bundleCount === 3 ? 3 : item.bundleCount === 2 ? 2 : 1);
        if (itemGifts > maxUnlockedGifts) maxUnlockedGifts = itemGifts;
      });

      // Gifts rendering
      const unlockedGiftsList = [GIFTS_DATABASE.case];
      if (maxUnlockedGifts >= 2) unlockedGiftsList.push(GIFTS_DATABASE.heads);
      if (maxUnlockedGifts >= 3) unlockedGiftsList.push(GIFTS_DATABASE.dock);

      const totalGiftValueNum = unlockedGiftsList.reduce((sum, g) => sum + g.valueNum, 0);
      const bundleSavings = Math.max(0, compareTotal - subtotal);
      const totalDiscountNum = bundleSavings + totalGiftValueNum;

      if (giftsPanel) {
        let giftsHtml = `
          <div class="miroooo-gifts-header">
            <div class="miroooo-gifts-title-wrap">
              <span class="miroooo-gifts-kicker">Free Rewards</span>
              <h4 class="miroooo-gifts-title">${unlockedGiftsList.length}/${unlockedGiftsList.length} gifts unlocked</h4>
            </div>
            <span class="miroooo-gifts-value-badge">£${totalGiftValueNum.toFixed(2)} value</span>
          </div>
          <div class="miroooo-gifts-list">
        `;

        unlockedGiftsList.forEach((gift) => {
          giftsHtml += `
            <div class="miroooo-gift-row">
              <div class="miroooo-gift-thumb">
                <img src="${gift.image}" alt="${gift.name}" loading="lazy" />
              </div>
              <div class="miroooo-gift-info">
                <div class="miroooo-gift-name">
                  <span>${gift.name}</span>
                  <span class="miroooo-gift-tag">FREE GIFT</span>
                </div>
                <p class="miroooo-gift-desc">${gift.subtitle}</p>
              </div>
              <div class="miroooo-gift-price">
                <span class="miroooo-gift-free">£0.00</span>
                <span class="miroooo-gift-original">${gift.value}</span>
              </div>
            </div>
          `;
        });
        giftsHtml += "</div>";
        giftsPanel.innerHTML = giftsHtml;
      }

      // Update Summary Values
      const subtotalValEl = document.getElementById("cart-subtotal-val");
      const totalValEl = document.getElementById("cart-total-val");
      const discountValEl = document.getElementById("cart-discount-val");
      const bundleDiscountValEl = document.getElementById("cart-bundle-discount-val");
      const giftDiscountValEl = document.getElementById("cart-gift-discount-val");

      if (subtotalValEl) subtotalValEl.textContent = `£${subtotal.toFixed(2)}`;
      if (totalValEl) totalValEl.textContent = `£${subtotal.toFixed(2)} GBP`;
      if (discountValEl) discountValEl.textContent = `-£${totalDiscountNum.toFixed(2)}`;
      if (bundleDiscountValEl) bundleDiscountValEl.textContent = `-£${bundleSavings.toFixed(2)}`;
      if (giftDiscountValEl) giftDiscountValEl.textContent = `-£${totalGiftValueNum.toFixed(2)}`;
    },

    startTimer() {
      if (this.timerInterval) return;
      const updateTimerDisplay = () => {
        const mins = Math.floor(this.timerSeconds / 60);
        const secs = this.timerSeconds % 60;
        const formatted = `${String(mins).padStart(2, "0")}m : ${String(secs).padStart(2, "0")}s`;
        const timerEl = document.getElementById("cart-countdown-timer");
        if (timerEl) timerEl.textContent = formatted;

        if (this.timerSeconds <= 0) {
          this.timerSeconds = 585;
        } else {
          this.timerSeconds -= 1;
        }
      };

      updateTimerDisplay();
      this.timerInterval = setInterval(updateTimerDisplay, 1000);
    },

    openCart() {
      this.ensureCartDrawer();
      this.renderCartDrawer();
      const drawer = document.getElementById("CartDrawer");
      if (drawer) {
        drawer.classList.add("is-open", "active");
        drawer.setAttribute("aria-hidden", "false");
        drawer.removeAttribute("hidden");
        document.body.classList.add("overflow-hidden", "cart-drawer-open");
      }
      this.startTimer();
    },

    closeCart() {
      const drawer = document.getElementById("CartDrawer");
      if (drawer) {
        drawer.classList.remove("is-open", "active");
        drawer.setAttribute("aria-hidden", "true");
        drawer.removeAttribute("open");
        const inner = drawer.querySelector(".drawer__inner");
        if (inner) inner.style.transform = "translateX(100%)";
        const overlay = drawer.querySelector("overlay-element");
        if (overlay) {
          overlay.classList.add("invisible", "opacity-0", "pointer-events-none");
          overlay.classList.remove("visible", "opacity-100", "pointer-events-auto");
        }
        document.body.classList.remove("overflow-hidden", "cart-drawer-open");
      }
    },

    checkout() {
      const cart = this.getCart();
      const items = cart.items || [];
      if (items.length === 0) return;

      const checkoutBtn = document.getElementById("cart-drawer-checkout-btn");
      const btnText = document.getElementById("cart-checkout-btn-text");
      if (checkoutBtn) {
        checkoutBtn.disabled = true;
        if (btnText) btnText.textContent = "Redirecting to checkout...";
      }

      const primaryItem = items[0];
      const checkoutUrl = buildPlusbaseCheckoutUrl(primaryItem);
      window.location.assign(checkoutUrl);
    }
  };

  window.MirooooCart = MirooooCart;

  function updateDeliveryDates() {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    const options = { weekday: "long", day: "numeric", month: "long" };
    const formattedDate = deliveryDate.toLocaleDateString("en-GB", options);
    document.querySelectorAll(".miroooo-dynamic-date").forEach((el) => {
      el.textContent = formattedDate;
    });
  }

  // Animated Lottie Icons Initializer (Moving Truck & Animated Cart)
  function initMirooooLottieIcons() {
    const truckEls = document.querySelectorAll("[data-lottie-truck], .miroooo-lottie-truck");
    const cartEls = document.querySelectorAll("[data-lottie-cart], .miroooo-lottie-cart");

    if (truckEls.length === 0 && cartEls.length === 0) return;

    function renderLotties() {
      if (typeof window.lottie === "undefined") return;

      truckEls.forEach((el) => {
        if (el.dataset.lottieLoaded === "true") return;
        el.dataset.lottieLoaded = "true";
        el.innerHTML = "";
        try {
          window.lottie.loadAnimation({
            container: el,
            renderer: "svg",
            loop: true,
            autoplay: true,
            path: "/assets/lottie-truck.json"
          });
        } catch (err) {
          console.warn("Lottie truck animation load error:", err);
        }
      });

      cartEls.forEach((el) => {
        if (el.dataset.lottieLoaded === "true") return;
        el.dataset.lottieLoaded = "true";
        el.innerHTML = "";
        try {
          window.lottie.loadAnimation({
            container: el,
            renderer: "svg",
            loop: true,
            autoplay: true,
            path: "/assets/lottie-cart.json"
          });
        } catch (err) {
          console.warn("Lottie cart animation load error:", err);
        }
      });
    }

    if (typeof window.lottie !== "undefined") {
      renderLotties();
    } else {
      let script = document.querySelector('script[src*="lottie.min.js"]');
      if (!script) {
        script = document.createElement("script");
        script.src = "/assets/lottie.min.js";
        script.async = true;
        script.onload = renderLotties;
        document.head.appendChild(script);
      } else {
        script.addEventListener("load", renderLotties);
      }
    }
  }

  window.initMirooooLottieIcons = initMirooooLottieIcons;

  // Initialize cart state, header badges, dynamic delivery date, and lottie animations
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      MirooooCart.updateHeaderBadges();
      MirooooCart.ensureCartDrawer();
      updateDeliveryDates();
      initMirooooLottieIcons();
    });
  } else {
    MirooooCart.updateHeaderBadges();
    MirooooCart.ensureCartDrawer();
    updateDeliveryDates();
    initMirooooLottieIcons();
  }

  // Intercept cart open clicks ONLY on header cart icon / drawer triggers
  document.addEventListener("click", (e) => {
    const headerCartTrigger = e.target.closest(
      '.site-header a[href="/cart"], .site-header .cart-drawer-button, .site-header .site-actions__bag, .header__icons a[href="/cart"], .header__icons .cart-drawer-button, [data-drawer-trigger], .header-cart-icon'
    );
    if (headerCartTrigger && !headerCartTrigger.closest("#CartDrawer") && !headerCartTrigger.closest("#hero-cta") && !headerCartTrigger.closest("#sticky-bar-cta-btn")) {
      if (document.body.dataset.page === "cart") return;
      e.preventDefault();
      MirooooCart.openCart();
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      MirooooCart.closeCart();
    }
  });
})();
