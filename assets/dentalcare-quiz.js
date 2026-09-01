/**
 * MIROOOO DENTAL CARE QUIZ INTERACTION & PERSONALISATION ENGINE
 * Aesthetic: "The Quiet Instrument"
 * Handles state management, step navigation, progress tracking,
 * profile prescription algorithm, loading simulation, and cart integration.
 */

(function () {
  "use strict";

  const STORAGE_KEY = "miroooo_dentalcare_quiz_state_v1";
  const TOTAL_STEPS = 5;
  const CALCULATION_DURATION_MS = 1200;

  // Diagnostic checklist step timings (ms)
  const CHECKLIST_STEPS = [
    { delay: 250, index: 0 },
    { delay: 650, index: 1 },
    { delay: 1050, index: 2 }
  ];

  // Asset image catalog for X1 and X2
  const PRODUCT_ASSETS = {
    x2: {
      silver: "/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-silver-upright-grip.webp",
      pink: "/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-pink-upright-grip.webp",
      grey: "/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-grey-upright-grip.webp"
    },
    x1: {
      silver: "/assets_ref/x/gallery/Miroooo_x_Silver-1.webp",
      pink: "/assets_ref/x/gallery/Miroooo_x_Pink-1.webp",
      grey: "/assets_ref/x/gallery/Miroooo_x_Grey-2.webp"
    }
  };

  // Profile Prescriptions
  const PROFILES = {
    gum_defense: {
      id: "gum_defense",
      model: "x2",
      badgeText: "99% Optimal Match",
      pillClass: "quiz-pill-badge",
      title: "Miroooo Brush X2 Flagship",
      subtitle: "45° Bass Sweep & Smart Red Halo Pressure Defense",
      price: "£69",
      priceNumber: 69,
      comparePrice: "£139",
      comparePriceNumber: 139,
      saveText: "SAVE 50%",
      image: PRODUCT_ASSETS.x2.silver,
      isBundle: false,
      ctaText: "Add Brush X2 to Cart · £69",
      bullets: [
        {
          strong: "45° Bass Sweeping Oscillation:",
          text: "Engineered to reach 2–3mm under the gingival margin, actively reversing plaque buildup and soothing bleeding gums."
        },
        {
          strong: "Smart Red Halo Pressure Ring:",
          text: "Real-time visual feedback stops hard scrubbing instantly to protect receding gums and sensitive enamel."
        },
        {
          strong: "IPX7 Immersion Waterproof:",
          text: "Seamless aerospace aluminium unibody allows safe, effortless brushing in the shower."
        },
        {
          strong: "90+ Day Battery Endurance:",
          text: "High-density lithium cell requires only a single 2-hour USB-C charge every quarter."
        }
      ],
      routine: [
        {
          phase: "Phase 1 (Days 1–7)",
          title: "Gingival Soothing & Zone Pacing",
          desc: "Use Soft Mode at a 45° angle. Follow the 30-second quad-pacer to gently stimulate gum tissue without mechanical pressure."
        },
        {
          phase: "Phase 2 (Days 8–14)",
          title: "Acoustic Plaque Flushing",
          desc: "Advance to Clean Mode. Let the 38,000 VPM acoustic micro-bubbles flush interdental pockets while maintaining a featherlight grip."
        },
        {
          phase: "Phase 3 (Days 15–28)",
          title: "Complete Gum Fortification",
          desc: "Noticeably firmer, healthier gums with zero bleeding and automated 2-minute daily compliance."
        }
      ]
    },

    stain_defense: {
      id: "stain_defense",
      model: "x2",
      badgeText: "98% Optimal Match",
      pillClass: "quiz-pill-badge",
      title: "Miroooo Brush X2 Flagship",
      subtitle: "High-Frequency Acoustic Micro-Polish & Stain Removal",
      price: "£69",
      priceNumber: 69,
      comparePrice: "£139",
      comparePriceNumber: 139,
      saveText: "SAVE 50%",
      image: PRODUCT_ASSETS.x2.silver,
      isBundle: false,
      ctaText: "Add Brush X2 to Cart · £69",
      bullets: [
        {
          strong: "Dynamic Whitening Polish (38,000 VPM):",
          text: "High-velocity acoustic vibrations lift stubborn tannins, coffee, and tea stains without harsh enamel abrasion."
        },
        {
          strong: "DuPont Diamond-Cut Rounded Bristles:",
          text: "Micro-sculpted nylon tips buff tooth surfaces to a glossy natural radiance while shielding dental enamel."
        },
        {
          strong: "3 Halo LED Preset Modes:",
          text: "Seamlessly switch between Clean, Soft, and High-Intensity Whitening Polish with the tactile unibody switch."
        },
        {
          strong: "51g Aerospace Aluminium Body:",
          text: "Featherweight precision instrument balance gives exact control for targeted front-incisor polishing."
        }
      ],
      routine: [
        {
          phase: "Phase 1 (Days 1–7)",
          title: "Surface Film Dissolution",
          desc: "Morning Whitening Mode + Evening Clean Mode to dislodge daily tannin adhesion before it calcifies."
        },
        {
          phase: "Phase 2 (Days 8–14)",
          title: "Targeted Front-Incisor Buffing",
          desc: "Incorporate a 30-second bonus front polish after morning coffee or tea using the diamond-cut DuPont head."
        },
        {
          phase: "Phase 3 (Days 15–28)",
          title: "High-Gloss Enamel Radiance",
          desc: "Silky smooth enamel that repels future stains throughout the day, verified with clinic-grade sheen."
        }
      ]
    },

    travel_minimalist: {
      id: "travel_minimalist",
      model: "x1",
      badgeText: "97% Optimal Match",
      pillClass: "quiz-pill-badge",
      title: "Miroooo Brush X1 Essential",
      subtitle: "Ultralight 51g Acoustic Precision & 60-Day Travel Freedom",
      price: "£59",
      priceNumber: 59,
      comparePrice: "£119",
      comparePriceNumber: 119,
      saveText: "SAVE 50%",
      image: PRODUCT_ASSETS.x1.silver,
      isBundle: false,
      ctaText: "Add Brush X1 to Cart · £59",
      bullets: [
        {
          strong: "51g Ultra-Featherweight Chassis:",
          text: "Aerospace aluminium body weighs less than half of bulky legacy electric toothbrushes."
        },
        {
          strong: "60-Day Single Charge Freedom:",
          text: "Charge just 6 times a year with direct USB-C fast charging — zero proprietary charging docks to pack."
        },
        {
          strong: "Magnetic Wall Dock & Travel Case:",
          text: "Includes slim ventilated travel case and magnetic wall mount dock right inside the box."
        },
        {
          strong: "Whisper-Quiet Sonic Motor (<50 dB):",
          text: "Discreet, powerful acoustic vibration for seamless hotel, commute, and home morning routines."
        }
      ],
      routine: [
        {
          phase: "Phase 1 (Days 1–7)",
          title: "Manual-to-Acoustic Transition",
          desc: "Shift from manual abrasive scrubbing to effortless acoustic glide. Let the 32,000 VPM motor do the work."
        },
        {
          phase: "Phase 2 (Days 8–14)",
          title: "Travel Rhythm Lock-In",
          desc: "Establish a 2-minute morning & evening quad-pacer rhythm anywhere you commute or travel."
        },
        {
          phase: "Phase 3 (Days 15–28)",
          title: "Effortless Minimalist Care",
          desc: "Enjoy pristine oral hygiene with zero bathroom countertop wire clutter or travel luggage weight."
        }
      ]
    },

    couple_bundle: {
      id: "couple_bundle",
      model: "x2",
      badgeText: "100% Comprehensive Match",
      pillClass: "quiz-pill-badge",
      title: "Brush X2 Duo Bundle (Set of 2)",
      subtitle: "Complete 2-Person Precision Set + 2x Free DuPont Heads",
      price: "£128",
      priceNumber: 128,
      comparePrice: "£278",
      comparePriceNumber: 278,
      saveText: "SAVE £150 (54% OFF)",
      image: PRODUCT_ASSETS.x2.silver,
      isBundle: true,
      ctaText: "Add Duo Set + Free Heads to Cart · £128",
      bullets: [
        {
          strong: "2x Brush X2 Aerospace Sonic Toothbrushes:",
          text: "Two precision instruments (Silver & Pink / Grey combinations) for complete household oral wellness."
        },
        {
          strong: "2x Free DuPont Replacement Brush Heads:",
          text: "Includes 2 complimentary DuPont micro-diamond brush heads (£15 value) added free in box."
        },
        {
          strong: "Dual 90+ Day Endurance:",
          text: "Charge each brush only 4 times per year across the entire household with universal USB-C."
        },
        {
          strong: "Independent Halo Pressure Rings:",
          text: "Dedicated red halo sensors ensure personalised pressure feedback tailored to each user's gumline."
        }
      ],
      routine: [
        {
          phase: "Phase 1 (Days 1–7)",
          title: "Dual Station Setup",
          desc: "Mount the dual magnetic wall docks for a sleek, wire-free bathroom sanctuary for two."
        },
        {
          phase: "Phase 2 (Days 8–14)",
          title: "Bespoke Preset Customisation",
          desc: "Each user personalises their preferred mode (Soft, Clean, or Whitening) to match their oral profile."
        },
        {
          phase: "Phase 3 (Days 15–28)",
          title: "Shared Oral Vitality",
          desc: "Synchronised 2-minute quad-pacer compliance and automated 90-day brush head replacement hygiene."
        }
      ]
    }
  };

  // State
  const state = {
    currentStep: 1,
    selections: {
      goal: "",
      currentBrush: "",
      sensitivity: "",
      lifestyle: "",
      finish: ""
    },
    selectedColor: "Silver",
    matchedProfile: null,
    isCalculating: false,
    isComplete: false
  };

  // DOM Query Helpers
  const $ = (selector, parent) => (parent || document).querySelector(selector);
  const $$ = (selector, parent) => Array.from((parent || document).querySelectorAll(selector));

  /**
   * Save State to Session Storage
   */
  function persistState() {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
        currentStep: state.currentStep,
        selections: state.selections,
        selectedColor: state.selectedColor,
        isComplete: state.isComplete
      }));
    } catch (_) {}
  }

  /**
   * Restore State from Session Storage
   */
  function restoreState() {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === "object" && parsed.selections) {
          state.selections = Object.assign({}, state.selections, parsed.selections);
          if (typeof parsed.selectedColor === "string") state.selectedColor = parsed.selectedColor;
          if (typeof parsed.isComplete === "boolean") state.isComplete = parsed.isComplete;
          if (typeof parsed.currentStep === "number" && parsed.currentStep >= 1 && parsed.currentStep <= TOTAL_STEPS) {
            state.currentStep = parsed.currentStep;
          }
        }
      }
    } catch (_) {}
  }

  /**
   * Step Key Mapping for State
   */
  function getStepKey(stepNumber) {
    switch (stepNumber) {
      case 1: return "goal";
      case 2: return "currentBrush";
      case 3: return "sensitivity";
      case 4: return "lifestyle";
      case 5: return "finish";
      default: return "goal";
    }
  }

  /**
   * Update Progress Bar & Counter Text
   */
  function updateProgress() {
    const stepNum = state.currentStep;
    const progressPercent = Math.round((stepNum / TOTAL_STEPS) * 100);

    // Update Progress Bars
    const progressBars = $$(".quiz-progress-fill, .quiz-progress__bar, [data-quiz-progress-bar], #quiz-progress-bar");
    progressBars.forEach((bar) => {
      bar.style.width = `${progressPercent}%`;
      bar.setAttribute("aria-valuenow", String(progressPercent));
    });

    // Update Step Counters
    const stepBadges = $$(".quiz-progress-meta .step-badge, [data-quiz-step-badge], #quiz-step-badge, .quiz-step-counter, #quiz-step-label, .quiz-step-indicator");
    stepBadges.forEach((badge) => {
      badge.textContent = `Step ${stepNum} of ${TOTAL_STEPS}`;
    });

    // Update Progress Percent Labels
    const percentLabels = $$("[data-quiz-progress-percent], #quiz-progress-percent, .quiz-progress-percent");
    percentLabels.forEach((label) => {
      label.textContent = `${progressPercent}% Completed`;
    });
  }

  /**
   * Update Navigation Buttons (Back & Next)
   */
  function updateNavControls() {
    const stepKey = getStepKey(state.currentStep);
    const hasSelection = Boolean(state.selections[stepKey]);

    // Back Buttons (Hide or disable on Step 1)
    const backButtons = $$(".btn-back, .quiz-nav-btn--back, .quiz-back-btn, [data-quiz-prev], #quiz-prev-btn");
    backButtons.forEach((btn) => {
      if (state.currentStep <= 1) {
        btn.style.opacity = "0";
        btn.style.pointerEvents = "none";
        btn.setAttribute("aria-hidden", "true");
        if (btn.tagName === "BUTTON") btn.disabled = true;
      } else {
        btn.style.opacity = "1";
        btn.style.pointerEvents = "auto";
        btn.removeAttribute("aria-hidden");
        if (btn.tagName === "BUTTON") btn.disabled = false;
      }
    });

    // Next / Continue Buttons
    const nextButtons = $$(".quiz-btn-next, .quiz-actions .button--primary, [data-quiz-next], #quiz-next-btn");
    nextButtons.forEach((btn) => {
      if (hasSelection) {
        btn.removeAttribute("disabled");
        btn.disabled = false;
        btn.classList.remove("is-disabled");
        btn.style.opacity = "1";
        btn.style.pointerEvents = "auto";
      } else {
        btn.setAttribute("disabled", "true");
        btn.disabled = true;
        btn.classList.add("is-disabled");
        btn.style.opacity = "0.38";
        btn.style.pointerEvents = "none";
      }

      // Update CTA text on Step 5
      const textSpan = btn.querySelector(".btn-text") || btn;
      if (state.currentStep === TOTAL_STEPS) {
        textSpan.textContent = "See My Personalised Routine →";
      } else {
        textSpan.textContent = "Continue →";
      }
    });
  }

  /**
   * Activate DOM Step Container
   */
  function renderActiveStep() {
    const currentStepNum = state.currentStep;

    // Hide all steps
    const stepContainers = $$(".quiz-step, [data-quiz-step], [data-step]");
    stepContainers.forEach((el) => {
      el.classList.remove("is-active", "active");
      el.style.display = "none";
    });

    // Reveal target step
    const targetStep = $(`[data-quiz-step="${currentStepNum}"], [data-step="${currentStepNum}"], #quiz-step-${currentStepNum}, .quiz-step:nth-of-type(${currentStepNum})`);
    if (targetStep) {
      targetStep.style.display = "block";
      // Force reflow for animation restart
      void targetStep.offsetWidth;
      targetStep.classList.add("is-active", "active");
    }

    // Restore selected card styling for this step
    const stepKey = getStepKey(currentStepNum);
    const selectedVal = state.selections[stepKey];

    const currentCards = targetStep ? $$(".quiz-option-card, .quiz-option, [data-option-value]", targetStep) : [];
    currentCards.forEach((card) => {
      const cardVal = card.getAttribute("data-option-value") || card.getAttribute("data-value") || card.dataset.value || "";
      if (cardVal && cardVal === selectedVal) {
        card.classList.add("is-selected", "selected");
        card.setAttribute("aria-checked", "true");
      } else {
        card.classList.remove("is-selected", "selected");
        card.setAttribute("aria-checked", "false");
      }
    });

    // Hide loading & results if moving between steps
    const calculatingEl = $(".quiz-calculating, #quiz-calculating, [data-quiz-calculating]");
    if (calculatingEl) {
      calculatingEl.style.display = "none";
      calculatingEl.classList.remove("is-active");
    }

    const resultsEl = $(".quiz-results, #quiz-results, [data-quiz-results]");
    if (resultsEl) {
      resultsEl.style.display = "none";
      resultsEl.classList.remove("is-active");
    }

    const quizForm = $("#quiz-form", document);
    if (quizForm) quizForm.style.display = "block";
    const progressWrap = $("#quiz-progress-wrapper, .quiz-progress", document);
    if (progressWrap) progressWrap.style.display = "block";

    updateProgress();
    updateNavControls();
    persistState();
  }

  /**
   * Handle Option Selection
   */
  function handleOptionSelect(cardEl, stepNum) {
    if (!cardEl) return;

    const currentStepNum = stepNum || state.currentStep;
    const stepKey = getStepKey(currentStepNum);
    const radio = cardEl.querySelector("input[type=radio]");
    const value = (radio ? radio.value : "") || cardEl.getAttribute("data-option-id") || cardEl.getAttribute("data-option-value") || cardEl.getAttribute("data-value") || cardEl.dataset.value || "";

    if (radio) {
      radio.checked = true;
    }

    // Store selection
    state.selections[stepKey] = value;

    // Visual tactile active states
    const stepContainer = cardEl.closest(".quiz-step, [data-quiz-step], [data-step]") || document;
    const siblingCards = $$(".quiz-option-card, .quiz-option, [data-option-value]", stepContainer);

    siblingCards.forEach((card) => {
      card.classList.remove("is-selected", "selected");
      card.setAttribute("aria-checked", "false");
    });

    cardEl.classList.add("is-selected", "selected");
    cardEl.setAttribute("aria-checked", "true");

    // Tactile micro-haptic animation
    cardEl.style.transform = "scale(0.985)";
    setTimeout(() => {
      cardEl.style.transform = "";
    }, 120);

    updateNavControls();
    persistState();
  }

  /**
   * Go to Next Step
   */
  function goNextStep() {
    const stepKey = getStepKey(state.currentStep);
    if (!state.selections[stepKey]) {
      return; // Selection required
    }

    if (state.currentStep < TOTAL_STEPS) {
      state.currentStep += 1;
      renderActiveStep();
    } else {
      // Finished Step 5 -> Run Profile Algorithm & Calculate Results
      runPersonalisationEngine();
    }
  }

  /**
   * Go to Previous Step
   */
  function goPrevStep() {
    if (state.isComplete) {
      retakeQuiz();
      return;
    }

    if (state.currentStep > 1) {
      state.currentStep -= 1;
      renderActiveStep();
    }
  }

  /**
   * Jump to Specific Step
   */
  function goToStep(stepNum) {
    if (stepNum >= 1 && stepNum <= TOTAL_STEPS) {
      state.currentStep = stepNum;
      renderActiveStep();
    }
  }

  /**
   * Personalisation Algorithm & Profile Matching Engine
   * Matches answers to Profile 1, 2, 3, or 4
   */
  function evaluateProfile(selections) {
    const { goal = "", currentBrush = "", sensitivity = "", lifestyle = "", finish = "" } = selections;
    const rawAll = `${goal} ${currentBrush} ${sensitivity} ${lifestyle} ${finish}`.toLowerCase();

    // Profile 4: Household / Couple Precision Set (Set of 2 + Free Heads)
    if (
      finish === "bundle-two" ||
      finish.includes("bundle") ||
      finish.includes("two") ||
      finish.includes("couple") ||
      rawAll.includes("bundle")
    ) {
      return PROFILES.couple_bundle;
    }

    // Profile 3: Ultralight Minimalist & Travel (X1 Essential £59)
    const isTravelOrDaily = goal === "daily-routine" || lifestyle === "frequent-travel" || rawAll.includes("travel") || rawAll.includes("minimalist");
    const isManualUpgrade = currentBrush === "manual" || rawAll.includes("manual");
    const hasSevereGumIssue = sensitivity === "heavy-sensitive" || rawAll.includes("bleeding");

    if (isTravelOrDaily && isManualUpgrade && !hasSevereGumIssue) {
      return PROFILES.travel_minimalist;
    }

    // Profile 2: Stain Defense & Whitening Polish (X2 Flagship £69)
    const isStainFocus = goal === "brighten-enamel" || rawAll.includes("bright") || rawAll.includes("stain");
    if (isStainFocus && !hasSevereGumIssue) {
      return PROFILES.stain_defense;
    }

    // Profile 1: Gum Defense & Precision Sweep (X2 Flagship £69 - Default)
    return PROFILES.gum_defense;
  }

  /**
   * Run Personalisation Engine & Loading State Simulation
   */
  function runPersonalisationEngine() {
    state.isCalculating = true;
    state.isComplete = false;

    // Evaluate matching profile
    const matched = evaluateProfile(state.selections);
    state.matchedProfile = matched;

    // Determine initial color based on selection if user chose a specific color in Step 5
    const finishVal = (state.selections.finish || "").toLowerCase();
    if (finishVal.includes("pink") || finishVal.includes("rose")) {
      state.selectedColor = "Pink";
    } else if (finishVal.includes("grey") || finishVal.includes("gray")) {
      state.selectedColor = "Grey";
    } else {
      state.selectedColor = "Silver";
    }

    // Hide form & progress tracker during calculation
    const quizForm = $("#quiz-form", document);
    if (quizForm) quizForm.style.display = "none";
    const progressWrap = $("#quiz-progress-wrapper, .quiz-progress", document);
    if (progressWrap) progressWrap.style.display = "none";

    // Show calculating loader
    const calculatingEl = $(".quiz-calculating, #quiz-calculating, [data-quiz-calculating]");
    if (calculatingEl) {
      calculatingEl.style.display = "block";
      calculatingEl.classList.add("is-active");

      // Reset checklist
      const checklistItems = $$(".quiz-analysis-item", calculatingEl);
      checklistItems.forEach((item) => {
        item.classList.remove("is-active", "is-done");
      });

      // Animate checklist sequentially
      CHECKLIST_STEPS.forEach(({ delay, index }) => {
        setTimeout(() => {
          if (checklistItems[index]) {
            checklistItems[index].classList.add("is-active");
          }
          if (index > 0 && checklistItems[index - 1]) {
            checklistItems[index - 1].classList.remove("is-active");
            checklistItems[index - 1].classList.add("is-done");
          }
        }, delay);
      });
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });

    // After calculation delay (1.2s), reveal results
    setTimeout(() => {
      state.isCalculating = false;
      state.isComplete = true;

      // Mark all checklist items done
      const checklistItems = $$(".quiz-analysis-item", calculatingEl);
      checklistItems.forEach((item) => {
        item.classList.remove("is-active");
        item.classList.add("is-done");
      });

      if (calculatingEl) {
        calculatingEl.style.display = "none";
        calculatingEl.classList.remove("is-active");
      }

      renderResults(matched);
      dispatchCompletionEvents(matched);
      persistState();
    }, CALCULATION_DURATION_MS);
  }

  /**
   * Render Results Screen
   */
  function renderResults(profile) {
    const resultsEl = $(".quiz-results, #quiz-results, [data-quiz-results]");
    if (!resultsEl) return;

    resultsEl.style.display = "block";
    resultsEl.classList.add("is-active");

    // Hide form & progress tracker while showing results
    const quizForm = $("#quiz-form", document);
    if (quizForm) quizForm.style.display = "none";
    const progressWrap = $("#quiz-progress-wrapper, .quiz-progress", document);
    if (progressWrap) progressWrap.style.display = "none";

    // 1. Match Badge & Score
    const badgeEl = $("#results-badge, .quiz-pill-badge, [data-quiz-badge-pill]", resultsEl);
    if (badgeEl) {
      badgeEl.textContent = profile.badgeText.toUpperCase() + " · " + (profile.id === "gum_defense" ? "GUM DEFENSE & PRECISION SWEEP" : (profile.id === "stain_defense" ? "ENAMEL BRIGHTENING & STAIN-LIFT" : (profile.id === "travel_minimalist" ? "ULTRALIGHT TRAVEL & MINIMALIST" : "DUO HOUSEHOLD PRECISION PROTOCOL")));
    }

    // 2. Product Title & Subtitle
    const titleEl = $("#matched-model-name, .quiz-recommendation-details h3, #quiz-result-title, [data-quiz-result-title]", resultsEl);
    if (titleEl) titleEl.textContent = profile.title;

    const headlineEl = $("#results-headline", resultsEl);
    if (headlineEl) headlineEl.textContent = "Your Calibrated " + profile.title + " Routine";

    const summaryEl = $("#results-summary", resultsEl);
    if (summaryEl) summaryEl.textContent = "Based on your diagnostic profile, we have calibrated your acoustic speed, bristle motion, and pressure feedback for optimal oral wellness.";

    const subtitleEl = $("#matched-tagline, .quiz-recommendation-details .quiz-subtitle, #quiz-result-subtitle, [data-quiz-result-subtitle]", resultsEl);
    if (subtitleEl) subtitleEl.textContent = profile.subtitle;

    const eyebrowEl = $("#matched-eyebrow", resultsEl);
    if (eyebrowEl) eyebrowEl.textContent = profile.isBundle ? "DUO HOUSEHOLD PROTOCOL" : (profile.model === "x1" ? "ESSENTIAL ACOUSTIC INSTRUMENT" : "FLAGSHIP ACOUSTIC INSTRUMENT");

    const colorBadgeEl = $("#matched-color-badge", resultsEl);
    if (colorBadgeEl) colorBadgeEl.textContent = state.selectedColor || "Matte Silver";

    // 3. Product Visual Image
    const visualImg = $("#matched-product-img, .quiz-recommendation-visual img, #quiz-result-image, [data-quiz-result-image]", resultsEl);
    if (visualImg) {
      const activeColorKey = (state.selectedColor || "silver").toLowerCase();
      const modelKey = profile.model === "x1" ? "x1" : "x2";
      const resolvedSrc = PRODUCT_ASSETS[modelKey][activeColorKey] || profile.image;

      visualImg.src = resolvedSrc;
      visualImg.alt = `${profile.title} - ${state.selectedColor}`;
    }

    // 4. Pricing Row
    const priceCurrEl = $("#matched-price, .quiz-price-current, #quiz-result-price, [data-quiz-result-price]", resultsEl);
    if (priceCurrEl) priceCurrEl.textContent = profile.price;

    const priceCompEl = $("#matched-compare-price, .quiz-price-compare, #quiz-result-compare, [data-quiz-result-compare]", resultsEl);
    if (priceCompEl) priceCompEl.textContent = profile.comparePrice;

    const priceSaveEl = $("#matched-discount-tag, .quiz-price-save, #quiz-result-save, [data-quiz-result-save]", resultsEl);
    if (priceSaveEl) priceSaveEl.textContent = profile.saveText;

    // 5. Diagnostics breakdown updates
    const diagPriority = $("#diag-priority", resultsEl);
    if (diagPriority) {
      if (profile.id === "gum_defense") diagPriority.textContent = "Gumline Biofilm Defence & Sensitivity";
      else if (profile.id === "stain_defense") diagPriority.textContent = "Tannin Lifting & Natural Enamel Polish";
      else if (profile.id === "travel_minimalist") diagPriority.textContent = "Ultralight Daily Acoustic Habituation";
      else diagPriority.textContent = "Dual Household Oral Health Alignment";
    }

    // 6. Specs / Rationale Bullets
    profile.bullets.forEach((b, idx) => {
      const benefitSpan = $(`#benefit-${idx + 1}`, resultsEl);
      if (benefitSpan) {
        benefitSpan.innerHTML = `<strong>${b.strong}</strong> ${b.text}`;
      }
    });

    // 7. Primary CTA Buttons
    const ctaButtons = $$("#quiz-primary-cta, #quiz-bottom-cta, .quiz-results-cta-wrap .button--primary, #quiz-cta-btn, [data-quiz-cta]", resultsEl);
    ctaButtons.forEach((btn) => {
      const textSpan = btn.querySelector(".btn-text") || btn;
      textSpan.textContent = profile.ctaText + " →";
      btn.onclick = (e) => {
        e.preventDefault();
        handleAddToCart(profile);
      };
    });

    // 8. Retake Quiz Buttons
    const retakeButtons = $$("#quiz-retake-btn, .quiz-retake-btn, [data-quiz-retake]", resultsEl);
    retakeButtons.forEach((btn) => {
      btn.onclick = (e) => {
        e.preventDefault();
        retakeQuiz();
      };
    });

    // 9. Color Swatch Click Handlers (if present in results DOM)
    const swatches = $$("[data-quiz-swatch]", resultsEl);
    swatches.forEach((swatch) => {
      swatch.onclick = () => {
        const colorName = swatch.getAttribute("data-quiz-swatch") || "Silver";
        state.selectedColor = colorName;

        swatches.forEach((s) => s.classList.remove("is-active", "active"));
        swatch.classList.add("is-active", "active");

        // Swap visual image
        if (visualImg) {
          const modelKey = profile.model === "x1" ? "x1" : "x2";
          const colorKey = colorName.toLowerCase();
          const newSrc = PRODUCT_ASSETS[modelKey][colorKey] || profile.image;
          visualImg.src = newSrc;
        }
        persistState();
      };
    });

    // Update sticky mobile bar if applicable
    const stickyCta = $(".quiz-sticky-action-bar .button--primary, #quiz-sticky-cta", document);
    if (stickyCta) {
      const textSpan = stickyCta.querySelector(".btn-text") || stickyCta;
      textSpan.textContent = profile.ctaText;
      stickyCta.onclick = (e) => {
        e.preventDefault();
        handleAddToCart(profile);
      };
    }
  }

  /**
   * Cart & PlusBase Checkout Bridge Integration
   */
  function handleAddToCart(profile) {
    const isBundle = Boolean(profile.isBundle);
    const isX1 = profile.model === "x1";
    const selectedColor = state.selectedColor || "Silver";

    const modelKey = isX1 ? "x1" : "x2";
    const colorKey = selectedColor.toLowerCase();
    const resolvedImage = PRODUCT_ASSETS[modelKey][colorKey] || profile.image;

    // Construct Cart Item matching MirooooCart architecture
    const cartItem = {
      id: isBundle ? "miroooo-x2-2" : (isX1 ? "miroooo-x-1" : "miroooo-x2-1"),
      productId: isX1 ? "1000000675113473" : "1000000664011618",
      productHandle: isX1 ? "miroooo-x" : "miroooo-x2",
      title: isBundle ? "Brush X2 (Buy 2)" : (isX1 ? `Brush X1 (${selectedColor})` : `Brush X2 (${selectedColor})`),
      quantity: 1,
      bundleCount: isBundle ? 2 : 1,
      choices: isBundle ? ["Silver", "Pink"] : [selectedColor],
      color: selectedColor,
      unitPrice: profile.priceNumber,
      comparePrice: profile.comparePriceNumber,
      image: resolvedImage,
      unlockedGifts: isBundle ? 2 : 0
    };

    // 1. If global MirooooCart exists, use standard add item and drawer flow
    if (window.MirooooCart && typeof window.MirooooCart.addItem === "function") {
      window.MirooooCart.addItem(cartItem);
      return;
    }

    // 2. Direct PlusBase / Product Route Fallback
    const targetUrl = isX1 ? "/products/miroooo-x" : "/products/miroooo-x2";
    window.location.href = targetUrl;
  }

  /**
   * Dispatch Klaviyo & Microsoft Ads Tracking Events
   */
  function dispatchCompletionEvents(profile) {
    const detailPayload = {
      matchedModel: profile.model,
      profile: profile.title,
      profileKey: profile.id,
      price: profile.priceNumber,
      answers: Object.assign({}, state.selections)
    };

    // Dispatch DOM Custom Events for listeners in site.js / klaviyo.js
    window.dispatchEvent(new CustomEvent("miroooo:dentalcare-quiz-completed", { detail: detailPayload }));
    window.dispatchEvent(new CustomEvent("dentalcare-quiz:completed", { detail: detailPayload }));
    window.dispatchEvent(new CustomEvent("miroooo:quiz-completed", { detail: detailPayload }));

    // Direct Klaviyo API trigger if present
    if (window.__mirooooKlaviyo && typeof window.__mirooooKlaviyo.trackQuizCompleted === "function") {
      window.__mirooooKlaviyo.trackQuizCompleted(detailPayload);
    }
  }

  /**
   * Retake Quiz (Clean State Reset)
   */
  function retakeQuiz() {
    state.currentStep = 1;
    state.selections = {
      goal: "",
      currentBrush: "",
      sensitivity: "",
      lifestyle: "",
      finish: ""
    };
    state.selectedColor = "Silver";
    state.matchedProfile = null;
    state.isCalculating = false;
    state.isComplete = false;

    // Clear Storage
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (_) {}

    // Uncheck all radio inputs
    $$("input[type=radio]", document).forEach((r) => {
      r.checked = false;
    });

    // Deselect all cards
    $$(".quiz-option-card, .quiz-option, [data-option-value]").forEach((card) => {
      card.classList.remove("is-selected", "selected");
      card.setAttribute("aria-checked", "false");
    });

    renderActiveStep();
  }

  /**
   * Bind DOM Event Handlers
   */
  function bindEvents() {
    // 1. Option Card Click Delegation
    document.addEventListener("click", (e) => {
      const card = e.target.closest(".quiz-option-card, .quiz-option, [data-option-value]");
      if (card) {
        const stepContainer = card.closest(".quiz-step, [data-quiz-step], [data-step]");
        const stepNum = stepContainer ? parseInt(stepContainer.getAttribute("data-quiz-step") || stepContainer.getAttribute("data-step") || state.currentStep, 10) : state.currentStep;
        handleOptionSelect(card, stepNum);
        return;
      }

      // Next / Continue button click
      const nextBtn = e.target.closest(".quiz-btn-next, [data-quiz-next], #quiz-next-btn");
      if (nextBtn && !nextBtn.disabled) {
        e.preventDefault();
        goNextStep();
        return;
      }

      // Prev / Back button click
      const backBtn = e.target.closest(".btn-back, .quiz-nav-btn--back, .quiz-back-btn, [data-quiz-prev], #quiz-prev-btn");
      if (backBtn && !backBtn.disabled) {
        e.preventDefault();
        goPrevStep();
        return;
      }

      // Reset / Retake button click
      const resetOrRetakeBtn = e.target.closest(".quiz-reset-btn, #quiz-reset-btn, [data-quiz-reset], .quiz-retake-btn, #quiz-retake-btn, [data-quiz-retake]");
      if (resetOrRetakeBtn) {
        e.preventDefault();
        retakeQuiz();
        return;
      }
    });

    // 2. Keyboard Navigation (Enter or Space on options)
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        const card = document.activeElement && document.activeElement.closest(".quiz-option-card, .quiz-option, [data-option-value]");
        if (card) {
          e.preventDefault();
          const stepContainer = card.closest(".quiz-step, [data-quiz-step], [data-step]");
          const stepNum = stepContainer ? parseInt(stepContainer.getAttribute("data-quiz-step") || stepContainer.getAttribute("data-step") || state.currentStep, 10) : state.currentStep;
          handleOptionSelect(card, stepNum);
        }
      }
    });
  }

  /**
   * Initialize Engine
   */
  function init() {
    restoreState();
    bindEvents();
    if (state.isComplete) {
      const matched = state.matchedProfile || evaluateProfile(state.selections);
      state.matchedProfile = matched;
      renderResults(matched);
    } else {
      renderActiveStep();
    }
  }

  // Auto-init on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Expose API for external modules or tests
  window.MirooooDentalcareQuiz = {
    init,
    getState: () => Object.assign({}, state),
    goToStep,
    goNextStep,
    goPrevStep,
    retake: retakeQuiz,
    evaluateProfile,
    handleOptionSelect,
    PROFILES
  };
})();
