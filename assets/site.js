(function () {
  "use strict";

  // Geo Redirection Guard: VN, HK, CN, SG, US -> https://miroooo.us
  (function enforceGeoRedirection() {
    var BLOCKED_COUNTRIES = ["VN", "HK", "CN", "SG", "US"];
    var TARGET = "https://miroooo.us";

    function redirectIfBlocked(code) {
      if (code && BLOCKED_COUNTRIES.indexOf(String(code).toUpperCase()) !== -1) {
        window.location.replace(TARGET);
        return true;
      }
      return false;
    }

    try {
      var tz = (Intl.DateTimeFormat().resolvedOptions().timeZone || "").toLowerCase();
      if (
        tz.indexOf("ho_chi_minh") !== -1 ||
        tz.indexOf("saigon") !== -1 ||
        tz.indexOf("singapore") !== -1 ||
        tz.indexOf("hong_kong") !== -1 ||
        tz.indexOf("shanghai") !== -1 ||
        tz.indexOf("beijing") !== -1 ||
        tz.indexOf("new_york") !== -1 ||
        tz.indexOf("chicago") !== -1 ||
        tz.indexOf("los_angeles") !== -1 ||
        tz.indexOf("denver") !== -1 ||
        tz.indexOf("phoenix") !== -1 ||
        tz.indexOf("anchorage") !== -1 ||
        tz.indexOf("honolulu") !== -1 ||
        tz.indexOf("america/") === 0
      ) {
        window.location.replace(TARGET);
        return;
      }
    } catch (e) {}

    try {
      fetch("/api/geo/check")
        .then(function (r) { return r.json(); })
        .then(function (d) {
          if (d && d.blocked) window.location.replace(TARGET);
        })
        .catch(function () {});

      fetch("https://api.country.is/")
        .then(function (r) { return r.json(); })
        .then(function (r) {
          if (r && r.country) redirectIfBlocked(r.country);
        })
        .catch(function () {});
    } catch (e) {}
  })();

  const arrowIcon = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  const accountIcon = '<svg class="icon icon-account icon-lg" viewBox="0 0 24 24" stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="10.5" height="10.5" x="6.75" y="1.75" rx="5.25"></rect><path stroke-linecap="round" d="M12 15.5c1.5 0 4 .333 4.5.5.5.167 3.7.8 4.5 2 1 1.5 1 2 1 4m-10-6.5c-1.5 0-4 .333-4.5.5-.5.167-3.7.8-4.5 2-1 1.5-1 2-1 4"></path></svg>';
  const bagIcon = '<svg class="icon icon-cart icon-lg" viewBox="0 0 24 24" stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M1 1h.5v0c.226 0 .339 0 .44.007a3 3 0 0 1 2.62 1.976c.034.095.065.204.127.42l.17.597m0 0 1.817 6.358c.475 1.664.713 2.496 1.198 3.114a4 4 0 0 0 1.633 1.231c.727.297 1.592.297 3.322.297h2.285c1.75 0 2.626 0 3.359-.302a4 4 0 0 0 1.64-1.253c.484-.627.715-1.472 1.175-3.161l.06-.221c.563-2.061.844-3.092.605-3.906a3 3 0 0 0-1.308-1.713C19.92 4 18.853 4 16.716 4H4.857ZM12 20a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm8 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"></path></svg>';
  const menuIcon = '<svg class="icon icon-hamburger icon-lg" viewBox="0 0 24 24" stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" d="M3 6H21M3 12H11M3 18H16"></path></svg>';
  const closeIcon = '<svg class="icon icon-close icon-sm" viewBox="0 0 20 20" stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M5 15L15 5M5 5L15 15"></path></svg>';
  const supportIcon = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M4 13a8 8 0 0 1 16 0v4a2 2 0 0 1-2 2h-2v-6h4M4 13h4v6H6a2 2 0 0 1-2-2v-4Z"/></svg>';
  const deliveryIcon = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M3 6h12v11H3zM15 10h3l3 3v4h-6z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg>';
  const trialIcon = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M12 3 4.5 6v5.5c0 4.7 3.1 7.9 7.5 9.5 4.4-1.6 7.5-4.8 7.5-9.5V6L12 3Z"/><path d="m9 12 2 2 4-4"/></svg>';
  const warrantyIcon = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';

  const currentPage = document.body.dataset.page || "";
  const current = (pages) => pages.includes(currentPage) ? ' aria-current="page"' : "";
  const flipLabel = (label) => `<span class="nav-link__flip"><span>${label}</span><span aria-hidden="true">${label}</span></span>`;
  const chevronDownIcon = '<svg class="dropdown-chevron" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 1l4 4 4-4"/></svg>';
  const menuPill = (href, label, pages) => `
    <li>
      <a href="${href}" class="menu__item nav-link text-sm-lg flex items-center font-medium z-2 relative cursor-pointer" is="magnet-link" data-magnet="0"${pages ? current(pages) : ""}>
        <span class="btn-text" data-text="${label}">${label}</span>
        <span class="btn-text btn-duplicate">${label}</span>
      </a>
    </li>`;

  function renderGlobalHeader() {
    const headerTarget = document.querySelector("[data-site-header]");
    if (!headerTarget) return;

    const announcementHTML = `
      <div class="announcement" style="background: #e6e6e6; color: #111111; padding: 4px 0; overflow: hidden; width: 100%; min-height: 24px; border-bottom: 1px solid rgba(0, 0, 0, 0.08);">
        <div class="miroooo-announcement-ticker">
          <div class="miroooo-ticker-item"><span>Free Shipping on all orders</span> <span class="miroooo-ticker-dot" aria-hidden="true"></span></div>
          <div class="miroooo-ticker-item"><span>50% OFF Today + 3 Free Gifts</span> <span class="miroooo-ticker-dot" aria-hidden="true"></span></div>
          <div class="miroooo-ticker-item"><span>Ultra Lightweight</span> <span class="miroooo-ticker-dot" aria-hidden="true"></span></div>
          <div class="miroooo-ticker-item"><span>4.9 Stars from 40,000+ Customers</span> <span class="miroooo-ticker-dot" aria-hidden="true"></span></div>
          <div class="miroooo-ticker-item"><span>Risk-Free Home Trial</span> <span class="miroooo-ticker-dot" aria-hidden="true"></span></div>
          <div class="miroooo-ticker-item"><span>Free Shipping on all orders</span> <span class="miroooo-ticker-dot" aria-hidden="true"></span></div>
          <div class="miroooo-ticker-item"><span>50% OFF Today + 3 Free Gifts</span> <span class="miroooo-ticker-dot" aria-hidden="true"></span></div>
          <div class="miroooo-ticker-item"><span>Ultra Lightweight</span> <span class="miroooo-ticker-dot" aria-hidden="true"></span></div>
          <div class="miroooo-ticker-item"><span>4.9 Stars from 40,000+ Customers</span> <span class="miroooo-ticker-dot" aria-hidden="true"></span></div>
          <div class="miroooo-ticker-item"><span>Risk-Free Home Trial</span> <span class="miroooo-ticker-dot" aria-hidden="true"></span></div>
        </div>
      </div>`;

    if (currentPage === "cart" || headerTarget.closest('[data-page="cart"]') || window.location.pathname.includes("/cart") || window.location.pathname.endsWith("cart.html")) {
      headerTarget.classList.remove("header-layer--overlay");
      headerTarget.innerHTML = `
      ${announcementHTML}
      <header class="site-header site-header--cart" is="custom-header" style="background: #080909; border-bottom: 1px solid rgba(255, 255, 255, 0.08); display: flex; justify-content: center; align-items: center; width: 100%;">
        <div class="header__logo flex justify-center w-full items-center" style="padding: 16px 0; justify-content: center; width: 100%;"><a href="/" class="header__logo-link" style="text-decoration: none;"><span class="miroooo-brand-logo" style="font-family: 'Montserrat', 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif; font-size: clamp(1.35rem, 2vw, 1.65rem); font-weight: 800; letter-spacing: 0.03em; text-transform: uppercase; color: #ffffff; line-height: 1;">MIROOOO</span></a></div>
      </header>`;
      return;
    }

    const isOverlayHeader = Boolean(headerTarget.hasAttribute("data-overlay-header") || currentPage === "home");
    headerTarget.classList.toggle("header-layer--overlay", isOverlayHeader);
    const logoBrandText = "MIROOOO";

    headerTarget.innerHTML = `
      ${announcementHTML}
      <menu-drawer id="MenuDrawer" class="menu-drawer drawer drawer--start z-30 fixed bottom-0 left-0 h-full w-full pointer-events-none" hidden>
        <overlay-element class="overlay fixed-modal invisible opacity-0 fixed bottom-0 left-0 w-full h-screen pointer-events-none" aria-controls="MenuDrawer" aria-expanded="false"></overlay-element>
        <div class="drawer__inner z-10 absolute top-0 flex flex-col w-full h-full overflow-hidden">
          <gesture-element class="drawer__header flex items-center justify-between relative">
            <span class="drawer__title heading lg:text-3xl text-2xl leading-none tracking-tight"></span>
            <button class="button button--secondary button--close drawer__close mobile-panel__close flex items-center justify-center" type="button" is="hover-button" aria-controls="MenuDrawer" aria-expanded="false" aria-label="Close">
              <span class="btn-fill" data-fill></span>
              <span class="btn-text">
                <svg class="icon icon-close icon-sm" viewBox="0 0 20 20" stroke="#ffffff" fill="none" stroke-width="2" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 15L15 5M5 5L15 15"></path>
                </svg>
              </span>
            </button>
          </gesture-element>
          <div class="drawer__content opacity-0 invisible flex flex-col h-full grow shrink">
            <nav class="relative grow overflow-hidden" role="navigation" aria-label="Mobile navigation">
              <ul class="drawer__scrollable drawer__menu relative w-full h-full" role="list" data-parent>
                <li class="drawer__menu-item--group">
                  <div class="drawer__group-label">Shop</div>
                  <ul class="drawer__submenu" role="list">
                    <li>
                      <a class="drawer__submenu-item flex flex-col" href="/products/miroooo-x">
                        <span class="drawer__submenu-title">Brush X</span>
                      </a>
                    </li>
                    <li>
                      <a class="drawer__submenu-item flex flex-col" href="/products/miroooo-x2">
                        <span class="drawer__submenu-title">Brush X2</span>
                      </a>
                    </li>
                    <li>
                      <a class="drawer__submenu-item flex flex-col" href="/products/miroooo-x2-heads">
                        <span class="drawer__submenu-title">2x Brush X2 Heads</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li><a class="drawer__menu-item block heading text-2xl leading-none tracking-tight" href="/about-us">About Us</a></li>
                <li><a class="drawer__menu-item block heading text-2xl leading-none tracking-tight" href="/contact">Contact Us</a></li>
                <li><a class="drawer__menu-item block heading text-2xl leading-none tracking-tight" href="/faq">FAQs</a></li>
              </ul>
            </nav>
            <div class="drawer__footer grid w-full">
              <div class="drawer__footer-bottom flex items-center justify-between gap-6">
                <a href="/order-tracking" class="button button--primary icon-with-text" style="background-color: #000000 !important; border: 1.5px solid #000000 !important; color: #ffffff !important;" is="hover-button" rel="nofollow" aria-label="Account">
                  <span class="btn-fill" data-fill></span>
                  <span class="btn-text">
                    <svg class="icon icon-account-alt icon-xs" viewBox="0 0 16 17" stroke="#ffffff" fill="none" style="stroke: #ffffff !important; color: #ffffff !important;" xmlns="http://www.w3.org/2000/svg">
                      <rect width="6.5" height="6.5" x="4.75" y="1.917" rx="3.25" stroke="#ffffff"></rect>
                      <path stroke-linecap="round" stroke="#ffffff" d="M8 10.834c1 0 2.667.222 3 .333.333.11 2.467.533 3 1.333.667 1 .667 1.334.667 2.667M8 10.834c-1 0-2.667.222-3 .333-.333.11-2.467.533-3 1.333-.667 1-.667 1.334-.667 2.667"></path>
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </menu-drawer>
      <header class="site-header${isOverlayHeader ? " site-header--overlay" : ""}" is="custom-header">
        <div class="site-header__inner">
          <div class="site-header__left flex items-center justify-start">
            <div class="header__icons header__icons--start lg:hidden flex items-center justify-start">
              <div class="header__buttons flex items-center gap-1d5">
                <button class="nav-toggle menu-drawer-button flex items-center justify-center lg:hidden" type="button" aria-expanded="false" aria-controls="MenuDrawer" aria-label="Open menu" is="magnet-button">
                  <span class="sr-only">Navigation</span>
                  ${menuIcon}
                </button>
              </div>
            </div>
            <div class="header__navigation hidden lg:flex lg:gap-5 lg:justify-start">
              <nav class="header__menu site-nav hidden lg:flex" role="navigation" aria-label="Primary">
                <ul class="flex flex-wrap list-menu with-block">
                  <li class="header__dropdown relative" data-dropdown>
                    <button type="button" class="menu__item nav-link header__dropdown-toggle flex items-center font-medium z-2 relative cursor-pointer" aria-expanded="false" aria-haspopup="true" is="magnet-link" data-magnet="0"${["product-x", "product-x2", "product-x2-heads", "shop"].includes(currentPage) ? ' aria-current="page"' : ""}>
                      <span class="btn-text flex items-center" data-text="Shop">Shop ${chevronDownIcon}</span>
                      <span class="btn-text btn-duplicate flex items-center">Shop ${chevronDownIcon}</span>
                    </button>
                    <div class="dropdown-menu" role="menu">
                      <a href="/products/miroooo-x" class="dropdown-item" role="menuitem">
                        <div class="dropdown-item__title">Brush X</div>
                      </a>
                      <a href="/products/miroooo-x2" class="dropdown-item" role="menuitem">
                        <div class="dropdown-item__title">Brush X2</div>
                      </a>
                      <a href="/products/miroooo-x2-heads" class="dropdown-item" role="menuitem">
                        <div class="dropdown-item__title">2x Brush X2 Heads</div>
                      </a>
                    </div>
                  </li>
                  ${menuPill("/about-us", "About Us", ["about", "about-us"])}
                </ul>
              </nav>
            </div>
          </div>
          <div class="site-header__center header__logo flex justify-center z-2" itemscope itemtype="http://schema.org/Organization">
            <a class="site-logo header__logo-link flex items-center relative" href="/" itemprop="url" style="text-decoration: none;" aria-label="Miroooo home">
              <span class="miroooo-brand-logo" style="font-family: 'Montserrat', 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif; font-size: clamp(1.35rem, 2vw, 1.65rem); font-weight: 800; letter-spacing: 0.03em; text-transform: uppercase; color: #ffffff; line-height: 1;">${logoBrandText}</span>
            </a>
          </div>
          <div class="site-header__right site-actions header__icons header__icons--end flex justify-end items-center z-2">
            <div class="header__navigation header__navigation--right hidden lg:flex items-center">
              <nav class="header__menu site-nav site-nav--right hidden lg:flex" role="navigation" aria-label="Secondary">
                <ul class="flex flex-wrap list-menu with-block">
                  ${menuPill("/contact", "Contact Us", ["contact"])}
                  ${menuPill("/faq", "FAQs", ["faq"])}
                </ul>
              </nav>
            </div>
            <div class="header__buttons flex items-center gap-1d5">
              <a class="account-link flex items-center justify-center" href="/order-tracking" aria-label="Account" is="magnet-link" rel="nofollow"${current(["tracking", "order-tracking"])}>
                <span class="sr-only">Account</span>
                ${accountIcon}
              </a>
              <a class="site-actions__bag cart-drawer-button flex items-center justify-center relative" href="/cart" aria-label="Cart" is="magnet-link" aria-controls="CartDrawer" aria-expanded="false" data-no-instant>
                <span class="sr-only">Cart</span>
                ${bagIcon}
                <cart-count class="count absolute top-0 right-0 text-xs" aria-label="0 items" hidden>0</cart-count>
              </a>
            </div>
          </div>
        </div>
      </header>`;

    if (isOverlayHeader) {
      const headerEl = headerTarget.querySelector(".site-header");
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
  }

  function renderGlobalFooter() {
    if (currentPage === "cart" || window.location.pathname.includes("/cart")) return;
    const footerTarget = document.querySelector("[data-site-footer]");
    if (!footerTarget) return;

    footerTarget.innerHTML = `
      <footer-group class="footer-group block w-full">
        <aside class="service-strip" aria-label="Miroooo customer care">
          <div class="service-strip__item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" class="service-strip__icon" aria-hidden="true"><path d="M4 14a8 8 0 0 1 16 0v4a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/><path d="M4 14v4a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H4"/></svg>
            <div>
              <strong>Customer support</strong>
              <span>Real help when you need it</span>
            </div>
          </div>
          <div class="service-strip__item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" class="service-strip__icon" aria-hidden="true"><rect x="1" y="5" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 18 16 18 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            <div>
              <strong>Tracked UK delivery</strong>
              <span>Free with every brush</span>
            </div>
          </div>
          <div class="service-strip__item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" class="service-strip__icon" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <div>
              <strong>Risk-Free Home Trial</strong>
              <span>Take time to decide</span>
            </div>
          </div>
          <div class="service-strip__item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" class="service-strip__icon" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <div>
              <strong>Two-year warranty</strong>
              <span>Made for daily use</span>
            </div>
          </div>
        </aside>
        <footer class="site-footer" role="contentinfo">
          <div class="site-footer__main">
            <!-- Column 0: Brand -->
            <div class="site-footer__brand">
              <a class="site-footer__logo" href="/" aria-label="Miroooo home">MIROOOO</a>
              <p class="site-footer__tagline">Quietly precise electric toothbrushes, built to make better brushing feel uncomplicated.</p>
              <div class="site-footer__address">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" class="site-footer__address-icon" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>71-75 Shelton St, London WC2H 9JQ, UK</span>
              </div>
            </div>

            <!-- Column 1: SHOP -->
            <div class="site-footer__column">
              <h4 class="site-footer__heading">SHOP</h4>
              <ul class="site-footer__links">
                <li><a href="/">Home</a></li>
                <li><a href="/products/miroooo-x" data-product-link>Brush X</a></li>
                <li><a href="/products/miroooo-x2" data-product-link>Brush X2</a></li>
                <li><a href="/products/miroooo-x2-heads" data-product-link>2x Brush X2 Heads</a></li>
                <li><a href="/privacy">Privacy Policy</a></li>
                <li><a href="/return-policy">Return Policy</a></li>
                <li><a href="/shipping-policy">Shipping Policy</a></li>
                <li><a href="/refund-policy">Refund Policy</a></li>
                <li><a href="/terms">Terms of Service</a></li>
              </ul>
            </div>

            <!-- Column 2: SUPPORT -->
            <div class="site-footer__column">
              <h4 class="site-footer__heading">SUPPORT</h4>
              <ul class="site-footer__links">
                <li><a href="/contact">Contact Us</a></li>
                <li><a href="/order-tracking">Order Tracking</a></li>
                <li><a href="/about-us">About Us</a></li>
                <li><a href="/faq">FAQs</a></li>
                <li><a href="/cookies-policy">Cookies Policy</a></li>
              </ul>
            </div>

            <!-- Column 3: GET IN TOUCH -->
            <div class="site-footer__column site-footer__column--touch">
              <h4 class="site-footer__heading">GET IN TOUCH</h4>
              <div class="site-footer__touch-content">
                <p class="site-footer__hours">Operating Hours<br>Monday - Friday - 9am - 5pm GMT</p>
                <p class="site-footer__email">
                  <a href="mailto:support@trymiroooo.com" class="underline underline-offset-4" style="color: #ffffff;">support@trymiroooo.com</a>
                </p>
                <div class="site-footer__socials" aria-label="Social media links">
                  <a href="https://www.facebook.com/profile.php?id=61593351131893" target="_blank" rel="noopener noreferrer" class="site-footer__social-btn" aria-label="Facebook">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  </a>
                  <a href="https://www.instagram.com/miroooo_official/" target="_blank" rel="noopener noreferrer" class="site-footer__social-btn" aria-label="Instagram">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </a>
                  <a href="https://www.youtube.com/channel/UCVMc0L8ja_3DCL_bI3dczrQ" target="_blank" rel="noopener noreferrer" class="site-footer__social-btn" aria-label="YouTube">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="site-footer__bottom">
            <div class="site-footer__copyright">
              &copy; 2026 MIROOOO - ALL RIGHTS RESERVED
            </div>
            <ul class="site-footer__payments" aria-label="Accepted payment methods">
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 38 24" width="38" height="24" aria-labelledby="pi-visa"><title id="pi-visa">Visa</title><rect x=".5" y=".5" width="37" height="23" rx="3" stroke="rgba(255,255,255,0.12)" fill="#141414"/><path d="M35 0H3C1.3 0 0 1.3 0 3V21C0 22.7 1.4 24 3 24H35C36.7 24 38 22.7 38 21V3C38 1.3 36.6 0 35 0Z" fill="#142FBD"/><path d="M35 1C36.1 1 37 1.9 37 3V21C37 22.1 36.1 23 35 23H3C1.9 23 1 22.1 1 21V3C1 1.9 1.9 1 3 1H35Z" fill="#1532CB"/><path d="M29.5944 10.2167H29.2778C28.8556 11.2722 28.5389 11.8 28.2222 13.3833H30.2278C29.9111 11.8 29.9111 11.0611 29.5944 10.2167V10.2167ZM32.6556 16.4444H30.8611C30.7556 16.4444 30.7556 16.4444 30.65 16.3389L30.4389 15.3889L30.3333 15.1778H27.8C27.6944 15.1778 27.5889 15.1778 27.5889 15.3889L27.2722 16.3389C27.2722 16.4444 27.1667 16.4444 27.1667 16.4444H24.95L25.1611 15.9167L28.2222 8.73889C28.2222 8.21111 28.5389 8 29.0667 8H30.65C30.7556 8 30.8611 8 30.8611 8.21111L32.3389 15.0722C32.4444 15.4944 32.55 15.8111 32.55 16.2333C32.6556 16.3389 32.6556 16.3389 32.6556 16.4444V16.4444ZM18.5111 16.1278L18.9333 14.2278C19.0389 14.2278 19.1444 14.3333 19.1444 14.3333C19.8833 14.65 20.6222 14.8611 21.3611 14.7556C21.5722 14.7556 21.8889 14.65 22.1 14.5444C22.6278 14.3333 22.6278 13.8056 22.2056 13.3833C21.9944 13.1722 21.6778 13.0667 21.3611 12.8556C20.9389 12.6444 20.5167 12.4333 20.2 12.1167C18.9333 11.0611 19.3556 9.58333 20.0944 8.84444C20.7278 8.42222 21.0444 8 21.8889 8C23.1556 8 24.5278 8 25.1611 8.21111H25.2667C25.1611 8.84444 25.0556 9.37222 24.8444 10.0056C24.3167 9.79444 23.7889 9.58333 23.2611 9.58333C22.9444 9.58333 22.6278 9.58333 22.3111 9.68889C22.1 9.68889 21.9944 9.79444 21.8889 9.9C21.6778 10.1111 21.6778 10.4278 21.8889 10.6389L22.4167 11.0611C22.8389 11.2722 23.2611 11.4833 23.5778 11.6944C24.1056 12.0111 24.6333 12.5389 24.7389 13.1722C24.95 14.1222 24.6333 14.9667 23.7889 15.6C23.2611 16.0222 23.05 16.2333 22.3111 16.2333C20.8333 16.2333 19.6722 16.3389 18.7222 16.0222C18.6167 16.2333 18.6167 16.2333 18.5111 16.1278V16.1278ZM14.8167 16.4444C14.9222 15.7056 14.9222 15.7056 15.0278 15.3889C15.5556 13.0667 16.0833 10.6389 16.5056 8.31667C16.6111 8.10556 16.6111 8 16.8222 8H18.7222C18.5111 9.26667 18.3 10.2167 17.9833 11.3778C17.6667 12.9611 17.35 14.5444 16.9278 16.1278C16.9278 16.3389 16.8222 16.3389 16.6111 16.3389L14.8167 16.4444ZM5 8.21111C5 8.10556 5.21111 8 5.31667 8H8.90556C9.43333 8 9.85556 8.31667 9.96111 8.84444L10.9111 13.4889C10.9111 13.5944 10.9111 13.5944 11.0167 13.7C11.0167 13.5944 11.1222 13.5944 11.1222 13.5944L13.3389 8.21111C13.2333 8.10556 13.3389 8 13.4444 8H15.6611C15.6611 8.10556 15.6611 8.10556 15.5556 8.21111L12.2833 15.9167C12.1778 16.1278 12.1778 16.2333 12.0722 16.3389C11.9667 16.4444 11.7556 16.3389 11.5444 16.3389H9.96111C9.85556 16.3389 9.75 16.3389 9.75 16.1278L8.06111 9.58333C7.85 9.37222 7.53333 9.05556 7.11111 8.95C6.47778 8.63333 5.31667 8.42222 5.10556 8.42222L5 8.21111Z" fill="white"/></svg>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 38 24" width="38" height="24" fill="none" aria-labelledby="pi-master"><title id="pi-master">Mastercard</title><rect x=".5" y=".5" width="37" height="23" rx="3" stroke="rgba(255,255,255,0.12)" fill="#141414"/><path d="M35 0H3C1.3 0 0 1.3 0 3V21C0 22.7 1.4 24 3 24H35C36.7 24 38 22.7 38 21V3C38 1.3 36.6 0 35 0Z" fill="#1C1C1C"/><path d="M35 1C36.1 1 37 1.9 37 3V21C37 22.1 36.1 23 35 23H3C1.9 23 1 22.1 1 21V3C1 1.9 1.9 1 3 1H35Z" fill="#232323"/><path d="M14.6364 19.2727C18.8538 19.2727 22.2727 15.8538 22.2727 11.6364C22.2727 7.41892 18.8538 4 14.6364 4C10.4189 4 7 7.41892 7 11.6364C7 15.8538 10.4189 19.2727 14.6364 19.2727Z" fill="#EB001B"/><path d="M23.3637 19.2727C27.5811 19.2727 31 15.8538 31 11.6364C31 7.41892 27.5811 4 23.3637 4C19.1462 4 15.7273 7.41892 15.7273 11.6364C15.7273 15.8538 19.1462 19.2727 23.3637 19.2727Z" fill="#F79E1B"/><path d="M22.2727 11.6362C22.2727 9.01797 20.9637 6.72706 19 5.41797C17.0364 6.83615 15.7273 9.12706 15.7273 11.6362C15.7273 14.1452 17.0364 16.5452 19 17.8543C20.9637 16.5452 22.2727 14.2543 22.2727 11.6362Z" fill="#FF5F00"/></svg>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 38 24" width="38" height="24" fill="none" aria-labelledby="pi-american_express"><title id="pi-american_express">American Express</title><rect x=".5" y=".5" width="37" height="23" rx="3" stroke="rgba(255,255,255,0.12)" fill="#141414"/><path d="M35 0H3C1.3 0 0 1.3 0 3V21C0 22.7 1.4 24 3 24H35C36.7 24 38 22.7 38 21V3C38 1.3 36.6 0 35 0Z" fill="#0071CE"/><path d="M25.8662 6.33203V3H31L31.8662 5.5332L32.7334 3H37V14.2002H36.7998L34.8672 16.2656L36.7998 18.3594H37V21.2666H33.5996L31.9336 19.3994L30.2002 21.2666H19.4668V12.666H16L20.2666 3H24.4004L25.8662 6.33203ZM20.5996 20.2656H27V18.5322H22.666V17.3994H26.8662V15.666H22.666V14.5322H27V12.7988H20.5996V20.2656ZM30.5332 16.5322L27 20.2656H29.5996L31.8662 17.8662L34.0664 20.2656H36.7324L33.1992 16.4658L36.7324 12.7988H34.1328L31.8662 15.1992L29.7324 12.7988H27L30.5332 16.5322ZM17.666 11.7324H19.9326L20.5332 10.1992H23.999L24.666 11.7324H26.999L23.666 4.19922H20.999L17.666 11.7324ZM33.5996 4.19922L31.9326 8.86621L30.1992 4.19922H27V11.666H29.0664V6.39941L31 11.666H32.7998L34.7324 6.39941V11.666H36.7324V4.13281L33.5996 4.19922ZM23.2656 8.46582H21.2656L22.2656 5.99902L23.2656 8.46582Z" fill="white"/></svg>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 38 24" width="38" height="24" aria-labelledby="pi-jcb"><title id="pi-jcb">JCB</title><rect x=".5" y=".5" width="37" height="23" rx="3" stroke="rgba(255,255,255,0.12)" fill="#141414"/><path d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.3 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.3-3-3-3z" fill="#fff"/><g transform="translate(6, 4.5) scale(0.68)"><path d="M4.6 0h5.8c2.5 0 4.6 2.1 4.6 4.6v10.8c0 2.5-2.1 4.6-4.6 4.6H4.6C2.1 20 0 17.9 0 15.4V4.6C0 2.1 2.1 0 4.6 0z" fill="#007940"/><path d="M15.4 0h5.8c2.5 0 4.6 2.1 4.6 4.6v10.8c0 2.5-2.1 4.6-4.6 4.6h-5.8c-2.5 0-4.6-2.1-4.6-4.6V4.6c0-2.5 2.1-4.6 4.6-4.6z" fill="#ED0006"/><path d="M26.2 0h5.8c2.5 0 4.6 2.1 4.6 4.6v10.8c0 2.5-2.1 4.6-4.6 4.6h-5.8c-2.5 0-4.6-2.1-4.6-4.6V4.6c0-2.5 2.1-4.6 4.6-4.6z" fill="#001B94"/><path d="M6.2 13.8c-.4 0-.7-.2-.7-.6V7.4h-1v5.8c0 1 .8 1.8 1.7 1.8h1v-1.2H6.2zm7.6-5.4c-.3-.6-.9-1.1-1.6-1.1H9.8v7.6h2.4c.7 0 1.3-.5 1.6-1.1.3-.6.3-1.6.3-2.7 0-1.1 0-2.1-.3-2.7zm-1.1 4.3c0 .6-.2 1-.6 1h-.7V8.5h.7c.4 0 .6.4.6 1v3.2zm6.5-3.2h-1.6v1.1h1.6v1h-1.6v1.1h1.7v1.1h-2.9V6.2h2.8v1.3z" fill="#fff"/></g></svg>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 38 24" width="38" height="24" aria-labelledby="pi-paypal"><title id="pi-paypal">PayPal</title><rect x=".5" y=".5" width="37" height="23" rx="3" stroke="rgba(255,255,255,0.12)" fill="#141414"/><path fill="#003087" d="M23.9 8.3c.2-1 0-1.7-.6-2.3-.6-.7-1.7-1-3.1-1h-4.1c-.3 0-.5.2-.6.5L14 15.6c0 .2.1.4.3.4H17l.4-3.4 1.8-2.2 4.7-2.1z"/><path fill="#3086C8" d="M23.9 8.3l-.2.2c-.5 2.8-2.2 3.8-4.6 3.8H18c-.3 0-.5.2-.6.5l-.6 3.9-.2 1c0 .2.1.4.3.4H19c.3 0 .5-.2.5-.4v-.1l.4-2.4v-.1c0-.2.3-.4.5-.4h.3c2.1 0 3.7-.8 4.1-3.2.2-1 .1-1.8-.4-2.4-.1-.5-.3-.7-.5-.8z"/><path fill="#012169" d="M23.3 8.1c-.1-.1-.2-.1-.3-.1-.1 0-.2 0-.3-.1-.3-.1-.7-.1-1.1-.1h-3c-.1 0-.2 0-.2.1-.2.1-.3.2-.3.4l-.7 4.4v.1c0-.3.3-.5.6-.5h1.3c2.5 0 4.1-1 4.6-3.8v-.2c-.1-.1-.3-.2-.5-.2h-.1z"/></svg>
              </li>
            </ul>
          </div>
        </footer>
      </footer-group>`;
  }

  // Mobile Menu Drawer Handler
  function initMobileMenuDrawer() {
    const menuDrawer = document.getElementById("MenuDrawer");
    if (!menuDrawer) return;

    const overlay = menuDrawer.querySelector(".overlay, overlay-element");
    const closeBtn = menuDrawer.querySelector(".drawer__close, button.drawer__close, .mobile-panel__close");
    const openBtns = document.querySelectorAll('[aria-controls="MenuDrawer"], .menu-drawer-button, .nav-toggle');
    const drawerInner = menuDrawer.querySelector(".drawer__inner");
    function openDrawer() {
      menuDrawer.removeAttribute("hidden");
      requestAnimationFrame(() => {
        menuDrawer.setAttribute("active", "");
        menuDrawer.setAttribute("open", "");
        document.body.classList.add("nav-open", "has-modal-open");
        openBtns.forEach((btn) => btn.setAttribute("aria-expanded", "true"));
      });
    }

    function closeDrawer() {
      menuDrawer.removeAttribute("active");
      menuDrawer.removeAttribute("open");
      document.body.classList.remove("nav-open", "has-modal-open");
      openBtns.forEach((btn) => btn.setAttribute("aria-expanded", "false"));
      setTimeout(() => {
        if (!menuDrawer.hasAttribute("active")) {
          menuDrawer.setAttribute("hidden", "");
        }
      }, 800);
    }

    openBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const isOpen = menuDrawer.hasAttribute("active");
        if (isOpen) {
          closeDrawer();
        } else {
          openDrawer();
        }
      });
    });

    closeBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      closeDrawer();
    });

    overlay?.addEventListener("click", (e) => {
      e.preventDefault();
      closeDrawer();
    });

    menuDrawer.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        closeDrawer();
      });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menuDrawer.hasAttribute("active")) {
        closeDrawer();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 991 && menuDrawer.hasAttribute("active")) {
        closeDrawer();
      }
    });

    // Touch gesture drag-to-dismiss physics
    let touchStartY = 0;
    let touchMoveY = 0;
    let isDragging = false;

    menuDrawer.addEventListener("touchstart", (e) => {
      if (!menuDrawer.hasAttribute("active")) return;
      const target = e.target;
      if (target.closest(".drawer__header") || target.closest(".drawer__inner")) {
        touchStartY = e.touches[0].clientY;
        touchMoveY = 0;
        isDragging = true;
      }
    }, { passive: true });

    menuDrawer.addEventListener("touchmove", (e) => {
      if (!isDragging) return;
      const currentY = e.touches[0].clientY;
      const diffY = currentY - touchStartY;
      if (diffY > 0) {
        touchMoveY = diffY;
        if (drawerInner) {
          drawerInner.style.transform = `translate3d(0, ${diffY}px, 0)`;
          drawerInner.style.transition = "none";
        }
        if (overlay) {
          const opacity = Math.max(0, 1 - diffY / (window.innerHeight * 0.6));
          overlay.style.opacity = String(opacity);
          overlay.style.transition = "none";
        }
      }
    }, { passive: true });

    menuDrawer.addEventListener("touchend", () => {
      if (!isDragging) return;
      isDragging = false;
      const threshold = Math.min(160, window.innerHeight * 0.22);
      if (touchMoveY > threshold) {
        if (drawerInner) {
          drawerInner.style.transition = "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)";
        }
        if (overlay) {
          overlay.style.transition = "opacity 0.5s cubic-bezier(0.25, 1, 0.5, 1)";
        }
        closeDrawer();
        setTimeout(() => {
          if (drawerInner) drawerInner.style.transform = "";
          if (overlay) overlay.style.opacity = "";
        }, 550);
      } else {
        if (drawerInner) {
          drawerInner.style.transition = "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
          drawerInner.style.transform = "translate3d(0, 0, 0)";
        }
        if (overlay) {
          overlay.style.transition = "opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
          overlay.style.opacity = "1";
        }
        setTimeout(() => {
          if (drawerInner) drawerInner.style.transition = "";
          if (overlay) overlay.style.transition = "";
        }, 450);
      }
      touchMoveY = 0;
    }, { passive: true });
  }

  // Header Dropdown Toggle & Accessibility Logic
  function initHeaderDropdowns() {
    const dropdowns = document.querySelectorAll(".header__dropdown, [data-dropdown]");
    dropdowns.forEach((dropdown) => {
      const toggle = dropdown.querySelector(".header__dropdown-toggle, [aria-haspopup='true']");
      if (!toggle) return;

      const setOpen = (open) => {
        dropdown.classList.toggle("is-open", open);
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      };

      toggle.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = dropdown.classList.contains("is-open") || toggle.getAttribute("aria-expanded") === "true";
        setOpen(!isOpen);
      });

      dropdown.addEventListener("mouseenter", () => {
        if (window.matchMedia && window.matchMedia("(pointer: fine)").matches) {
          setOpen(true);
        }
      });

      dropdown.addEventListener("mouseleave", () => {
        if (window.matchMedia && window.matchMedia("(pointer: fine)").matches) {
          setOpen(false);
        }
      });
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".header__dropdown, [data-dropdown]")) {
        dropdowns.forEach((dropdown) => {
          dropdown.classList.remove("is-open");
          const toggle = dropdown.querySelector(".header__dropdown-toggle, [aria-haspopup='true']");
          if (toggle) toggle.setAttribute("aria-expanded", "false");
        });
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        dropdowns.forEach((dropdown) => {
          dropdown.classList.remove("is-open");
          const toggle = dropdown.querySelector(".header__dropdown-toggle, [aria-haspopup='true']");
          if (toggle) toggle.setAttribute("aria-expanded", "false");
        });
      }
    });
  }

  // Render components immediately
  renderGlobalHeader();
  renderGlobalFooter();
  initMobileMenuDrawer();
  initHeaderDropdowns();

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

  // Unified Button Hover & Fill Interaction Engine
  const initHoverButtons = () => {
    const hoverTargets = document.querySelectorAll(
      '[is="hover-button"], [is="hover-link"], .btn-fill, [data-fill]'
    );
    hoverTargets.forEach((target) => {
      const btn = target.closest('button, a, .button, .gb-button, #hero-cta, #sticky-bar-cta-btn, .proxy-bundle-btn, .miroooo-sticky-btn, .cart-checkout-cta-btn, .about-btn-action, .track-submit-btn, .faq-action-btn, .miroooo-btn-load-more') || (target.tagName === 'BUTTON' || target.tagName === 'A' ? target : null);
      if (!btn || btn.dataset.hoverAttached) return;
      btn.dataset.hoverAttached = "true";

      const btnFill = btn.querySelector(".btn-fill, [data-fill]");
      if (!btnFill) return;

      btn.addEventListener("mouseenter", () => {
        btn.classList.add("is-hovered");
      });

      btn.addEventListener("mouseleave", () => {
        btn.classList.remove("is-hovered");
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
      renderGlobalHeader();
      renderGlobalFooter();
      initMobileMenuDrawer();
      initMagnet();
      initHoverButtons();
      initSlideGalleries();
    });
  } else {
    initMagnet();
    initHoverButtons();
    initSlideGalleries();
  }

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
    "Grey": "1000020700958564",
    "Gray": "1000020700958564",
    "Pink": "1000020700958562",
    "Rose Gold": "1000020700958562",
    "Silver": "1000020700958563"
  };

  const X2_VARIANTS = {
    "Grey": "1000020700182883",
    "Gray": "1000020700182883",
    "Pink": "1000020700182882",
    "Rose Gold": "1000020700182882",
    "Silver": "1000020700182884"
  };

  const GIFTS_DATABASE = {
    case: {
      id: "travel-case",
      name: "Luxury Travel Case",
      subtitle: "Protect & travel in style",
      value: "£16",
      valueNum: 16,
      image: "https://cdn.shopify.com/s/files/1/0810/6023/3561/files/Grey-color-5.jpg?v=1734444578&width=120"
    },
    heads: {
      id: "brush-heads",
      name: "2x Extra DuPont Brush Heads",
      subtitle: "Ultra-soft DuPont bristles",
      value: "£20",
      valueNum: 20,
      image: "https://cdn.shopify.com/s/files/1/0810/6023/3561/files/Grey-color-4.jpg?v=1734444578&width=120"
    },
    dock: {
      id: "charging-dock",
      name: "Magnetic Charging Dock",
      subtitle: "Fast wireless induction dock",
      value: "£25",
      valueNum: 25,
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

  async function createPlusbaseCheckoutSession(item, extraParams = {}) {
    const isHeads = item?.productHandle === "miroooo-x2-heads" || item?.productId === "1000000675072187" && item?.variantId === "1000020700182881";
    const isX2 = item?.productHandle === "miroooo-x2" || (item?.title && item.title.includes("X2"));
    let productId = "1000000675113473";
    if (isHeads || isX2) productId = "1000000675072187";

    let items = [];
    if (isHeads) {
      const qty = item?.quantity || item?.bundleCount || 1;
      items = [{
        productId: "1000000675072187",
        variantId: "1000020700182881",
        quantity: qty
      }];
    } else {
      const variants = isX2 ? X2_VARIANTS : X_VARIANTS;
      const bundleCount = item?.bundleCount || item?.count || item?.itemCount || (item?.tierId === "bundle-3" ? 3 : item?.tierId === "bundle-2" ? 2 : 1);
      const selectedColors = Array.isArray(item?.choices) && item.choices.length > 0
        ? item.choices.slice(0, bundleCount)
        : [item?.color || "Grey"];

      while (selectedColors.length < bundleCount) {
        selectedColors.push(selectedColors[0] || "Grey");
      }

      items = selectedColors.map((color) => {
        const vId = variants[color] || variants["Grey"] || variants["Gray"] || variants["Pink"] || variants["Silver"] || (isX2 ? "1000020700182883" : "1000020700958564");
        return {
          productId: productId,
          variantId: vId,
          quantity: 1,
        };
      });

      if (isX2 && bundleCount >= 2) {
        const extraSets = bundleCount - 1;
        items.push({
          productId: "1000000675072187",
          variantId: "1000020700182881",
          quantity: extraSets,
        });
      }
    }

    const attribution = readCapturedAttribution();
    Object.assign(attribution, extraParams);

    // 1. Serverless prepare route
    try {
      const response = await fetch("/api/checkout/prepare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items,
          discountCode: extraParams.discount || localStorage.getItem("miroooo_promo_code") || "",
          attribution: attribution,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        if (data?.checkoutUrl) return data.checkoutUrl;
      }
    } catch (err) {
      console.warn("Server prepare fallback", err);
    }

    // 2. Direct client-side PlusBase session creation
    try {
      const createRes = await fetch("https://muuhu.onshopbase.com/api/checkout/next/cart.json", {
        method: "POST",
        headers: { "Accept": "application/json" }
      });
      const createJson = await createRes.json();
      const cartToken = createJson?.result?.token;
      const checkoutToken = createJson?.result?.checkout_token;

      if (cartToken && checkoutToken) {
        const allowed = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "msclkid", "gclid", "fbclid", "source"];
        const properties = [];
        allowed.forEach(key => {
          if (attribution[key]) {
            properties.push({ name: `_blfm_${key}`, value: String(attribution[key]).slice(0, 500) });
          }
        });

        for (const itm of items) {
          await fetch(`https://muuhu.onshopbase.com/api/checkout/next/cart.json?cart_token=${encodeURIComponent(cartToken)}`, {
            method: "PUT",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              cartItem: {
                product_id: Number(itm.productId),
                variant_id: Number(itm.variantId),
                qty: Number(itm.quantity) || 1,
                properties: properties,
                metadata: { image_preview_id: "" }
              },
              from: "add-to-cart"
            })
          });
        }

        let target = `https://miroooo.us/checkouts/${checkoutToken}`;
        const discount = extraParams.discount || localStorage.getItem("miroooo_promo_code") || "";
        if (discount) {
          target += `?discount=${encodeURIComponent(discount)}`;
        }
        return target;
      }
    } catch (directErr) {
      console.error("Direct PlusBase session creation failed", directErr);
    }

    return "https://miroooo.us/checkouts";
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
            const isHeads = parsed.productId === "miroooo-x2-heads";
            const isX2 = parsed.productId === "miroooo-x2";
            let productHandle = "miroooo-x";
            let title = "Brush X";
            if (isHeads) {
              productHandle = "miroooo-x2-heads";
              title = "2x Brush X2 heads";
            } else if (isX2) {
              productHandle = "miroooo-x2";
              title = "Brush X2";
            }

            const colors = isHeads ? ["Default"] : (Array.isArray(parsed.colors) && parsed.colors.length > 0 ? parsed.colors : ["Grey"]);
            const qty = Math.max(1, parsed.quantity || colors.length);

            let unitPrice = 59;
            let comparePrice = 119;
            let image = "/assets_ref/x/gallery/Miroooo_x_Grey-2.webp";
            let unlockedGifts = 3;

            if (isHeads) {
              unitPrice = qty * 15;
              comparePrice = qty * 30;
              image = "/assets_ref/x2/heads/B1.webp";
              unlockedGifts = 0;
            } else if (isX2) {
              if (qty === 1) { unitPrice = 79; comparePrice = 159; }
              else if (qty === 2) { unitPrice = 148; comparePrice = 318; }
              else { unitPrice = qty * 66; comparePrice = qty * 159; }

              const firstColor = (colors[0] || "").toLowerCase();
              image = "/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-grey-in-hand.webp";
              if (firstColor.includes("pink") || firstColor.includes("rose")) image = "/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-pink-in-hand.webp";
              else if (firstColor.includes("silver")) image = "/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-silver-in-hand.webp";
              else if (firstColor.includes("grey") || firstColor.includes("gray")) image = "/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-grey-in-hand.webp";
            } else {
              if (qty === 1) { unitPrice = 59; comparePrice = 119; }
              else if (qty === 2) { unitPrice = 110; comparePrice = 238; }
              else { unitPrice = qty * 49; comparePrice = qty * 119; }

              const firstColor = (colors[0] || "").toLowerCase();
              if (firstColor.includes("pink") || firstColor.includes("rose")) image = "/assets_ref/x/gallery/Miroooo_x_Pink-1.webp";
              else if (firstColor.includes("silver")) image = "/assets_ref/x/gallery/Miroooo_x_Silver-1.webp";
              else if (firstColor.includes("grey") || firstColor.includes("gray")) image = "/assets_ref/x/gallery/Miroooo_x_Grey-2.webp";
            }

            return {
              items: [
                {
                  id: `${parsed.productId}-${qty}`,
                  productId: (isHeads || isX2) ? "1000000675072187" : "1000000675113473",
                  productHandle: productHandle,
                  title: (qty > 1 && !isHeads) ? `${title} (Buy ${qty})` : (isHeads && qty > 1 ? `${title} (Qty: ${qty})` : title),
                  quantity: 1,
                  bundleCount: qty,
                  choices: isHeads ? [] : colors,
                  color: isHeads ? "" : (colors[0] || "Grey"),
                  unitPrice: unitPrice,
                  comparePrice: comparePrice,
                  image: image,
                  unlockedGifts: unlockedGifts
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
          if (Array.isArray(parsed.items) && parsed.items.length > 0) return parsed;
        }
      } catch (_) {}
      return { items: [], promoCode: "AUTO", promoApplied: true };
    },

    saveCart(cart) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        if (cart && Array.isArray(cart.items) && cart.items.length > 0) {
          const item = cart.items[0];
          const isHeads = item.productHandle === "miroooo-x2-heads";
          const isX2 = item.productHandle === "miroooo-x2" || item.productId === "1000000675072187" || item.productId === "1000000664011618";
          let productId = "miroooo-x";
          if (isHeads) productId = "miroooo-x2-heads";
          else if (isX2) productId = "miroooo-x2";

          localStorage.setItem("miroooo_cart", JSON.stringify({
            productId: productId,
            quantity: item.bundleCount || item.quantity || 1,
            colors: isHeads ? ["Default"] : (item.choices || [item.color || "Grey"])
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
      const totalCount = (cart && Array.isArray(cart.items))
        ? cart.items.reduce((sum, item) => sum + (item.bundleCount || item.quantity || 1), 0)
        : 0;

      document.querySelectorAll("cart-count, .cart-count, .site-actions__bag .count, .cart-drawer-button .count, .site-actions__bag > span, .header__buttons cart-count").forEach((el) => {
        el.textContent = String(totalCount);
        if (totalCount > 0) {
          el.removeAttribute("hidden");
          el.classList.remove("hidden");
          el.style.display = "grid";
          el.style.opacity = "1";
          el.style.visibility = "visible";
        } else {
          el.setAttribute("hidden", "true");
          el.classList.add("hidden");
          el.style.display = "none";
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
          const isHeads = item.productHandle === "miroooo-x2-heads";
          const isX2 = item.productHandle === "miroooo-x2" || item.productId === "1000000675072187" || item.productId === "1000000664011618";
          const newQty = Math.max(1, quantity);
          let productId = "miroooo-x";
          if (isHeads) productId = "miroooo-x2-heads";
          else if (isX2) productId = "miroooo-x2";

          let colors = ["Default"];
          if (!isHeads) {
            colors = Array.isArray(item.choices) && item.choices.length > 0 ? [...item.choices] : ["Grey"];
            while (colors.length < newQty) {
              colors.push(colors[0] || "Grey");
            }
            colors = colors.slice(0, newQty);
          }

          try {
            localStorage.setItem("miroooo_cart", JSON.stringify({
              productId: productId,
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
                <h2 class="miroooo-cart-title">Your Miroooo bag</h2>
              </div>
              <button type="button" class="miroooo-cart-close-btn" aria-label="Close cart">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div class="miroooo-cart-body" id="cart-drawer-body">
              <div class="miroooo-cart-items" id="cart-items-list"></div>
            </div>
            <div class="miroooo-cart-footer" id="cart-drawer-footer">
              <div class="miroooo-cart-discount-row" id="cart-discount-toggle">
                <div class="miroooo-discount-btn">
                  <span class="miroooo-discount-label">
                    Total discount
                    <svg class="miroooo-chevron-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </span>
                  <span class="miroooo-discount-amount" id="cart-discount-val">-£0</span>
                </div>
                <div class="miroooo-discount-details" id="cart-discount-details">
                  <div class="miroooo-discount-detail-item" id="cart-bundle-discount-row">
                    <span>Bundle Special Offer</span>
                    <span id="cart-bundle-discount-val">-£0</span>
                  </div>
                  <div class="miroooo-discount-detail-item" id="cart-gift-discount-row">
                    <span>Unlocked Free Gifts</span>
                    <span id="cart-gift-discount-val">-£0</span>
                  </div>
                </div>
              </div>
              <div class="cart-subtotal-section" style="display: flex; align-items: center; justify-content: space-between; padding-top: 14px; border-top: 1px solid rgba(0, 0, 0, 0.08); margin-bottom: 16px;">
                <div>
                  <span class="cart-subtotal-label" style="font-size: 0.88rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: #000000; display: block;">SUBTOTAL</span>
                  <span class="cart-subtotal-sub" style="font-size: 0.75rem; color: #666666; display: block; margin-top: 2px;">Includes all taxes.</span>
                </div>
                <div class="cart-subtotal-amount" id="cart-subtotal-val" style="font-size: 1.85rem; font-weight: 800; color: #000000; line-height: 1; letter-spacing: -0.02em;">£0</div>
              </div>
              <div class="miroooo-checkout-btn-wrap">
                <a href="/cart" class="cart-checkout-cta-btn miroooo-checkout-btn" is="hover-button" style="text-decoration: none;" onclick="window.MirooooCart.closeCart()">
                  <span class="btn-fill" data-fill></span>
                  <span class="btn-text">
                    <span>Go to cart &rarr;</span>
                  </span>
                </a>
              </div>
            </div>
          </aside>
        `;

        drawer.querySelector(".miroooo-cart-backdrop")?.addEventListener("click", () => this.closeCart());
        drawer.querySelector(".miroooo-cart-close-btn")?.addEventListener("click", () => this.closeCart());

        const discountToggle = drawer.querySelector("#cart-discount-toggle");
        discountToggle?.addEventListener("click", () => {
          discountToggle.classList.toggle("is-open");
          const details = discountToggle.querySelector("#cart-discount-details");
          if (details) {
            const isOpen = discountToggle.classList.contains("is-open");
            details.style.display = isOpen ? "block" : "none";
          }
        });
      }
    },

    renderCartDrawer() {
      this.ensureCartDrawer();
      const cart = this.getCart();
      const items = cart.items || [];
      const hasItems = items.length > 0;

      const footer = document.getElementById("cart-drawer-footer");
      const itemsList = document.getElementById("cart-items-list");

      if (!hasItems) {
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
              <p class="miroooo-empty-text">Add the Brush X or Brush X2 to unlock current offers and free shipping.</p>
              <a href="/shop" class="miroooo-empty-shop-btn" onclick="window.MirooooCart.closeCart()">
                Shop Miroooo
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
            </div>
          `;
        }
        return;
      }

      if (footer) footer.style.display = "flex";

      // Render Line Items
      if (itemsList) {
        let itemsHtml = "";
        items.forEach((item) => {
          const isHeads = item.productHandle === "miroooo-x2-heads";
          const isX2 = item.productHandle === "miroooo-x2" || (item.title && item.title.toLowerCase().includes("x2")) || item.productId === "1000000675072187" || item.productId === "1000000664011618";
          const quantity = item.bundleCount || item.quantity || 1;
          let extraHeadsNote = "";
          if (isX2 && !isHeads && quantity >= 2) {
            const extraSets = quantity - 1;
            const extraHeads = extraSets * 2;
            extraHeadsNote = ` + ${extraHeads} Extra Free Brush Heads (${extraSets} ${extraSets > 1 ? "Sets" : "Set"})`;
          }

          let description = "Ultra-precise acoustic motor, 60-day battery, and 3 brushing modes with travel case.";
          if (isHeads) {
            description = "DuPont Ultra-Soft Replacement Heads (2-Pack) for Brush X2.";
          } else if (isX2) {
            description = `45° Bass sweep guidance, smart pressure sensor halo, and 90-day cobalt endurance${extraHeadsNote}.`;
          }

          const colorsLabel = (!isHeads && item.choices && item.choices.length > 0)
            ? `Colors: ${item.choices.join(" + ")}`
            : (!isHeads && item.color ? `Color: ${item.color}` : "");

          const unitPriceInt = Math.round(Number(item.unitPrice || 0));
          const unitPriceDisplay = `£${unitPriceInt}`;
          const comparePriceInt = item.comparePrice ? Math.round(Number(item.comparePrice)) : (unitPriceInt * 2);
          const comparePriceDisplay = comparePriceInt > unitPriceInt ? `£${comparePriceInt}` : "";

          itemsHtml += `
            <div class="miroooo-cart-item" data-item-id="${item.id}">
              <div class="miroooo-cart-item-thumb">
                <img src="${item.image}" alt="${item.title}" loading="lazy" />
              </div>
              <div class="miroooo-cart-item-content">
                <div class="miroooo-cart-item-top">
                  <div>
                    <h4 class="miroooo-cart-item-title">${item.title}</h4>
                    <p class="miroooo-cart-item-desc" style="font-size: 0.76rem; color: #555555; margin: 3px 0 0; line-height: 1.35;">${description}</p>
                    ${colorsLabel ? `<p class="miroooo-cart-item-colors" style="font-size: 0.78rem; color: #555555; font-weight: 500; margin: 3px 0 0; line-height: 1.35;">${colorsLabel}</p>` : ""}
                  </div>
                  <div class="miroooo-cart-item-pricing">
                    <span class="miroooo-cart-item-price">${unitPriceDisplay}</span>
                    ${comparePriceDisplay ? `<span class="miroooo-cart-item-compare">${comparePriceDisplay}</span>` : ""}
                  </div>
                </div>
                <div class="miroooo-cart-item-bottom">
                  <div class="miroooo-cart-stepper">
                    <button type="button" class="miroooo-stepper-btn" aria-label="Decrease quantity" onclick="window.MirooooCart.updateQuantity('${item.id}', ${quantity - 1})">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    </button>
                    <span class="miroooo-stepper-val">${quantity}</span>
                    <button type="button" class="miroooo-stepper-btn" aria-label="Increase quantity" onclick="window.MirooooCart.updateQuantity('${item.id}', ${quantity + 1})">
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

      // Calculate totals & savings (integers only)
      let subtotal = 0;
      let compareTotal = 0;
      let maxUnlockedGifts = 0;

      items.forEach((item) => {
        const isHeads = item.productHandle === "miroooo-x2-heads";
        const qty = item.quantity || 1;
        const unitPrice = Math.round(Number(item.unitPrice || 0));
        const comparePrice = item.comparePrice ? Math.round(Number(item.comparePrice)) : unitPrice * 2;
        subtotal += unitPrice * qty;
        compareTotal += comparePrice * qty;
        if (!isHeads) {
          const itemGifts = item.unlockedGifts !== undefined ? item.unlockedGifts : (item.bundleCount === 3 ? 3 : item.bundleCount === 2 ? 2 : 1);
          if (itemGifts > maxUnlockedGifts) maxUnlockedGifts = itemGifts;
        }
      });

      const unlockedGiftsList = [];
      if (maxUnlockedGifts >= 1) unlockedGiftsList.push(GIFTS_DATABASE.case);
      if (maxUnlockedGifts >= 2) unlockedGiftsList.push(GIFTS_DATABASE.heads);
      if (maxUnlockedGifts >= 3) unlockedGiftsList.push(GIFTS_DATABASE.dock);

      const totalGiftValueNum = unlockedGiftsList.reduce((sum, g) => sum + Math.round(Number(g.valueNum || 0)), 0);
      const bundleSavings = Math.max(0, compareTotal - subtotal);
      const totalDiscountNum = bundleSavings + totalGiftValueNum;

      // Update Summary Values
      const subtotalValEl = document.getElementById("cart-subtotal-val");
      const totalValEl = document.getElementById("cart-total-val");
      const discountValEl = document.getElementById("cart-discount-val");
      const bundleDiscountValEl = document.getElementById("cart-bundle-discount-val");
      const giftDiscountValEl = document.getElementById("cart-gift-discount-val");

      if (subtotalValEl) subtotalValEl.textContent = `£${Math.round(subtotal)}`;
      if (totalValEl) totalValEl.textContent = `£${Math.round(subtotal)}`;
      if (discountValEl) discountValEl.textContent = `-£${Math.round(totalDiscountNum)}`;
      if (bundleDiscountValEl) bundleDiscountValEl.textContent = `-£${Math.round(bundleSavings)}`;
      if (giftDiscountValEl) giftDiscountValEl.textContent = `-£${Math.round(totalGiftValueNum)}`;
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

    async checkout() {
      const cart = this.getCart();
      const items = cart.items || [];
      if (items.length === 0) return;

      const checkoutBtn = document.getElementById("cart-drawer-checkout-btn");
      const btnText = document.getElementById("cart-checkout-btn-text");
      if (checkoutBtn) {
        checkoutBtn.disabled = true;
        if (btnText) btnText.textContent = "Securing checkout...";
      }

      try {
        const primaryItem = items[0];
        const checkoutUrl = await createPlusbaseCheckoutSession(primaryItem);
        window.location.assign(checkoutUrl);
      } catch (err) {
        console.error("Checkout redirection failed:", err);
        if (typeof window.resetButtonLoadingStates === "function") {
          window.resetButtonLoadingStates();
        }
      }
    }
  };

  window.MirooooCart = MirooooCart;

  function updateDeliveryDates() {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5);
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
  const initCartOnPage = () => {
    MirooooCart.updateHeaderBadges();
    MirooooCart.ensureCartDrawer();
    updateDeliveryDates();
    initMirooooLottieIcons();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCartOnPage);
  } else {
    initCartOnPage();
  }

  // Global Button Click Loader Reset Helper
  function resetButtonLoadingStates(root) {
    const scope = root && root.querySelectorAll ? root : document;
    scope.querySelectorAll(".miroooo-button-click-loader, .buudy-button-click-loader").forEach((loader) => {
      loader.remove();
    });
    scope.querySelectorAll("button[disabled], input[type='submit'][disabled], a.is-loading, button.is-loading, .is-loading").forEach((btn) => {
      if (btn.dataset.permanentlyDisabled !== "true" && !btn.hasAttribute("data-static-disabled")) {
        btn.disabled = false;
      }
      btn.classList.remove("is-loading");
      btn.removeAttribute("aria-busy");
    });
    const drawerCheckoutText = document.getElementById("cart-checkout-btn-text");
    if (drawerCheckoutText) {
      drawerCheckoutText.textContent = "Go to cart \u2192";
    }
  }

  window.resetButtonLoadingStates = resetButtonLoadingStates;
  MirooooCart.resetLoaders = resetButtonLoadingStates;

  window.addEventListener("pageshow", () => {
    MirooooCart.updateHeaderBadges();
    resetButtonLoadingStates();
  });

  window.addEventListener("popstate", () => {
    resetButtonLoadingStates();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      resetButtonLoadingStates();
    }
  });

  window.addEventListener("storage", (e) => {
    if (e.key === "miroooo_cart" || e.key === "miroooo_cart_empty" || e.key === "miroooo_cart_v1") {
      MirooooCart.updateHeaderBadges();
      const drawer = document.getElementById("CartDrawer");
      if (drawer && (drawer.classList.contains("is-open") || drawer.getAttribute("aria-hidden") === "false")) {
        MirooooCart.renderCartDrawer();
      }
    }
  });

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

  // Global Button Click Loader (Exact from muuhu-store)
  document.addEventListener("click", (e) => {
    // Ignore navigation/drawer toggles, review controls, and small controls from receiving intrusive 5-dot overlay
    if (e.target.closest(
      ".nav-toggle, .menu-drawer-button, .drawer__close, .mobile-panel__close, " +
      ".miroooo-cart-close-btn, .header__dropdown-toggle, [data-dropdown] button, " +
      ".miroooo-stepper-btn, .cart-stepper-btn, .miroooo-cart-remove-btn, .cart-remove-button, " +
      "[aria-controls='MenuDrawer'], [aria-controls='CartDrawer'], .site-actions__bag, .flickity-button, " +
      ".miroooo-helpful-btn, .miroooo-lightbox-helpful-btn, .miroooo-read-more-btn, " +
      ".miroooo-star-btn, .miroooo-star-trigger, .miroooo-sort-trigger, .miroooo-dropdown-trigger, " +
      ".miroooo-dropdown-item, .miroooo-filter-pill, .miroooo-breakdown-row, " +
      ".miroooo-lightbox-close, .miroooo-write-close, .miroooo-lightbox-close-btn, .miroooo-write-close-btn, " +
      ".miroooo-form-cancel, .miroooo-success-close, .miroooo-empty-reset-btn, #miroooo-clear-all-link, " +
      ".accordion-summary, summary, [is='accordion-details']"
    )) {
      return;
    }

    const btn = e.target.closest("button, a.gb-button, a.btn, .btn, .cart-checkout-cta-btn, .product-form__submit, #hero-cta, #sticky-bar-cta-btn, .miroooo-sticky-btn, .miroooo-checkout-btn, .proxy-bundle-btn, [is='magnet-button'], [is='hover-button'], button[type='submit']");
    if (!btn || btn.disabled) return;

    // Detect background brightness to choose white vs black dots
    const compStyle = window.getComputedStyle(btn);
    const bg = compStyle.backgroundColor;
    let isLightBg = false;

    if (bg && bg.startsWith("rgb")) {
      const rgb = bg.match(/\d+/g);
      if (rgb && rgb.length >= 3) {
        const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
        if (brightness > 160) {
          isLightBg = true;
        }
      }
    }
    if (
      btn.classList.contains("cart-checkout-cta-btn") ||
      btn.classList.contains("btn--white") ||
      btn.classList.contains("gb-button--light") ||
      btn.id === "main-checkout-btn" ||
      btn.id === "sticky-checkout-btn"
    ) {
      isLightBg = true;
    }

    // Ensure relative positioning
    if (compStyle.position === "static") {
      btn.style.position = "relative";
    }

    let loader = btn.querySelector(".miroooo-button-click-loader");
    if (!loader) {
      loader = document.createElement("span");
      loader.setAttribute("aria-hidden", "true");
      loader.className = `miroooo-button-click-loader buudy-button-click-loader ${isLightBg ? "miroooo-button-click-loader--dark-dots" : "miroooo-button-click-loader--light-dots"}`;
      loader.innerHTML = `
        <span class="miroooo-button-click-loader-dots buudy-button-click-loader-dots">
          <span></span><span></span><span></span><span></span><span></span>
        </span>
      `;
      btn.appendChild(loader);
    } else {
      loader.className = `miroooo-button-click-loader buudy-button-click-loader ${isLightBg ? "miroooo-button-click-loader--dark-dots" : "miroooo-button-click-loader--light-dots"}`;
      loader.style.display = "flex";
    }

    // Auto-remove after 900ms to guarantee button returns to normal state
    if (btn._loaderTimer) clearTimeout(btn._loaderTimer);
    btn._loaderTimer = setTimeout(() => {
      if (loader && loader.parentNode) {
        loader.remove();
      }
      btn._loaderTimer = null;
    }, 900);
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      MirooooCart.closeCart();
    }
  });
})();
