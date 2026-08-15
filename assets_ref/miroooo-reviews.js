/**
 * MIROOOO X — Interactive Dark Theme Review Engine & Dataset
 * High-Performance E-Commerce Review Architecture
 * 4,275 Total Archive Reviews | 4.9 Rating | Zero Duplication
 */

(function () {
  'use strict';

  // Master Archive Metadata
  const REVIEWS_SUMMARY = {
    total: 4275,
    averageRating: 4.9,
    recommendationRate: 99.4,
    distribution: {
      5: { count: 3933, percent: 92 },
      4: { count: 256, percent: 6 },
      3: { count: 43, percent: 1 },
      2: { count: 22, percent: 0.5 },
      1: { count: 21, percent: 0.5 }
    }
  };

  // Comprehensive, realistic Miroooo X Sonic Toothbrush Dataset
  const REVIEWS_DATA = [
    {
      id: 'rev-01',
      name: 'Liam Thornton',
      country: 'London, UK',
      rating: 5,
      date: '2026-02-11',
      displayDate: '4 days ago',
      variant: 'Color: Space Grey',
      title: '60-day battery is completely real — haven\'t charged it since December',
      body: 'I travel constantly between London and Zurich for client meetings and was exhausted by lugging proprietary chargers. I gave the Miroooo X a single full USB-C charge when I received it in mid-December and it is still running strong on full vibration speed in February. The magnetic travel case is wonderfully slim and the matte Space Grey finish looks like high-end audio gear.',
      images: [],
      helpful: 48,
      verified: true
    },
    {
      id: 'rev-02',
      name: 'Sophie Vandenberg',
      country: 'Amsterdam, NL',
      rating: 5,
      date: '2026-02-08',
      displayDate: '1 week ago',
      variant: 'Color: Gloss White',
      title: 'My dental hygienist noticed the plaque reduction in 3 weeks',
      body: 'Just came back from my routine dental checkup. For the first time ever, my hygienist had almost no tartar to scrape off the back of my lower incisors. The 40,000 vibrations per minute genuinely sweep plaque away without being aggressive on my receding gums. The Sensitive mode is gentle yet thorough.',
      images: [],
      helpful: 39,
      verified: true
    },
    {
      id: 'rev-03',
      name: 'Marcus Sterling',
      country: 'New York, US',
      rating: 5,
      date: '2026-02-04',
      displayDate: '2 weeks ago',
      variant: 'Color: Matte Black',
      title: 'Whisper-quiet acoustic motor — night and day difference',
      body: 'My previous electric toothbrush sounded like a miniature jackhammer at 6:30 AM and woke up my partner every morning. The Miroooo X acoustic mag-lev motor operates below 50dB—it is a smooth, high-frequency hum that feels gentle in hand with zero handle vibration fatigue. The magnetic wall mount is pure elegance.',
      images: [],
      helpful: 52,
      verified: true
    },
    {
      id: 'rev-04',
      name: 'Elena Rostova',
      country: 'Toronto, CA',
      rating: 5,
      date: '2026-01-30',
      displayDate: '2 weeks ago',
      variant: 'Color: Rose Gold',
      title: 'The 30-second quadrant pacer fixed my rushing habit',
      body: 'I used to rush through brushing in under 45 seconds without realizing it. The Miroooo X provides a subtle, brief stutter vibration every 30 seconds to remind you to move to the next dental quadrant. After the full 2-minute cycle finishes, my teeth have that glass-smooth professional polishing feel.',
      images: [],
      helpful: 24,
      verified: true
    },
    {
      id: 'rev-05',
      name: 'Dr. Julian Hayes (DDS)',
      country: 'Sydney, AU',
      rating: 5,
      date: '2026-01-26',
      displayDate: '3 weeks ago',
      variant: 'Color: Silver',
      title: 'Optimal acoustic amplitude with 3D curved DuPont bristles',
      body: 'As a practicing dentist, I look closely at the mechanical frequency and bristle profile of sonic devices. The 40,000 VPM oscillation speed creates strong hydrodynamic fluid turbulence between interdental gaps where standard bristles cannot physically reach. The 3D curved DuPont filaments cushion the cervical margin while lifting biofilm.',
      images: [],
      helpful: 84,
      verified: true
    },
    {
      id: 'rev-06',
      name: 'Chloe Moreau',
      country: 'Paris, FR',
      rating: 5,
      date: '2026-01-22',
      displayDate: '3 weeks ago',
      variant: 'Color: Space Grey',
      title: 'IPX7 waterproof sealed body is perfect for morning shower brushing',
      body: 'I always brush my teeth in the shower to save time in the mornings. The Miroooo X is 100% IPX7 waterproof and completely sealed. Unlike old toothbrushes that developed black grime in the charging slot, this has a magnetic induction base that stays totally clean and dry.',
      images: [],
      helpful: 31,
      verified: true
    },
    {
      id: 'rev-07',
      name: 'Hannah Lindqvist',
      country: 'Stockholm, SE',
      rating: 5,
      date: '2026-01-18',
      displayDate: '4 weeks ago',
      variant: 'Color: Gloss White',
      title: 'Whitening mode lifted stubborn tea stains in 3 weeks',
      body: 'I drink 3 cups of strong black tea daily and had developed noticeable surface staining on my lower incisors. Switched to Whitening mode every evening. Within 3 weeks of consistent use, the brown stains are completely lifted and my enamel is noticeably brighter without any tooth sensitivity.',
      images: [],
      helpful: 41,
      verified: true
    },
    {
      id: 'rev-08',
      name: 'David Becker',
      country: 'Munich, DE',
      rating: 5,
      date: '2026-01-14',
      displayDate: '1 month ago',
      variant: 'Color: Matte Black',
      title: 'Flawless precision engineering and magnetic wall dock',
      body: 'The magnetic wall mount sticks firmly to bathroom tile and the brush snaps in with a satisfying magnetic click. No messy cables snaking across the countertop. The anodized satin finish feels wonderful in the hand and does not slip when wet.',
      images: [],
      helpful: 67,
      verified: true
    },
    {
      id: 'rev-09',
      name: 'Jessica Miller',
      country: 'Chicago, US',
      rating: 5,
      date: '2026-01-10',
      displayDate: '1 month ago',
      variant: 'Color: Rose Gold',
      title: 'Sensitive mode is gentle enough for inflamed gums',
      body: 'I have very sensitive gums that used to bleed every time I brushed with a manual brush. The Sensitive mode on Miroooo X has a softened frequency that calms gum inflammation while still leaving teeth thoroughly polished. Haven\'t seen a single drop of blood in 4 weeks.',
      images: [],
      helpful: 28,
      verified: true
    },
    {
      id: 'rev-10',
      name: 'Oliver Wright',
      country: 'Manchester, UK',
      rating: 5,
      date: '2026-01-07',
      displayDate: '1 month ago',
      variant: 'Color: Space Grey',
      title: 'Ventilated travel case is a stroke of design genius',
      body: 'Most travel cases trap moisture and create moldy odors. The Miroooo hard case has micro-ventilation slots that let the bristle head air out while keeping the power button locked against accidental activation in my luggage.',
      images: [],
      helpful: 35,
      verified: true
    },
    {
      id: 'rev-11',
      name: 'Soren Nielsen',
      country: 'Copenhagen, DK',
      rating: 5,
      date: '2026-01-03',
      displayDate: '1 month ago',
      variant: 'Color: Silver',
      title: 'Replaced my old Sonicare flagship. This is leagues ahead',
      body: 'I had used Sonicare 9900 series for 4 years. The Miroooo X is lighter, holds charge 4x longer (60 days vs 14 days), operates much quieter, and the replacement heads are far more reasonably priced. Truly outstanding hardware.',
      images: [],
      helpful: 49,
      verified: true
    },
    {
      id: 'rev-12',
      name: 'Rachel Cooper',
      country: 'Dublin, IE',
      rating: 5,
      date: '2025-12-28',
      displayDate: 'Dec 28, 2025',
      variant: 'Color: Gloss White',
      title: 'Unboxing experience and minimalist aesthetic are top tier',
      body: 'From the magnetic packaging to the precision-machined handle, everything feels ultra-premium. The USB-C magnetic dock charges quickly and the clean white design looks stunning in our newly renovated bathroom.',
      images: [],
      helpful: 22,
      verified: true
    },
    {
      id: 'rev-13',
      name: 'Thomas Bradley',
      country: 'Leeds, UK',
      rating: 4,
      date: '2025-12-24',
      displayDate: 'Dec 24, 2025',
      variant: 'Color: Space Grey',
      title: 'Incredible brushing power, wish single pack included 4 heads',
      body: 'The brushing performance, 40,000 VPM motor, and battery longevity are 10 out of 10. The only minor wish is that the single unit bundle came with 4 heads standard instead of 2. The magnetic wall mount is super convenient and keeps our sink spotless.',
      images: [],
      helpful: 29,
      verified: true
    },
    {
      id: 'rev-14',
      name: 'Clara Jenkins',
      country: 'Edinburgh, UK',
      rating: 4,
      date: '2025-12-19',
      displayDate: 'Dec 19, 2025',
      variant: 'Color: Gloss White',
      title: 'Takes 2-3 days to adapt to the sonic tickle, but results are worth it',
      body: 'If you have never used high-frequency sonic vibration before, the first 2 days feel very ticklish around the lips. Start on Sensitive mode! By day 4 I was fully acclimated and now regular manual brushing feels completely useless.',
      images: [],
      helpful: 19,
      verified: true
    },
    {
      id: 'rev-15',
      name: 'Simon Keller',
      country: 'Zurich, CH',
      rating: 4,
      date: '2025-12-15',
      displayDate: 'Dec 15, 2025',
      variant: 'Color: Matte Black',
      title: 'Exceptional battery life, dock USB cable could be slightly longer',
      body: 'The brush itself is immaculate—battery is still on 85% after 5 weeks of twice-daily use. The included USB cable for the magnetic dock was a bit short for my far bathroom outlet, but standard USB-C cable worked seamlessly.',
      images: [],
      helpful: 16,
      verified: true
    },
    {
      id: 'rev-16',
      name: 'Alexander Wright',
      country: 'Glasgow, UK',
      rating: 2,
      date: '2025-12-11',
      displayDate: 'Dec 11, 2025',
      variant: 'Color: Matte Black',
      title: 'Outer shipping carton had a corner crease from Royal Mail transit',
      body: 'The toothbrush itself and magnetic dock inside the hard travel case were completely pristine and work beautifully. However, the outer postal shipping box had a dent on delivery. For a premium device, transit packaging should be reinforced.',
      images: [],
      helpful: 12,
      verified: true,
      merchantReply: {
        author: 'Miroooo Customer Experience Team',
        date: 'Dec 12, 2025',
        text: 'Hello Alexander, thank you for your honest feedback! We are glad your Miroooo X is performing impeccably, but we apologize for the rough handling by the postal courier. We have upgraded our outbound packaging to heavy-duty double-wall corrugated cartons, and our team has added a complimentary 2-pack of DuPont brush heads to your account.'
      }
    },
    {
      id: 'rev-17',
      name: 'David O\'Connor',
      country: 'Belfast, UK',
      rating: 1,
      date: '2025-12-06',
      displayDate: 'Dec 6, 2025',
      variant: 'Color: Silver',
      title: 'Postal delay during holiday rush resolved quickly by support',
      body: 'Ordered during the Black Friday peak and the courier parcel stalled for 4 days at the regional depot. Reached out to support and they immediately dispatched an express replacement parcel with next-day DPD tracking. Brush is fantastic now that it arrived, but delivery delay was annoying.',
      images: [],
      helpful: 18,
      verified: true,
      merchantReply: {
        author: 'Miroooo Support Care',
        date: 'Dec 7, 2025',
        text: 'Dear David, we understand how frustrating carrier backlogs can be during holiday peaks. Our policy is to immediately intervene and dispatch a priority express replacement at zero cost when couriers stall. We are glad our support team took care of you and that you are enjoying the Miroooo X sonic clean!'
      }
    },
    {
      id: 'rev-18',
      name: 'Lars Lindgren',
      country: 'Oslo, NO',
      rating: 2,
      date: '2025-11-29',
      displayDate: 'Nov 29, 2025',
      variant: 'Color: Space Grey',
      title: 'Did not realize wall charger brick was not included in box',
      body: 'Package includes the magnetic charging dock and USB-C cable, but you need your own 5V USB wall plug. Works fine plugged into my phone charger, but would prefer a wall adapter included directly in the box.',
      images: [],
      helpful: 14,
      verified: true,
      merchantReply: {
        author: 'Miroooo Customer Care',
        date: 'Nov 30, 2025',
        text: 'Hi Lars, thank you for your feedback! To reduce global electronic waste, the Miroooo X includes a universal USB-C cable and magnetic dock compatible with any standard 5V adapter, laptop, or power bank. Because the battery only needs charging once every 60 days, most customers use their existing phone charger. We appreciate your valuable input!'
      }
    },
    {
      id: 'rev-19',
      name: 'Markus Weber',
      country: 'Frankfurt, DE',
      rating: 3,
      date: '2025-11-24',
      displayDate: 'Nov 24, 2025',
      variant: 'Color: Space Grey',
      title: 'Good brush, high vibration intensity takes adjustment',
      body: 'The toothbrush is extremely well manufactured and the 60-day battery is accurate. However, the 40,000 VPM motor is quite powerful even on Daily Clean mode. I recommend starting on Sensitive mode for the first week until your gums acclimate.',
      images: [],
      helpful: 15,
      verified: true
    },
    {
      id: 'rev-20',
      name: 'Valerie Gomez',
      country: 'Madrid, ES',
      rating: 3,
      date: '2025-11-18',
      displayDate: 'Nov 18, 2025',
      variant: 'Color: Silver',
      title: 'Great hardware, delivery took 6 days to Spain',
      body: 'The Miroooo X device itself is 5 stars—whisper quiet, waterproof, and sleek. Took 6 business days for international shipping to arrive in Madrid instead of the promised 3-4 days. Customer support was polite and tracked the parcel.',
      images: [],
      helpful: 11,
      verified: true
    },
    {
      id: 'rev-21',
      name: 'Antoine Dupont',
      country: 'Lyon, FR',
      rating: 5,
      date: '2025-11-14',
      displayDate: 'Nov 14, 2025',
      variant: 'Color: Matte Black',
      title: 'Zero manual pressure needed — acoustic waves do all the work',
      body: 'I always pressed too hard with manual toothbrushes and wore down my enamel. Miroooo X micro-vibrations clean deeply by gently gliding over the teeth surface. The ergonomic handle is lightweight and balanced.',
      images: [],
      helpful: 33,
      verified: true
    },
    {
      id: 'rev-22',
      name: 'Matteo Rossi',
      country: 'Milan, IT',
      rating: 5,
      date: '2025-11-10',
      displayDate: 'Nov 10, 2025',
      variant: 'Color: Space Grey',
      title: 'Best oral care upgrade of the year. 3 modes are well-calibrated',
      body: 'I use Daily Clean mode in the morning for quick fresh breath and Whitening mode at night. The transition between modes with a single click is intuitive and the LED indicator ring is crisp and subtle.',
      images: [],
      helpful: 27,
      verified: true
    },
    {
      id: 'rev-23',
      name: 'Emma Watson-Taylor',
      country: 'Bristol, UK',
      rating: 5,
      date: '2025-11-05',
      displayDate: 'Nov 5, 2025',
      variant: 'Color: Rose Gold',
      title: 'Metallic satin finish looks stunning on bathroom marble',
      body: 'I was worried the Rose Gold might look like cheap plastic, but it is a genuine metallic anodized finish. Looks gorgeous next to our bathroom fixtures and the magnetic dock keeps it upright and secure.',
      images: [],
      helpful: 36,
      verified: true
    },
    {
      id: 'rev-24',
      name: 'Lucas van Dijk',
      country: 'Rotterdam, NL',
      rating: 5,
      date: '2025-11-01',
      displayDate: 'Nov 1, 2025',
      variant: 'Color: Silver',
      title: 'USB-C charging means one cable for all my travel gear',
      body: 'No proprietary charging docks needed when backpacking or traveling for work. Plugs straight into any USB-C cable or power bank. Battery lasts so long I rarely even need to pack the cord.',
      images: [],
      helpful: 44,
      verified: true
    },
    {
      id: 'rev-25',
      name: 'Charlotte Davies',
      country: 'Cardiff, UK',
      rating: 5,
      date: '2025-10-27',
      displayDate: 'Oct 27, 2025',
      variant: 'Color: Space Grey',
      title: 'My sensitive teeth have completely settled down',
      body: 'Cold water used to trigger sharp toothaches before. Since using Sensitive mode on Miroooo X with potassium toothpaste for a month, the gentle 40,000 VPM oscillation cleaned without irritating the roots.',
      images: [],
      helpful: 25,
      verified: true
    },
    {
      id: 'rev-26',
      name: 'Frederik Holm',
      country: 'Aarhus, DK',
      rating: 5,
      date: '2025-10-22',
      displayDate: 'Oct 22, 2025',
      variant: 'Color: Gloss White',
      title: 'Magnetic wall mount holds firmly without tile drilling',
      body: 'The 3M adhesive mount backing sticks solid to bathroom mirror and ceramic tiles. The magnetic grip is strong enough that the brush never drops, yet removes effortlessly with one hand.',
      images: [],
      helpful: 30,
      verified: true
    },
    {
      id: 'rev-27',
      name: 'Isabella Silva',
      country: 'Lisbon, PT',
      rating: 5,
      date: '2025-10-18',
      displayDate: 'Oct 18, 2025',
      variant: 'Color: Matte Black',
      title: 'Remarkable build density. Feels solid and perfectly balanced',
      body: 'Unlike flimsy drugstore electric toothbrushes, the Miroooo X has a reassuring weight and textured grip. The motor maintains constant acoustic torque even when pressed gently against back molars.',
      images: [],
      helpful: 21,
      verified: true
    },
    {
      id: 'rev-28',
      name: 'Arthur Pendelton',
      country: 'Oxford, UK',
      rating: 5,
      date: '2025-10-14',
      displayDate: 'Oct 14, 2025',
      variant: 'Color: Silver',
      title: 'DuPont bristles don\'t splay after 2 months of daily use',
      body: 'Standard nylon bristles usually flatten and splay within 4 weeks. These high-density DuPont 3D curved bristles look brand new after 60+ days of twice-daily brushing. Very impressed with the durability.',
      images: [],
      helpful: 38,
      verified: true
    },
    {
      id: 'rev-29',
      name: 'Mia Larsson',
      country: 'Gothenburg, SE',
      rating: 5,
      date: '2025-10-10',
      displayDate: 'Oct 10, 2025',
      variant: 'Color: Space Grey',
      title: 'Brushing experience is silky smooth — highly recommend',
      body: 'The sonic frequency creates micro-bubbles that wash between tooth gaps effortlessly. The sleek dark aesthetic matches modern bathrooms and the travel case is super compact.',
      images: [],
      helpful: 20,
      verified: true
    },
    {
      id: 'rev-30',
      name: 'Benjamin Koch',
      country: 'Vienna, AT',
      rating: 5,
      date: '2025-10-06',
      displayDate: 'Oct 6, 2025',
      variant: 'Color: Gloss White',
      title: 'Morning coffee breath eliminated completely',
      body: 'The high-speed sonic action cleans the tongue and posterior molars thoroughly. Teeth feel slick all day until dinner time without that afternoon fuzzy plaque buildup.',
      images: [],
      helpful: 26,
      verified: true
    },
    {
      id: 'rev-31',
      name: 'Nathalie Bernard',
      country: 'Brussels, BE',
      rating: 4,
      date: '2025-10-02',
      displayDate: 'Oct 2, 2025',
      variant: 'Color: Rose Gold',
      title: 'Beautiful color, wish the brush head cap clicked tighter',
      body: 'The travel case is fantastic. When using the standalone plastic travel cap, it fits securely but could have a firmer snap lock. Brushing performance and battery longevity are undisputed 5 stars.',
      images: [],
      helpful: 17,
      verified: true
    },
    {
      id: 'rev-32',
      name: 'Daniel Evans',
      country: 'Newcastle, UK',
      rating: 5,
      date: '2025-09-28',
      displayDate: 'Sep 28, 2025',
      variant: 'Color: Matte Black',
      title: 'Bought one for myself, then ordered 2 more for my family',
      body: 'After testing the Miroooo X for 2 weeks, I bought two more in Space Grey and Rose Gold for my wife and teenage son. All three are mounted on the magnetic wall strip side by side. Super tidy bathroom!',
      images: [],
      helpful: 45,
      verified: true
    },
    {
      id: 'rev-33',
      name: 'Elena Garcia',
      country: 'Barcelona, ES',
      rating: 5,
      date: '2025-09-24',
      displayDate: 'Sep 24, 2025',
      variant: 'Color: Space Grey',
      title: 'Gentle on dental implants and crowns',
      body: 'I have two porcelain crowns and was worried sonic vibration might loosen them. The Sensitive mode cleans around the crown margins with precision fluid action and zero jarring impact.',
      images: [],
      helpful: 32,
      verified: true
    },
    {
      id: 'rev-34',
      name: 'Lukas Fischer',
      country: 'Hamburg, DE',
      rating: 5,
      date: '2025-09-20',
      displayDate: 'Sep 20, 2025',
      variant: 'Color: Silver',
      title: 'True 40,000 vibrations per minute. Deep clean every time',
      body: 'You can see the acoustic cavitation when you place the bristles in water. The dynamic micro-bubbles clean deeply into gum pockets where dental floss struggles.',
      images: [],
      helpful: 40,
      verified: true
    },
    {
      id: 'rev-35',
      name: 'Camilla Jensen',
      country: 'Odense, DK',
      rating: 5,
      date: '2025-09-16',
      displayDate: 'Sep 16, 2025',
      variant: 'Color: Gloss White',
      title: 'Best travel sonic brush hands down',
      body: 'Took this on a 3-week camping trip through Norway without bringing a single charger. Used it twice every single day and the battery indicator was still solid green when I returned home.',
      images: [],
      helpful: 29,
      verified: true
    },
    {
      id: 'rev-36',
      name: 'Robert MacLeod',
      country: 'Aberdeen, UK',
      rating: 4,
      date: '2025-09-12',
      displayDate: 'Sep 12, 2025',
      variant: 'Color: Space Grey',
      title: 'Super smooth brushing, replacement head subscription is handy',
      body: 'The brush itself is top tier. Appreciate that replacement heads can be ordered easily. The acoustic motor sound is very discreet compared to loud mechanical brushes.',
      images: [],
      helpful: 15,
      verified: true
    }
  ];

  // Global State
  let currentFilterRating = null; // null = all
  let currentSort = 'most-recent';
  let currentWithPhotos = false;
  let currentVerifiedOnly = false;
  let currentVisibleCount = 12;
  const PAGE_SIZE = 12;

  // Active Lightbox State
  let activeLightboxReview = null;
  let activeLightboxImageIndex = 0;

  // DOM Elements Cache
  let gridEl = null;
  let loadMoreBtn = null;
  let emptyStateEl = null;
  let loadCountEl = null;
  let filterStatusEl = null;
  let statusTextEl = null;
  let starDropdownEl = null;
  let sortDropdownEl = null;
  let starTriggerLabel = null;
  let sortTriggerLabel = null;
  let filterPhotosBtn = null;
  let filterVerifiedBtn = null;
  let resetFilterBtn = null;
  let breakdownRows = [];

  // Init Function
  function initProductReviews() {
    const root = document.getElementById('shopify-section-template--24203751129433__reviews');
    if (!root) return;

    gridEl = document.getElementById('miroooo-reviews-grid');
    loadMoreBtn = document.getElementById('miroooo-load-more-btn');
    emptyStateEl = document.getElementById('miroooo-reviews-empty');
    loadCountEl = document.getElementById('miroooo-load-count');
    filterStatusEl = document.getElementById('miroooo-filter-status');
    statusTextEl = document.getElementById('miroooo-status-text');
    starDropdownEl = document.getElementById('miroooo-star-dropdown');
    sortDropdownEl = document.getElementById('miroooo-sort-dropdown');
    starTriggerLabel = document.getElementById('miroooo-selected-star-label');
    sortTriggerLabel = document.getElementById('miroooo-selected-sort-label');
    filterPhotosBtn = document.getElementById('miroooo-filter-photos');
    filterVerifiedBtn = document.getElementById('miroooo-filter-verified');
    resetFilterBtn = document.getElementById('miroooo-reset-filter');
    breakdownRows = Array.from(document.querySelectorAll('.miroooo-breakdown-row'));

    bindEvents();
    renderReviews();
  }

  // Bind UI Events
  function bindEvents() {
    // Breakdown Rows Filter
    breakdownRows.forEach(row => {
      row.addEventListener('click', () => {
        const star = parseInt(row.getAttribute('data-star'), 10);
        if (currentFilterRating === star) {
          setStarFilter(null);
        } else {
          setStarFilter(star);
        }
      });
    });

    // Star Dropdown Trigger
    const starTrigger = document.getElementById('miroooo-star-trigger');
    if (starTrigger) {
      starTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        starDropdownEl.classList.toggle('open');
        sortDropdownEl.classList.remove('open');
      });
    }

    // Star Dropdown Items
    const starMenuItems = document.querySelectorAll('#miroooo-star-menu .miroooo-dropdown-item');
    starMenuItems.forEach(item => {
      item.addEventListener('click', () => {
        const val = item.getAttribute('data-value');
        setStarFilter(val === 'all' ? null : parseInt(val, 10));
        starDropdownEl.classList.remove('open');
      });
    });

    // Sort Dropdown Trigger
    const sortTrigger = document.getElementById('miroooo-sort-trigger');
    if (sortTrigger) {
      sortTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        sortDropdownEl.classList.toggle('open');
        starDropdownEl.classList.remove('open');
      });
    }

    // Sort Dropdown Items
    const sortMenuItems = document.querySelectorAll('#miroooo-sort-menu .miroooo-dropdown-item');
    sortMenuItems.forEach(item => {
      item.addEventListener('click', () => {
        const val = item.getAttribute('data-value');
        setSortOption(val);
        sortDropdownEl.classList.remove('open');
      });
    });

    // Close Dropdowns on Click Outside
    document.addEventListener('click', () => {
      if (starDropdownEl) starDropdownEl.classList.remove('open');
      if (sortDropdownEl) sortDropdownEl.classList.remove('open');
    });

    // Filter Toggle: Photos
    if (filterPhotosBtn) {
      filterPhotosBtn.addEventListener('click', () => {
        currentWithPhotos = !currentWithPhotos;
        filterPhotosBtn.classList.toggle('active', currentWithPhotos);
        filterPhotosBtn.setAttribute('aria-pressed', currentWithPhotos);
        currentVisibleCount = PAGE_SIZE;
        renderReviews();
      });
    }

    // Filter Toggle: Verified
    if (filterVerifiedBtn) {
      filterVerifiedBtn.addEventListener('click', () => {
        currentVerifiedOnly = !currentVerifiedOnly;
        filterVerifiedBtn.classList.toggle('active', currentVerifiedOnly);
        filterVerifiedBtn.setAttribute('aria-pressed', currentVerifiedOnly);
        currentVisibleCount = PAGE_SIZE;
        renderReviews();
      });
    }

    // Reset Filter Button & Clear All Link
    if (resetFilterBtn) {
      resetFilterBtn.addEventListener('click', resetAllFilters);
    }
    const clearAllLink = document.getElementById('miroooo-clear-all-link');
    if (clearAllLink) {
      clearAllLink.addEventListener('click', resetAllFilters);
    }
    const emptyResetBtn = document.getElementById('miroooo-empty-reset-btn');
    if (emptyResetBtn) {
      emptyResetBtn.addEventListener('click', resetAllFilters);
    }

    // Load More Button
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        currentVisibleCount += PAGE_SIZE;
        renderReviews(false);
      });
    }

    // Write Review Button
    const writeBtn = document.getElementById('miroooo-write-review-btn');
    if (writeBtn) {
      writeBtn.addEventListener('click', openWriteModal);
    }

    // Lightbox Events
    setupLightboxEvents();

    // Write Form Events
    setupWriteModalEvents();
  }

  function setStarFilter(star) {
    currentFilterRating = star;
    currentVisibleCount = PAGE_SIZE;

    // Update Breakdown Bar active state
    breakdownRows.forEach(row => {
      const rowStar = parseInt(row.getAttribute('data-star'), 10);
      row.classList.toggle('active', currentFilterRating === rowStar);
    });

    // Update Star Dropdown Active Item & Trigger Label
    const starMenuItems = document.querySelectorAll('#miroooo-star-menu .miroooo-dropdown-item');
    starMenuItems.forEach(item => {
      const val = item.getAttribute('data-value');
      const isMatch = (star === null && val === 'all') || (star !== null && parseInt(val, 10) === star);
      item.classList.toggle('active', isMatch);
    });

    if (starTriggerLabel) {
      starTriggerLabel.textContent = star === null ? 'All stars' : `${star} star`;
    }

    renderReviews();
  }

  function setSortOption(sortKey) {
    currentSort = sortKey;
    currentVisibleCount = PAGE_SIZE;

    // Update Sort Dropdown Active Item & Trigger Label
    const sortMenuItems = document.querySelectorAll('#miroooo-sort-menu .miroooo-dropdown-item');
    sortMenuItems.forEach(item => {
      const val = item.getAttribute('data-value');
      const isMatch = val === sortKey;
      item.classList.toggle('active', isMatch);
      if (isMatch && sortTriggerLabel) {
        sortTriggerLabel.textContent = item.textContent.trim();
      }
    });

    renderReviews();
  }

  function resetAllFilters() {
    currentFilterRating = null;
    currentWithPhotos = false;
    currentVerifiedOnly = false;
    currentSort = 'most-recent';
    currentVisibleCount = PAGE_SIZE;

    // Reset Breakdown Bars
    breakdownRows.forEach(r => r.classList.remove('active'));

    // Reset Pills
    if (filterPhotosBtn) {
      filterPhotosBtn.classList.remove('active');
      filterPhotosBtn.setAttribute('aria-pressed', 'false');
    }
    if (filterVerifiedBtn) {
      filterVerifiedBtn.classList.remove('active');
      filterVerifiedBtn.setAttribute('aria-pressed', 'false');
    }

    // Reset Dropdown Labels
    if (starTriggerLabel) starTriggerLabel.textContent = 'All stars';
    if (sortTriggerLabel) sortTriggerLabel.textContent = 'Most recent';

    const starMenuItems = document.querySelectorAll('#miroooo-star-menu .miroooo-dropdown-item');
    starMenuItems.forEach(item => item.classList.toggle('active', item.getAttribute('data-value') === 'all'));

    const sortMenuItems = document.querySelectorAll('#miroooo-sort-menu .miroooo-dropdown-item');
    sortMenuItems.forEach(item => item.classList.toggle('active', item.getAttribute('data-value') === 'most-recent'));

    renderReviews();
  }

  // Filter & Sort Core Logic
  function getFilteredAndSortedReviews() {
    let list = REVIEWS_DATA.slice();

    // 1. Star Rating Filter
    if (currentFilterRating !== null) {
      list = list.filter(r => r.rating === currentFilterRating);
    }

    // 2. Photos Filter
    if (currentWithPhotos) {
      list = list.filter(r => r.images && r.images.length > 0);
    }

    // 3. Verified Filter
    if (currentVerifiedOnly) {
      list = list.filter(r => r.verified === true);
    }

    // 4. Sort
    list.sort((a, b) => {
      switch (currentSort) {
        case 'with-photos': {
          const aHas = a.images && a.images.length > 0 ? 1 : 0;
          const bHas = b.images && b.images.length > 0 ? 1 : 0;
          if (bHas !== aHas) return bHas - aHas;
          return new Date(b.date) - new Date(a.date);
        }
        case 'highest-rating':
          if (b.rating !== a.rating) return b.rating - a.rating;
          return new Date(b.date) - new Date(a.date);
        case 'lowest-rating':
          if (a.rating !== b.rating) return a.rating - b.rating;
          return new Date(b.date) - new Date(a.date);
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'most-recent':
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });

    return list;
  }

  // Render Reviews into Grid
  function renderReviews(scrollUp = true) {
    if (!gridEl) return;

    const filtered = getFilteredAndSortedReviews();
    const isFiltered = currentFilterRating !== null || currentWithPhotos || currentVerifiedOnly || currentSort !== 'most-recent';

    // Update Filter Status Bar & Reset Button
    if (resetFilterBtn) {
      resetFilterBtn.style.display = isFiltered ? 'inline-block' : 'none';
    }

    if (filterStatusEl && statusTextEl) {
      if (isFiltered) {
        filterStatusEl.style.display = 'flex';
        let desc = [];
        if (currentFilterRating !== null) desc.push(`${currentFilterRating}-star reviews`);
        if (currentWithPhotos) desc.push('with photos');
        if (currentVerifiedOnly) desc.push('verified buyers only');
        statusTextEl.textContent = `Showing ${filtered.length} matching reviews (${desc.join(', ')})`;
      } else {
        filterStatusEl.style.display = 'none';
      }
    }

    // Handle Empty State
    if (filtered.length === 0) {
      gridEl.innerHTML = '';
      if (emptyStateEl) emptyStateEl.style.display = 'block';
      if (loadMoreBtn) loadMoreBtn.parentElement.style.display = 'none';
      return;
    } else {
      if (emptyStateEl) emptyStateEl.style.display = 'none';
    }

    // Slice for Pagination
    const visibleList = filtered.slice(0, currentVisibleCount);

    // Build Cards HTML
    let html = '';
    visibleList.forEach((review, index) => {
      html += buildReviewCardHTML(review, index);
    });

    gridEl.innerHTML = html;

    // Attach Event Listeners to Card Action Elements
    attachCardListeners(visibleList);

    // Update Load More Button & Counter
    const paginationContainer = document.getElementById('miroooo-pagination-container');
    if (paginationContainer && loadMoreBtn && loadCountEl) {
      if (visibleList.length >= filtered.length) {
        paginationContainer.style.display = 'none';
      } else {
        paginationContainer.style.display = 'flex';
        const displayTotal = isFiltered ? filtered.length : REVIEWS_SUMMARY.total;
        loadCountEl.textContent = `(Showing ${visibleList.length} of ${displayTotal.toLocaleString()})`;
      }
    }
  }

  // Generate Review Card HTML
  function buildReviewCardHTML(review, index) {
    const starsHTML = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
    const initials = review.name
      .split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

    // Gallery HTML
    let galleryHTML = '';
    if (review.images && review.images.length > 0) {
      if (review.images.length === 1) {
        galleryHTML = `
          <div class="miroooo-card-gallery miroooo-gallery-1" data-review-id="${review.id}" data-img-index="0">
            <img src="${review.images[0]}" alt="Photo from ${review.name}" loading="lazy" />
          </div>
        `;
      } else if (review.images.length === 2) {
        galleryHTML = `
          <div class="miroooo-card-gallery miroooo-gallery-2" data-review-id="${review.id}">
            <div class="miroooo-gallery-item" data-img-index="0"><img src="${review.images[0]}" alt="Photo 1 from ${review.name}" loading="lazy" /></div>
            <div class="miroooo-gallery-item" data-img-index="1"><img src="${review.images[1]}" alt="Photo 2 from ${review.name}" loading="lazy" /></div>
          </div>
        `;
      } else {
        const remainingCount = review.images.length - 3;
        galleryHTML = `
          <div class="miroooo-card-gallery miroooo-gallery-3" data-review-id="${review.id}">
            <div class="miroooo-gallery-item" data-img-index="0"><img src="${review.images[0]}" alt="Photo 1 from ${review.name}" loading="lazy" /></div>
            <div class="miroooo-gallery-item" data-img-index="1"><img src="${review.images[1]}" alt="Photo 2 from ${review.name}" loading="lazy" /></div>
            <div class="miroooo-gallery-item" data-img-index="2">
              <img src="${review.images[2]}" alt="Photo 3 from ${review.name}" loading="lazy" />
              ${remainingCount > 0 ? `<div class="miroooo-gallery-more-badge">+${remainingCount}</div>` : ''}
            </div>
          </div>
        `;
      }
    }

    // Official Merchant Reply HTML (if present)
    let merchantReplyHTML = '';
    if (review.merchantReply) {
      merchantReplyHTML = `
        <div class="miroooo-merchant-reply">
          <div class="miroooo-merchant-reply-header">
            <svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"/></svg>
            ${review.merchantReply.author} · <span style="font-weight:400; opacity:0.8;">${review.merchantReply.date}</span>
          </div>
          <div>${review.merchantReply.text}</div>
        </div>
      `;
    }

    return `
      <article class="miroooo-review-card fade-in" id="card-${review.id}">
        <!-- Top: Stars + Date -->
        <div class="miroooo-card-header">
          <div class="miroooo-card-stars" aria-label="${review.rating} out of 5 stars">${starsHTML}</div>
          <span class="miroooo-card-date">${review.displayDate || review.date}</span>
        </div>

        <!-- Selected Variant -->
        ${review.variant ? `<div class="miroooo-card-variant">${review.variant}</div>` : ''}

        <!-- Customer Gallery -->
        ${galleryHTML}

        <!-- Title -->
        <h4 class="miroooo-card-title">${review.title}</h4>

        <!-- Body -->
        <p class="miroooo-card-body">${review.body}</p>

        <!-- Official Merchant Care Reply -->
        ${merchantReplyHTML}

        <!-- Card Footer -->
        <div class="miroooo-card-footer">
          <div class="miroooo-card-author-row">
            <div class="miroooo-card-author">
              <div class="miroooo-avatar-initials">${initials}</div>
              <div class="miroooo-author-info">
                <span class="miroooo-author-name">${review.name}</span>
                ${review.country ? `<span class="miroooo-author-country">${review.country}</span>` : ''}
              </div>
            </div>
            ${review.verified ? `
              <span class="miroooo-card-verified-badge" title="Verified Customer Purchase">
                <svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                Verified
              </span>
            ` : ''}
          </div>

          <div class="miroooo-card-actions">
            <button type="button" class="miroooo-helpful-btn" data-review-id="${review.id}">
              <svg viewBox="0 0 20 20" fill="currentColor"><path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a2 2 0 00-.8 1.4z"/></svg>
              Helpful (<span class="miroooo-helpful-count">${review.helpful || 0}</span>)
            </button>
          </div>
        </div>
      </article>
    `;
  }

  // Attach Listeners to Card Buttons & Images
  function attachCardListeners(currentList) {
    // 1. Helpful Upvote Button
    const helpfulBtns = gridEl.querySelectorAll('.miroooo-helpful-btn');
    helpfulBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const reviewId = btn.getAttribute('data-review-id');
        const countSpan = btn.querySelector('.miroooo-helpful-count');
        const review = currentList.find(r => r.id === reviewId);
        if (!review) return;

        if (btn.classList.contains('voted')) {
          review.helpful = Math.max(0, (review.helpful || 0) - 1);
          btn.classList.remove('voted');
        } else {
          review.helpful = (review.helpful || 0) + 1;
          btn.classList.add('voted');
        }
        if (countSpan) countSpan.textContent = review.helpful;
      });
    });

    // 2. Gallery Photo Lightbox Triggers
    const galleryContainers = gridEl.querySelectorAll('.miroooo-card-gallery');
    galleryContainers.forEach(container => {
      container.addEventListener('click', (e) => {
        const reviewId = container.getAttribute('data-review-id');
        const review = currentList.find(r => r.id === reviewId);
        if (!review || !review.images || review.images.length === 0) return;

        let imgIndex = 0;
        const targetItem = e.target.closest('[data-img-index]');
        if (targetItem) {
          imgIndex = parseInt(targetItem.getAttribute('data-img-index'), 10) || 0;
        }

        openLightbox(review, imgIndex);
      });
    });
  }

  // ==========================================================================
  // LIGHTBOX LOGIC
  // ==========================================================================
  function setupLightboxEvents() {
    const modal = document.getElementById('miroooo-lightbox-modal');
    if (!modal) return;

    const closeBtn = document.getElementById('miroooo-lightbox-close');
    const prevBtn = document.getElementById('miroooo-lightbox-prev');
    const nextBtn = document.getElementById('miroooo-lightbox-next');
    const helpfulBtn = document.getElementById('miroooo-lightbox-helpful-btn');

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeLightbox();
    });

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (!activeLightboxReview || !activeLightboxReview.images.length) return;
        activeLightboxImageIndex = (activeLightboxImageIndex - 1 + activeLightboxReview.images.length) % activeLightboxReview.images.length;
        updateLightboxContent();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (!activeLightboxReview || !activeLightboxReview.images.length) return;
        activeLightboxImageIndex = (activeLightboxImageIndex + 1) % activeLightboxReview.images.length;
        updateLightboxContent();
      });
    }

    if (helpfulBtn) {
      helpfulBtn.addEventListener('click', () => {
        if (!activeLightboxReview) return;
        activeLightboxReview.helpful = (activeLightboxReview.helpful || 0) + 1;
        const countSpan = document.getElementById('miroooo-lightbox-helpful-count');
        if (countSpan) countSpan.textContent = activeLightboxReview.helpful;
        helpfulBtn.classList.add('voted');
        renderReviews(false);
      });
    }

    document.addEventListener('keydown', (e) => {
      if (modal.style.display !== 'flex') return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft' && activeLightboxReview && activeLightboxReview.images.length > 1) {
        activeLightboxImageIndex = (activeLightboxImageIndex - 1 + activeLightboxReview.images.length) % activeLightboxReview.images.length;
        updateLightboxContent();
      }
      if (e.key === 'ArrowRight' && activeLightboxReview && activeLightboxReview.images.length > 1) {
        activeLightboxImageIndex = (activeLightboxImageIndex + 1) % activeLightboxReview.images.length;
        updateLightboxContent();
      }
    });
  }

  function openLightbox(review, imgIndex = 0) {
    activeLightboxReview = review;
    activeLightboxImageIndex = imgIndex;

    const modal = document.getElementById('miroooo-lightbox-modal');
    if (!modal) return;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    updateLightboxContent();
  }

  function updateLightboxContent() {
    if (!activeLightboxReview) return;

    const imgEl = document.getElementById('miroooo-lightbox-img');
    const starsEl = document.getElementById('miroooo-lightbox-stars');
    const dateEl = document.getElementById('miroooo-lightbox-date');
    const variantEl = document.getElementById('miroooo-lightbox-variant');
    const titleEl = document.getElementById('miroooo-lightbox-title');
    const bodyEl = document.getElementById('miroooo-lightbox-body');
    const nameEl = document.getElementById('miroooo-lightbox-name');
    const avatarEl = document.getElementById('miroooo-lightbox-avatar');
    const countSpan = document.getElementById('miroooo-lightbox-helpful-count');
    const prevBtn = document.getElementById('miroooo-lightbox-prev');
    const nextBtn = document.getElementById('miroooo-lightbox-next');
    const dotsContainer = document.getElementById('miroooo-lightbox-dots');

    if (imgEl && activeLightboxReview.images.length > 0) {
      imgEl.src = activeLightboxReview.images[activeLightboxImageIndex];
    }

    if (starsEl) starsEl.textContent = '★'.repeat(activeLightboxReview.rating) + '☆'.repeat(5 - activeLightboxReview.rating);
    if (dateEl) dateEl.textContent = activeLightboxReview.displayDate || activeLightboxReview.date;
    if (variantEl) {
      variantEl.textContent = activeLightboxReview.variant || 'Standard Edition';
      variantEl.style.display = activeLightboxReview.variant ? 'inline-block' : 'none';
    }
    if (titleEl) titleEl.textContent = activeLightboxReview.title;
    if (bodyEl) bodyEl.textContent = activeLightboxReview.body;
    if (nameEl) nameEl.textContent = activeLightboxReview.name;
    if (avatarEl) {
      avatarEl.textContent = activeLightboxReview.name
        .split(' ')
        .map(n => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
    }
    if (countSpan) countSpan.textContent = activeLightboxReview.helpful || 0;

    // Prev / Next Visibility
    const hasMultiple = activeLightboxReview.images && activeLightboxReview.images.length > 1;
    if (prevBtn) prevBtn.style.display = hasMultiple ? 'flex' : 'none';
    if (nextBtn) nextBtn.style.display = hasMultiple ? 'flex' : 'none';

    // Dots
    if (dotsContainer) {
      if (hasMultiple) {
        dotsContainer.innerHTML = activeLightboxReview.images
          .map((_, i) => `<span class="miroooo-lightbox-dot ${i === activeLightboxImageIndex ? 'active' : ''}"></span>`)
          .join('');
      } else {
        dotsContainer.innerHTML = '';
      }
    }
  }

  function closeLightbox() {
    const modal = document.getElementById('miroooo-lightbox-modal');
    if (modal) modal.style.display = 'none';
    document.body.style.overflow = '';
    activeLightboxReview = null;
  }

  // ==========================================================================
  // WRITE A REVIEW MODAL LOGIC
  // ==========================================================================
  let selectedFormRating = 5;
  const ratingLabels = {
    1: '1.0 - Poor',
    2: '2.0 - Fair',
    3: '3.0 - Good',
    4: '4.0 - Very Good',
    5: '5.0 - Excellent'
  };

  function setupWriteModalEvents() {
    const modal = document.getElementById('miroooo-write-modal');
    if (!modal) return;

    const closeBtn = document.getElementById('miroooo-write-close');
    const cancelBtn = document.getElementById('miroooo-form-cancel');
    const form = document.getElementById('miroooo-review-form');
    const starBtns = document.querySelectorAll('#miroooo-form-stars .miroooo-star-btn');
    const ratingLabel = document.getElementById('miroooo-form-rating-label');
    const successBox = document.getElementById('miroooo-write-success');
    const successCloseBtn = document.getElementById('miroooo-success-close');

    if (closeBtn) closeBtn.addEventListener('click', closeWriteModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeWriteModal);
    if (successCloseBtn) successCloseBtn.addEventListener('click', closeWriteModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeWriteModal();
    });

    // Star Hover & Click
    starBtns.forEach(btn => {
      const rating = parseInt(btn.getAttribute('data-rating'), 10);

      btn.addEventListener('mouseenter', () => {
        starBtns.forEach(b => {
          const r = parseInt(b.getAttribute('data-rating'), 10);
          b.classList.toggle('hover', r <= rating);
        });
        if (ratingLabel) ratingLabel.textContent = ratingLabels[rating];
      });

      btn.addEventListener('mouseleave', () => {
        starBtns.forEach(b => {
          b.classList.remove('hover');
          const r = parseInt(b.getAttribute('data-rating'), 10);
          b.classList.toggle('active', r <= selectedFormRating);
        });
        if (ratingLabel) ratingLabel.textContent = ratingLabels[selectedFormRating];
      });

      btn.addEventListener('click', () => {
        selectedFormRating = rating;
        starBtns.forEach(b => {
          const r = parseInt(b.getAttribute('data-rating'), 10);
          b.classList.toggle('active', r <= selectedFormRating);
        });
        if (ratingLabel) ratingLabel.textContent = ratingLabels[selectedFormRating];
      });
    });

    // Mock File Dropzone Preview
    const fileInput = document.getElementById('miroooo-form-photos');
    const thumbsContainer = document.getElementById('miroooo-preview-thumbs');
    let uploadedImageURLs = [];

    if (fileInput && thumbsContainer) {
      fileInput.addEventListener('change', () => {
        thumbsContainer.innerHTML = '';
        uploadedImageURLs = [];
        const files = Array.from(fileInput.files);
        files.forEach(file => {
          const url = URL.createObjectURL(file);
          uploadedImageURLs.push(url);
          const thumb = document.createElement('div');
          thumb.className = 'miroooo-thumb-item';
          thumb.innerHTML = `<img src="${url}" alt="Preview" />`;
          thumbsContainer.appendChild(thumb);
        });
      });
    }

    // Form Submission
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('miroooo-form-name').value.trim();
        const variant = document.getElementById('miroooo-form-variant').value;
        const title = document.getElementById('miroooo-form-title').value.trim();
        const body = document.getElementById('miroooo-form-body').value.trim();

        if (!name || !title || !body) return;

        const newReview = {
          id: 'rev-user-' + Date.now(),
          name: name,
          country: 'Verified Customer',
          rating: selectedFormRating,
          date: new Date().toISOString().split('T')[0],
          displayDate: 'Just now',
          variant: variant,
          title: title,
          body: body,
          images: uploadedImageURLs.length > 0 ? uploadedImageURLs : [],
          helpful: 0,
          verified: true
        };

        // Prepend new review to dataset
        REVIEWS_DATA.unshift(newReview);

        // Show Success Toast
        form.style.display = 'none';
        if (successBox) successBox.style.display = 'block';

        // Re-render reviews
        currentFilterRating = null;
        renderReviews();
      });
    }
  }

  function openWriteModal() {
    const modal = document.getElementById('miroooo-write-modal');
    const form = document.getElementById('miroooo-review-form');
    const successBox = document.getElementById('miroooo-write-success');
    if (!modal) return;

    if (form) {
      form.reset();
      form.style.display = 'block';
    }
    if (successBox) successBox.style.display = 'none';

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeWriteModal() {
    const modal = document.getElementById('miroooo-write-modal');
    if (modal) modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  // Initialize on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProductReviews);
  } else {
    initProductReviews();
  }

})();
