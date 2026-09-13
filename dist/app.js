/* ==========================================================================
   THATJOINT — interaction layer
   Progressive enhancement: the page is complete and readable without
   JavaScript. Motion only engages after this script confirms a working
   animation path (GSAP + ScrollTrigger, or IntersectionObserver) and flips
   the .motion-ready switch the stylesheet expects.
   ========================================================================== */
(function () {
  'use strict';

  var body = document.body;
  var reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  var reduced = reduceQuery.matches;
  var hasGSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  var hasIO = 'IntersectionObserver' in window;

  /* ------------------------------------------------------------------ *
   *  Loader — counts up, wipes away, then hands off to the motion layer *
   * ------------------------------------------------------------------ */
  var loader = document.getElementById('loader');
  var loaderCount = document.getElementById('loaderCount');
  var loaderFinished = false;

  function pad(value) {
    return (value < 10 ? '0' : '') + value;
  }

  function finishLoader() {
    if (loaderFinished) return;
    loaderFinished = true;
    if (loaderCount) loaderCount.textContent = '90';
    if (loader) loader.classList.add('is-complete');
    enableMotion();
    if (loader) {
      window.setTimeout(function () {
        if (loader.parentNode) loader.parentNode.removeChild(loader);
      }, reduced ? 0 : 1300);
    }
  }

  function runLoader() {
    if (!loader || reduced) { finishLoader(); return; }
    var target = 90;
    var duration = 1050;
    var startedAt = null;
    var step = function (now) {
      if (startedAt === null) startedAt = now;
      var progress = Math.min((now - startedAt) / duration, 1);
      if (loaderCount) loaderCount.textContent = pad(Math.round(progress * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        window.setTimeout(finishLoader, 240);
      }
    };
    window.requestAnimationFrame(step);
  }

  window.setTimeout(finishLoader, 4500); /* safety net */
  runLoader();

  /* ------------------------------------------------------------------ *
   *  Motion router                                                      *
   * ------------------------------------------------------------------ */
  function enableMotion() {
    if (reduced) return; /* the reduced-motion stylesheet shows everything statically */

    if (hasGSAP) {
      body.classList.add('motion-ready');
      gsap.registerPlugin(ScrollTrigger);
      heroIn();
      revealOnScroll();
      heroParallax();
      processImageMotion();
      intelligenceIn();
      return;
    }

    if (hasIO) {
      body.classList.add('motion-ready');
      observeReveals();
      return;
    }
    /* No animation path available: the page simply stays fully visible. */
  }

  function heroIn() {
    gsap.fromTo('.hero-title i',
      { yPercent: 108 },
      {
        yPercent: 0, duration: 1.15, stagger: 0.09, ease: 'power4.out', delay: 0.08,
        onComplete: function () {
          body.classList.add('hero-in');
          /* drop GSAP's inline transform so the .hero-in rule pins the end state */
          gsap.set('.hero-title i', { clearProps: 'transform' });
        }
      });
    gsap.from('.hero-enter', {
      y: 34, autoAlpha: 0, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.16
    });
  }

  function revealOnScroll() {
    Array.prototype.forEach.call(document.querySelectorAll('.reveal'), function (el) {
      gsap.fromTo(el,
        { y: 36, autoAlpha: 0 },
        {
          y: 0, autoAlpha: 1, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          onComplete: function () { el.classList.add('is-visible'); }
        });
    });
  }

  function heroParallax() {
    var image = document.querySelector('.hero-image');
    if (!image) return;
    gsap.fromTo(image,
      { yPercent: -4 },
      {
        yPercent: 4, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
      });
  }

  function processImageMotion() {
    var section = document.querySelector('.process');
    var image = document.querySelector('.process-image img');
    if (!section || !image) return;

    gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.7
      }
    })
      .fromTo(image,
        { yPercent: -4, scale: 1.08, filter: 'blur(7px)' },
        { yPercent: 0, scale: 1.04, filter: 'blur(0px)', ease: 'none', duration: 0.42 })
      .to(image,
        { yPercent: 5, scale: 1.01, filter: 'blur(8px)', ease: 'none', duration: 0.58 });
  }

  function intelligenceIn() {
    var visual = document.querySelector('.intelligence-visual');
    if (!visual) return;
    gsap.from(visual.querySelectorAll('.home-card, .signal-card'), {
      y: 42, autoAlpha: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: visual, start: 'top 82%', once: true }
    });
  }

  /* IntersectionObserver fallback: same choreography without GSAP. */
  function observeReveals() {
    body.classList.add('hero-in');

    var observer = new IntersectionObserver(function (entries) {
      Array.prototype.forEach.call(entries, function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    Array.prototype.forEach.call(document.querySelectorAll('.reveal'), function (el) {
      el.style.setProperty('--reveal-delay', groupDelay(el) + 'ms');
      observer.observe(el);
    });
  }

  function groupDelay(el) {
    if (!el.parentElement) return 0;
    var siblings = el.parentElement.querySelectorAll('.reveal');
    for (var i = 0; i < siblings.length; i += 1) {
      if (siblings[i] === el) return Math.min(i * 90, 360);
    }
    return 0;
  }

  /* ------------------------------------------------------------------ *
   *  Header state                                                       *
   * ------------------------------------------------------------------ */
  var header = document.getElementById('siteHeader');

  function syncHeader() {
    var offset = window.scrollY || window.pageYOffset || 0;
    header.classList.toggle('is-scrolled', offset > 24);
  }

  if (header) {
    window.addEventListener('scroll', syncHeader, { passive: true });
    syncHeader();
  }

  /* ------------------------------------------------------------------ *
   *  Smooth in-page navigation (the skip link keeps native behavior)    *
   * ------------------------------------------------------------------ */
  document.addEventListener('click', function (event) {
    if (!event.target || typeof event.target.closest !== 'function') return;
    var link = event.target.closest('a[href^="#"]');
    if (!link || link.classList.contains('skip-link')) return;
    var hash = link.getAttribute('href');
    if (!hash || hash.length < 2) return;
    var target = document.getElementById(hash.slice(1));
    if (!target) return;
    event.preventDefault();
    closeMenu();
    target.scrollIntoView(reduced ? { block: 'start' } : { behavior: 'smooth', block: 'start' });
    if (history.pushState) history.pushState(null, '', hash);
  });

  /* ------------------------------------------------------------------ *
   *  Mobile menu — toggle, focus trap, Escape, and self-closing links   *
   * ------------------------------------------------------------------ */
  var menuToggle = document.getElementById('menuToggle');
  var mobileMenu = document.getElementById('mobileMenu');

  function menuIsOpen() {
    return !!(mobileMenu && mobileMenu.classList.contains('open'));
  }

  function openMenu() {
    if (!mobileMenu || !menuToggle || menuIsOpen()) return;
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Close menu');
    body.classList.add('menu-open');
    window.setTimeout(function () {
      var first = mobileMenu.querySelector('a, button');
      if (first) first.focus();
    }, 80);
  }

  function closeMenu() {
    if (!menuIsOpen()) return;
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
    body.classList.remove('menu-open');
  }

  function trapFocus(event, container) {
    var focusables = container.querySelectorAll('a[href], button:not([disabled])');
    if (!focusables.length) return;
    var first = focusables[0];
    var last = focusables[focusables.length - 1];
    var active = document.activeElement;
    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
      if (menuIsOpen()) {
        closeMenu();
        menuToggle.focus();
      } else {
        openMenu();
      }
    });
    mobileMenu.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeMenu();
    });
    mobileMenu.addEventListener('keydown', function (event) {
      if (event.key === 'Tab') trapFocus(event, mobileMenu);
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape' || !menuIsOpen()) return;
    closeMenu();
    if (menuToggle) menuToggle.focus();
  });

  /* ------------------------------------------------------------------ *
   *  Pilot-request dialog + confirmation toast                          *
   * ------------------------------------------------------------------ */
  var dialog = document.getElementById('demoDialog');
  var form = document.getElementById('demoForm');
  var toast = document.getElementById('toast');
  var toastTimer = null;
  var dialogTrigger = null;
  var confirmPending = false;

  function showToast() {
    if (!toast) return;
    toast.classList.add('show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.classList.remove('show');
    }, 4200);
  }

  function openDialog(trigger) {
    if (!dialog) return;
    /* a trigger inside the closed mobile menu can't take focus back */
    dialogTrigger = (trigger && mobileMenu && mobileMenu.contains(trigger) && menuToggle)
      ? menuToggle
      : (trigger || null);
    closeMenu();
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
    body.classList.add('dialog-open');
  }

  function closeDialog() {
    if (!dialog || !dialog.open) return;
    if (typeof dialog.close === 'function') {
      dialog.close();
    } else {
      dialog.removeAttribute('open');
      afterDialogClose();
    }
  }

  function afterDialogClose() {
    body.classList.remove('dialog-open');
    if (confirmPending) {
      confirmPending = false;
      if (form && typeof form.reset === 'function') form.reset();
      showToast();
    }
    if (dialogTrigger && typeof dialogTrigger.focus === 'function') {
      dialogTrigger.focus();
    }
    dialogTrigger = null;
  }

  document.addEventListener('click', function (event) {
    if (!event.target || typeof event.target.closest !== 'function') return;
    var trigger = event.target.closest('.open-demo');
    if (trigger) openDialog(trigger);
  });

  if (dialog) {
    dialog.addEventListener('close', afterDialogClose);
  }

  if (form) {
    form.addEventListener('submit', function (event) {
      /* the dialog's close button (value="cancel") closes silently */
      if (event.submitter && event.submitter.value === 'cancel') return;
      /* constraint validation has passed at this point */
      confirmPending = true;
    });
  }

  /* ------------------------------------------------------------------ *
   *  Platform tabs — one panel, four swap-in views                      *
   * ------------------------------------------------------------------ */
  var PRODUCTS = {
    rent: {
      label: 'Collection workflow',
      title: 'Rent without<br />the chase.',
      copy: 'Give residents a clear payment path, record incoming rent, and understand collection status without piecing together multiple tools.',
      details: [
        ['One view', 'Payment status'],
        ['Clear record', 'Receipts attached'],
        ['Ready', 'For review']
      ]
    },
    residents: {
      label: 'Resident operations',
      title: 'Every resident,<br />in context.',
      copy: 'Keep conversations, renewals, documents, and resident history on one connected record, so the next step is always clear to whoever acts on it.',
      details: [
        ['One record', 'Resident history'],
        ['Tracked', 'Renewals on time'],
        ['Attached', 'Notes & files']
      ]
    },
    repairs: {
      label: 'Maintenance workflow',
      title: 'Repairs that<br />move to done.',
      copy: 'From first request to confirmed outcome, every repair keeps its owner, evidence, and updates in one visible thread the whole team can follow.',
      details: [
        ['Assigned', 'Clear ownership'],
        ['One thread', 'Updates kept'],
        ['Confirmed', 'Closed with proof']
      ]
    },
    documents: {
      label: 'Records workflow',
      title: 'Paperwork,<br />without the pile.',
      copy: 'Leases, notices, and records live in one organized library, shared with the right people and retrievable in seconds when something is disputed.',
      details: [
        ['One library', 'Everything filed'],
        ['Right people', 'Shared access'],
        ['Retrievable', 'In seconds']
      ]
    }
  };

  var tabs = Array.prototype.slice.call(document.querySelectorAll('.product-tabs button'));
  var panel = document.getElementById('productPanel');
  var labelEl = document.getElementById('productLabel');
  var titleEl = document.getElementById('productTitle');
  var copyEl = document.getElementById('productCopy');
  var detailsEl = document.getElementById('productDetails');
  var activeTab = null;

  function renderProduct(key) {
    var data = PRODUCTS[key];
    if (!data || !panel) return;
    if (labelEl) labelEl.textContent = data.label;
    if (titleEl) titleEl.innerHTML = data.title;
    if (copyEl) copyEl.textContent = data.copy;
    if (detailsEl) {
      detailsEl.innerHTML = data.details.map(function (pair) {
        return '<div><dt>' + pair[0] + '</dt><dd>' + pair[1] + '</dd></div>';
      }).join('');
    }
  }

  function selectTab(tab, moveFocus) {
    if (!tab || tab === activeTab) {
      if (tab && moveFocus) tab.focus();
      return;
    }
    tabs.forEach(function (candidate) {
      var selected = candidate === tab;
      candidate.setAttribute('aria-selected', selected ? 'true' : 'false');
      candidate.setAttribute('tabindex', selected ? '0' : '-1');
    });
    if (panel) panel.setAttribute('aria-labelledby', tab.id);
    activeTab = tab;
    renderProduct(tab.getAttribute('data-product'));
    if (panel) {
      panel.classList.remove('is-changing');
      void panel.offsetWidth; /* restart the swap-in animation */
      panel.classList.add('is-changing');
    }
    if (moveFocus) tab.focus();
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener('click', function () {
      selectTab(tab, false);
    });
    tab.addEventListener('keydown', function (event) {
      var next = null;
      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          next = tabs[(index + 1) % tabs.length];
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          next = tabs[(index - 1 + tabs.length) % tabs.length];
          break;
        case 'Home':
          next = tabs[0];
          break;
        case 'End':
          next = tabs[tabs.length - 1];
          break;
        default:
          return;
      }
      event.preventDefault();
      selectTab(next, true);
    });
  });

  activeTab = tabs.filter(function (tab) {
    return tab.getAttribute('aria-selected') === 'true';
  })[0] || tabs[0] || null;

  /* ------------------------------------------------------------------ *
   *  India rollout-planning market selector                             *
   * ------------------------------------------------------------------ */
  var marketButtons = Array.prototype.slice.call(document.querySelectorAll('.market-options button'));
  var selectedMarket = document.getElementById('selectedMarket');
  var selectedMarketCode = document.getElementById('selectedMarketCode');
  var selectedMarketCopy = document.getElementById('selectedMarketCopy');

  function selectMarket(button, moveFocus) {
    if (!button) return;
    marketButtons.forEach(function (candidate) {
      candidate.setAttribute('aria-pressed', candidate === button ? 'true' : 'false');
    });
    var name = button.getAttribute('data-market');
    var code = button.getAttribute('data-code');
    if (selectedMarket) selectedMarket.textContent = name;
    if (selectedMarketCode) selectedMarketCode.textContent = code;
    if (selectedMarketCopy) {
      selectedMarketCopy.textContent = name + ' selected for rollout planning. Location, operating requirements, and availability are confirmed with your team.';
    }
    if (moveFocus) button.focus();
  }

  marketButtons.forEach(function (button, index) {
    button.addEventListener('click', function () { selectMarket(button, false); });
    button.addEventListener('keydown', function (event) {
      var nextIndex = null;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % marketButtons.length;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + marketButtons.length) % marketButtons.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = marketButtons.length - 1;
      if (nextIndex === null) return;
      event.preventDefault();
      selectMarket(marketButtons[nextIndex], true);
    });
  });
})();