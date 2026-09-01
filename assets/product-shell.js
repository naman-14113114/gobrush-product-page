(function () {
  "use strict";

  // Geo Redirection Guard: VN, HK, CN, SG -> https://miroooo.us
  (function enforceGeoRedirection() {
    var BLOCKED_COUNTRIES = ["VN", "HK", "CN", "SG"];
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
        tz.indexOf("beijing") !== -1
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
    item.innerHTML = "Free tracked UK delivery · Risk-Free Home Trial";
  });

  // Synchronize Navigation links and duplicate text for roll-up animation
  const desktopLinks = document.querySelectorAll(".header__menu > ul > li > a, .site-nav > ul > li > a");
  desktopLinks.forEach((link) => {
    const text = link.getAttribute("data-nav-label") || link.querySelector(".btn-text:not(.btn-duplicate)")?.textContent?.trim() || link.textContent?.trim();
    if (!text) return;
    
    // Ensure both default text and duplicate pill span exist
    let defaultSpan = link.querySelector(".btn-text:not(.btn-duplicate)");
    let duplicateSpan = link.querySelector(".btn-duplicate");
    
    if (!defaultSpan) {
      defaultSpan = document.createElement("span");
      defaultSpan.className = "btn-text";
      defaultSpan.setAttribute("data-text", text);
      defaultSpan.textContent = text;
      link.prepend(defaultSpan);
    } else {
      defaultSpan.dataset.text = text;
      defaultSpan.textContent = text;
    }
    
    if (!duplicateSpan) {
      duplicateSpan = document.createElement("span");
      duplicateSpan.className = "btn-text btn-duplicate";
      link.append(duplicateSpan);
    }
    duplicateSpan.textContent = text;
  });

  // Header Dropdown Toggle Logic for Product Shell
  const initShellDropdowns = () => {
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
  };
  initShellDropdowns();

  // Authentic GoBrush Magnet Spring Hover Physics
  const initMagnetEffect = () => {
    const magnetTargets = document.querySelectorAll(
      '[is="magnet-link"], [is="magnet-button"]'
    );
    
    magnetTargets.forEach((target) => {
      if (target.dataset.magnetAttached) return;
      target.dataset.magnetAttached = "true";

      const btnText = target.querySelector("[data-text]");

      let rafId = null;
      target.addEventListener("mousemove", (e) => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
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
      }, { passive: true });

      target.addEventListener("mouseleave", () => {
        if (rafId) cancelAnimationFrame(rafId);
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

  // Mobile Menu Drawer Handler & Close Logic
  const closeMenuDrawer = () => {
    const drawer = document.getElementById("MenuDrawer");
    if (!drawer) return;
    if (typeof drawer.hide === "function") {
      try {
        drawer.hide();
      } catch (_) {
        drawer.removeAttribute("open");
        drawer.removeAttribute("active");
        drawer.hidden = true;
      }
    } else {
      drawer.removeAttribute("open");
      drawer.removeAttribute("active");
      drawer.hidden = true;
    }
    document.querySelectorAll('[aria-controls="MenuDrawer"]').forEach((btn) => {
      btn.setAttribute("aria-expanded", "false");
    });
  };
  document.addEventListener("click", (event) => {
    const menuCloseBtn = event.target.closest?.("#MenuDrawer .drawer__close, #MenuDrawer [aria-label='Close'], #MenuDrawer .button--close");
    if (menuCloseBtn) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      closeMenuDrawer();
      return;
    }

    const drawer = document.getElementById("MenuDrawer");
    if (drawer && (drawer.hasAttribute("open") || drawer.hasAttribute("active") || !drawer.hidden)) {
      const isInsideInner = event.target.closest?.("#MenuDrawer .drawer__inner");
      const isMenuToggle = event.target.closest?.('.menu-drawer-button, [aria-controls="MenuDrawer"]');
      if (!isInsideInner && !isMenuToggle && event.target.closest?.("#MenuDrawer")) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        closeMenuDrawer();
      }
    }
  }, true);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenuDrawer();
    }
  });

  const mobileLinks = document.querySelectorAll("#MenuDrawer .drawer__menu a, #MenuDrawer .drawer__menu-item, #MenuDrawer .drawer__submenu-item");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMenuDrawer);
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
    footerGroup.innerHTML = `
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
              <li><a href="/products/miroooo-x" data-product-link>Brush X1</a></li>
              <li><a href="/products/miroooo-x2" data-product-link>Brush X2</a></li>
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
              <li><a href="https://miroooo.us/pages/order-tracking">Order Tracking</a></li>
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
      </footer>`;
  }

  const allowedAttribution = ["msclkid", "gclid", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
  const query = new URLSearchParams(location.search);
  document.querySelectorAll('a[href*="/checkouts"], a[href*="cart"]').forEach((link) => {
    try {
      const target = new URL(link.href, window.location.origin);
      allowedAttribution.forEach((key) => {
        const value = query.get(key);
        if (value) target.searchParams.set(key, value);
      });
      link.href = target.toString();
    } catch (_) {}
  });

  const closeCartDrawer = () => {
    if (window.MirooooCart?.closeCart) {
      window.MirooooCart.closeCart();
    }
    const drawer = document.getElementById("CartDrawer");
    if (!drawer) return;
    drawer.removeAttribute("open");
    drawer.classList.remove("active", "pointer-events-auto", "is-open");
    drawer.classList.add("pointer-events-none");
    drawer.setAttribute("aria-hidden", "true");
    const inner = drawer.querySelector(".drawer__inner");
    if (inner) inner.style.transform = "translateX(100%)";
    const overlay = drawer.querySelector("overlay-element");
    if (overlay) {
      overlay.classList.add("invisible", "opacity-0", "pointer-events-none");
      overlay.classList.remove("visible", "opacity-100", "pointer-events-auto");
    }
    document.body.classList.remove("overflow-hidden", "cart-drawer-open");
  };

  document.addEventListener("click", (event) => {
    const closeControl = event.target.closest?.("#CartDrawer .drawer__close, #CartDrawer overlay-element, #CartDrawer .miroooo-cart-close-btn, #CartDrawer .miroooo-cart-backdrop");
    if (!closeControl) return;
    event.preventDefault();
    setTimeout(closeCartDrawer, 0);
  }, true);
  document.querySelectorAll("#CartDrawer .drawer__close, #CartDrawer overlay-element, #CartDrawer .miroooo-cart-close-btn, #CartDrawer .miroooo-cart-backdrop").forEach((control) => {
    control.addEventListener("click", () => {
      setTimeout(closeCartDrawer, 0);
    }, true);
  });

  // =========================================================
  // MIROOOO LUXURY 1:1 PRODUCT GALLERY LIGHTBOX MODAL
  // =========================================================
  function initProductGalleryLightbox() {
    const modal = document.getElementById("MirooooGalleryLightbox");
    if (!modal) return;

    const mediaBox = document.getElementById("MirooooGalleryLightboxMediaBox");
    const closeBtn = document.getElementById("MirooooGalleryLightboxClose");
    const prevBtn = document.getElementById("MirooooGalleryLightboxPrev");
    const nextBtn = document.getElementById("MirooooGalleryLightboxNext");
    const currentCountEl = document.getElementById("MirooooGalleryLightboxCurrent");
    const totalCountEl = document.getElementById("MirooooGalleryLightboxTotal");
    const backdrop = modal.querySelector(".miroooo-gallery-lightbox__backdrop");

    let currentIndex = 0;
    let isOpen = false;
    let touchStartX = 0;
    let touchStartY = 0;
    let previousActiveElement = null;
    let previousBodyOverflow = "";

    function getGalleryMediaItems() {
      const items = [];
      const mediaNodes = document.querySelectorAll("#MirooooGallerySlides .miroooo-gallery__slide, .product__media-list .product__media");
      mediaNodes.forEach((node) => {
        if (node.style.display === "none" || node.classList.contains("hidden")) return;
        const video = node.querySelector("video");
        if (video || node.dataset.mediaType === "video" || node.classList.contains("product__media--video")) {
          const src = video ? (video.getAttribute("src") || video.currentSrc || video.src) : "";
          items.push({
            type: "video",
            src: src,
            alt: "Miroooo Product Video"
          });
        } else {
          const img = node.querySelector("img");
          if (img) {
            const src = img.getAttribute("src") || img.currentSrc || img.src;
            const alt = img.getAttribute("alt") || "Miroooo Product View";
            items.push({
              type: "image",
              src: src,
              alt: alt
            });
          }
        }
      });
      return items;
    }

    function preloadNextMedia(index, items) {
      if (!items || !items.length) return;
      const nextIdx = (index + 1) % items.length;
      const nextItem = items[nextIdx];
      if (!nextItem) return;
      if (nextItem.type === "video") {
        const v = document.createElement("video");
        v.preload = "metadata";
        v.src = nextItem.src;
        v.load();
      } else {
        const im = new Image();
        im.decoding = "async";
        im.src = nextItem.src;
      }
    }

    function renderMedia(index) {
      const items = getGalleryMediaItems();
      if (!items.length) return;

      if (index < 0) index = items.length - 1;
      if (index >= items.length) index = 0;
      currentIndex = index;

      if (currentCountEl) currentCountEl.textContent = String(currentIndex + 1);
      if (totalCountEl) totalCountEl.textContent = String(items.length);
      if (!mediaBox) return;

      const item = items[currentIndex];
      if (!item) return;

      // Clean up existing video if any
      const existingVideo = mediaBox.querySelector("video");
      if (existingVideo) {
        existingVideo.pause();
        existingVideo.removeAttribute("src");
        existingVideo.load();
      }
      mediaBox.innerHTML = "";

      if (item.type === "video") {
        const videoEl = document.createElement("video");
        videoEl.className = "miroooo-gallery-lightbox__video";
        videoEl.src = item.src;
        videoEl.autoplay = true;
        videoEl.loop = true;
        videoEl.muted = true;
        videoEl.playsInline = true;
        videoEl.setAttribute("playsinline", "");
        videoEl.setAttribute("autoplay", "");
        videoEl.setAttribute("loop", "");
        videoEl.setAttribute("muted", "");
        videoEl.setAttribute("controlslist", "nodownload nofullscreen noremoteplayback");
        videoEl.setAttribute("disablepictureinpicture", "");
        mediaBox.appendChild(videoEl);
        videoEl.play().catch(() => {});
      } else {
        const imgEl = document.createElement("img");
        imgEl.className = "miroooo-gallery-lightbox__img";
        imgEl.src = item.src;
        imgEl.alt = item.alt || "Expanded Product View";
        imgEl.decoding = "async";
        imgEl.loading = "eager";
        mediaBox.appendChild(imgEl);
      }

      preloadNextMedia(currentIndex, items);
    }

    function openLightbox(index) {
      previousActiveElement = document.activeElement;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.classList.add("overflow-hidden");
      document.documentElement.classList.add("overflow-hidden");
      isOpen = true;

      renderMedia(typeof index === "number" ? index : 0);

      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");

      closeBtn?.focus();
    }

    function closeLightbox() {
      if (!isOpen && !modal.classList.contains("is-open")) return;
      isOpen = false;

      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");

      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.classList.remove("overflow-hidden");
      document.documentElement.classList.remove("overflow-hidden");

      if (mediaBox) {
        const vid = mediaBox.querySelector("video");
        if (vid) {
          vid.pause();
          vid.removeAttribute("src");
          vid.load();
        }
        mediaBox.innerHTML = "";
      }

      if (previousActiveElement && typeof previousActiveElement.focus === "function") {
        try {
          previousActiveElement.focus();
        } catch (err) {}
      }
    }

    function goNext() {
      const items = getGalleryMediaItems();
      if (!items.length) return;
      renderMedia((currentIndex + 1) % items.length);
    }

    function goPrev() {
      const items = getGalleryMediaItems();
      if (!items.length) return;
      renderMedia((currentIndex - 1 + items.length) % items.length);
    }

    // Button controls
    closeBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeLightbox();
    });

    prevBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      goPrev();
    });

    nextBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      goNext();
    });

    backdrop?.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeLightbox();
    });

    modal.addEventListener("click", (e) => {
      if (
        e.target === modal ||
        e.target === backdrop ||
        e.target.classList.contains("miroooo-gallery-lightbox__stage")
      ) {
        closeLightbox();
      }
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        e.preventDefault();
        closeLightbox();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "Tab") {
        const focusables = modal.querySelectorAll("button:not([disabled])");
        if (focusables.length) {
          const first = focusables[0];
          const last = focusables[focusables.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    });

    // Touch Swipe Navigation
    modal.addEventListener(
      "touchstart",
      (e) => {
        if (!isOpen) return;
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
      },
      { passive: true }
    );

    modal.addEventListener(
      "touchend",
      (e) => {
        if (!isOpen) return;
        const touchEndX = e.changedTouches[0].screenX;
        const touchEndY = e.changedTouches[0].screenY;
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
          if (diffX < 0) {
            goNext();
          } else {
            goPrev();
          }
        }
      },
      { passive: true }
    );

    // Attach click listeners to all main gallery media items and thumbnails
    const mainMediaItems = document.querySelectorAll(".product__media-list .product__media");
    mainMediaItems.forEach((mediaEl, idx) => {
      mediaEl.style.cursor = "zoom-in";
      mediaEl.style.pointerEvents = "auto";
      const vidWrap = mediaEl.querySelector(".video-wrapper");
      if (vidWrap) vidWrap.style.pointerEvents = "auto";
      const vid = mediaEl.querySelector("video");
      if (vid) vid.style.pointerEvents = "auto";

      mediaEl.addEventListener("click", (e) => {
        e.preventDefault();
        openLightbox(idx);
      });
    });

    const thumbnails = document.querySelectorAll(".product__thumbnails-list .product__thumbnail");
    thumbnails.forEach((thumb, idx) => {
      thumb.style.cursor = "pointer";
      thumb.addEventListener("click", (e) => {
        thumbnails.forEach((t) => t.classList.remove("is-active"));
        thumb.classList.add("is-active");
        if (mainMediaItems[idx]) {
          mainMediaItems[idx].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
        }
        openLightbox(idx);
      });
    });

    window.openMirooooLightbox = openLightbox;
    window.closeMirooooLightbox = closeLightbox;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initProductGalleryLightbox);
  } else {
    initProductGalleryLightbox();
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

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMirooooLottieIcons);
  } else {
    initMirooooLottieIcons();
  }

})();

