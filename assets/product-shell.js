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
          <div class="miroooo-product-footer__column"><strong>Support</strong><a href="/faq">FAQs</a><a href="/shipping-policy">Shipping policy</a><a href="/return-policy">Return policy</a><a href="/refund-policy">Refund policy</a><a href="/warranty">Warranty</a><a href="/order-tracking">Track order</a><a href="/contact">Contact</a></div>
          <div class="miroooo-product-footer__column"><strong>About</strong><a href="/about">Our approach</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/cookies-policy">Cookies</a></div>
        </div>
        <div class="miroooo-product-footer__bottom"><span>© ${new Date().getFullYear()} Miroooo. All rights reserved.</span><div class="miroooo-product-footer__legal"><a href="/privacy">Privacy policy</a><a href="/terms">Terms of service</a><a href="/cookies-policy">Cookies policy</a></div></div>
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
    const closeControl = event.target.closest?.("#CartDrawer .drawer__close, #CartDrawer overlay-element, #CartDrawer .miroooo-cart-close, #CartDrawer .miroooo-cart-close-btn, #CartDrawer .miroooo-cart-backdrop");
    if (!closeControl) return;
    event.preventDefault();
    setTimeout(closeCartDrawer, 0);
  }, true);
  document.querySelectorAll("#CartDrawer .drawer__close, #CartDrawer overlay-element, #CartDrawer .miroooo-cart-close, #CartDrawer .miroooo-cart-close-btn, #CartDrawer .miroooo-cart-backdrop").forEach((control) => {
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
      const mediaNodes = document.querySelectorAll(".product__media-list .product__media");
      mediaNodes.forEach((node) => {
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
        videoEl.style.maxWidth = "90vw";
        videoEl.style.maxHeight = "85vh";
        videoEl.style.width = "auto";
        videoEl.style.height = "auto";
        videoEl.style.objectFit = "contain";
        videoEl.style.display = "block";
        videoEl.style.borderRadius = "25px";
        videoEl.style.boxShadow = "0 0 30px rgba(0, 0, 0, 0.5)";
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
        imgEl.style.maxWidth = "90vw";
        imgEl.style.maxHeight = "85vh";
        imgEl.style.width = "auto";
        imgEl.style.height = "auto";
        imgEl.style.objectFit = "contain";
        imgEl.style.display = "block";
        imgEl.style.borderRadius = "25px";
        imgEl.style.boxShadow = "0 0 30px rgba(0, 0, 0, 0.5)";
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

