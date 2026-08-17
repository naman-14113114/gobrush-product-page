(function () {
  "use strict";

  document.documentElement.lang = "en-GB";

  const main = document.getElementById("MainContent");
  if (main && !document.querySelector(".miroooo-skip")) {
    const skip = document.createElement("a");
    skip.className = "miroooo-skip";
    skip.href = "#MainContent";
    skip.textContent = "Skip to product details";
    document.body.prepend(skip);
  }

  document.querySelectorAll(".announcement-text").forEach((item) => {
    item.classList.remove("hidden");
    item.innerHTML = "Free tracked UK delivery · 90-day home trial";
  });

  // Synchronize Navigation links and duplicate text for roll-up animation
  const desktopLinks = document.querySelectorAll(".header__menu > ul > li > a");
  const desktopItems = [
    ["/shop", "Shop"],
    ["/products/miroooo-x2", "Bundles"],
    ["/contact", "Contact"],
    ["/faq", "FAQ"]
  ];
  desktopLinks.forEach((link, index) => {
    const item = desktopItems[index];
    if (!item) return;
    link.href = item[0];
    
    // Ensure both default text and duplicate pill span exist
    let defaultSpan = link.querySelector(".btn-text:not(.btn-duplicate)");
    let duplicateSpan = link.querySelector(".btn-duplicate");
    
    if (!defaultSpan) {
      defaultSpan = document.createElement("span");
      defaultSpan.className = "btn-text";
      defaultSpan.setAttribute("data-text", "");
      link.prepend(defaultSpan);
    }
    defaultSpan.textContent = item[1];
    defaultSpan.dataset.text = item[1];
    
    if (!duplicateSpan) {
      duplicateSpan = document.createElement("span");
      duplicateSpan.className = "btn-text btn-duplicate";
      link.append(duplicateSpan);
    }
    duplicateSpan.textContent = item[1];
  });

  // Authentic GoBrush Magnet Spring Hover Physics
  const initMagnetEffect = () => {
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

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMagnetEffect);
  } else {
    initMagnetEffect();
  }

  const mobileLinks = document.querySelectorAll("#MenuDrawer .drawer__menu-item");
  const mobileItems = [["/shop", "Shop"], ["/products/miroooo-x2", "Bundles"], ["/contact", "Contact"], ["/faq", "FAQ"]];
  mobileLinks.forEach((link, index) => {
    const item = mobileItems[index];
    if (!item) return;
    link.href = item[0];
    link.textContent = item[1];
  });

  document.querySelectorAll('a[href*="customer_authentication"]').forEach((link) => {
    link.href = "/order-tracking";
    link.removeAttribute("rel");
  });

  document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href") || "";
    if (/collections\/frontpage|blogs\/news|pages\/onze-verantwoordelijkheid/.test(href)) link.href = "/shop";
    if (/pages\/(contact|klantenservice)/.test(href)) link.href = "/contact";
    if (/pages\/(faq|over-ons)/.test(href)) link.href = "/faq";
    if (/pages\/(privacybeleid|privacy-policy)/.test(href)) link.href = "/privacy";
    if (/pages\/(retouren-garantie|shipping-policy|returns)/.test(href)) link.href = "/delivery-returns";
    if (/pages\/(reviews|terms)/.test(href)) link.href = "/terms";
  });

  const footerGroup = document.querySelector("footer-group");
  if (footerGroup) {
    const supportIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 14a8 8 0 0 1 16 0v4a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/><path d="M4 14v4a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H4"/></svg>`;
    const deliveryIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="1" y="5" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 18 16 18 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`;
    const trialIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;
    const warrantyIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;

    footerGroup.innerHTML = `
      <aside class="service-strip" aria-label="Miroooo customer care">
        <div class="service-strip__item">${supportIcon}<div><strong>Customer support</strong><span>Real help when you need it</span></div></div>
        <div class="service-strip__item">${deliveryIcon}<div><strong>Tracked UK delivery</strong><span>Free with every brush</span></div></div>
        <div class="service-strip__item">${trialIcon}<div><strong>90-day home trial</strong><span>Take time to decide</span></div></div>
        <div class="service-strip__item">${warrantyIcon}<div><strong>Two-year warranty</strong><span>Made for daily use</span></div></div>
      </aside>
      <footer class="miroooo-product-footer">
        <div class="miroooo-product-footer__grid">
          <div class="miroooo-product-footer__brand"><a class="miroooo-product-footer__logo" href="/">MIROOOO</a><p>Quietly precise electric toothbrushes, built to make better brushing feel uncomplicated.</p></div>
          <div class="miroooo-product-footer__column"><strong>Shop</strong><a href="/products/miroooo-x">Miroooo X</a><a href="/products/miroooo-x2">Miroooo X2</a><a href="/shop">Compare models</a></div>
          <div class="miroooo-product-footer__column"><strong>Support</strong><a href="/faq">FAQs</a><a href="/delivery-returns">Delivery &amp; returns</a><a href="/warranty">Warranty</a><a href="/order-tracking">Track order</a><a href="/contact">Contact</a></div>
          <div class="miroooo-product-footer__column"><strong>About</strong><a href="/about">Our approach</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div>
        </div>
        <div class="miroooo-product-footer__bottom"><span>© ${new Date().getFullYear()} Miroooo. All rights reserved.</span><div class="miroooo-product-footer__legal"><a href="/privacy">Privacy policy</a><a href="/terms">Terms of service</a></div></div>
      </footer>`;
  }

  const allowedAttribution = ["msclkid", "gclid", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
  const query = new URLSearchParams(location.search);
  document.querySelectorAll('a[href*="buudy.com/pages/add-to-cart"]').forEach((link) => {
    const target = new URL(link.href);
    allowedAttribution.forEach((key) => {
      const value = query.get(key);
      if (value) target.searchParams.set(key, value);
    });
    link.href = target.toString();
  });

  const closeCartDrawer = () => {
    const drawer = document.getElementById("CartDrawer");
    if (!drawer) return;
    drawer.removeAttribute("open");
    drawer.classList.remove("active", "pointer-events-auto");
    drawer.classList.add("pointer-events-none");
    drawer.setAttribute("aria-hidden", "true");
    const inner = drawer.querySelector(".drawer__inner");
    if (inner) inner.style.transform = "translateX(100%)";
    const overlay = drawer.querySelector("overlay-element");
    if (overlay) {
      overlay.classList.add("invisible", "opacity-0", "pointer-events-none");
      overlay.classList.remove("visible", "opacity-100", "pointer-events-auto");
    }
    document.body.classList.remove("overflow-hidden");
  };

  const cartDrawer = document.getElementById("CartDrawer");
  if (cartDrawer && !cartDrawer.querySelector(".miroooo-cart-close")) {
    const safeClose = document.createElement("button");
    safeClose.type = "button";
    safeClose.className = "miroooo-cart-close";
    safeClose.setAttribute("aria-label", "Close cart");
    safeClose.textContent = "×";
    safeClose.addEventListener("click", closeCartDrawer);
    cartDrawer.append(safeClose);
  }

  document.addEventListener("click", (event) => {
    const closeControl = event.target.closest?.("#CartDrawer .drawer__close, #CartDrawer overlay-element, #CartDrawer .miroooo-cart-close");
    if (!closeControl) return;
    event.preventDefault();
    setTimeout(closeCartDrawer, 0);
  }, true);
  document.querySelectorAll("#CartDrawer .drawer__close, #CartDrawer overlay-element, #CartDrawer .miroooo-cart-close").forEach((control) => {
    control.addEventListener("click", () => {
      setTimeout(closeCartDrawer, 0);
    }, true);
  });

})();
