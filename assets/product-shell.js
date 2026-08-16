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

  const desktopLinks = document.querySelectorAll(".header__menu > ul > li > a");
  const desktopItems = [
    ["/shop", "Shop"],
    ["/products/miroooo-x2", "Miroooo X2"],
    ["/contact", "Contact"],
    ["/faq", "FAQ"]
  ];
  desktopLinks.forEach((link, index) => {
    const item = desktopItems[index];
    if (!item) return;
    link.href = item[0];
    link.querySelectorAll(".btn-text").forEach((text) => {
      text.textContent = item[1];
      text.dataset.text = item[1];
    });
  });

  const mobileLinks = document.querySelectorAll("#MenuDrawer .drawer__menu-item");
  const mobileItems = [["/shop", "Shop"], ["/products/miroooo-x2", "Miroooo X2"], ["/contact", "Contact"], ["/faq", "FAQ"]];
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
    footerGroup.innerHTML = `<footer class="miroooo-product-footer">
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

  document.addEventListener("click", (event) => {
    const closeControl = event.target.closest?.("#CartDrawer .drawer__close, #CartDrawer overlay-element");
    if (!closeControl) return;
    event.preventDefault();
    setTimeout(closeCartDrawer, 0);
  }, true);
  document.querySelectorAll("#CartDrawer .drawer__close, #CartDrawer overlay-element").forEach((control) => {
    control.addEventListener("click", () => {
      setTimeout(closeCartDrawer, 0);
    }, true);
  });

})();
