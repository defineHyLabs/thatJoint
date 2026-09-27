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
  var operationsCarousel = initOperationsCarousel();

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
      platformMotion();
      intelligenceIn();
      enableOperationsScroll(operationsCarousel);
      return;
    }

    if (hasIO) {
      body.classList.add('motion-ready');
      observeReveals();
      observePlatform();
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

  function platformMotion() {
    var section = document.querySelector('.products');
    var visualTrack = document.querySelector('.product-visual-track');
    if (!section) return;
    ScrollTrigger.create({
      trigger: section,
      start: 'top 82%',
      once: true,
      onEnter: function () { section.classList.add('platform-entered'); }
    });
    if (visualTrack) {
      gsap.fromTo(visualTrack, { yPercent: -2.5 }, {
        yPercent: 2.5,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 0.7 }
      });
    }
  }

  function initOperationsCarousel() {
    var track = document.getElementById('opsTrack');
    var previous = document.getElementById('opsPrev');
    var next = document.getElementById('opsNext');
    var progress = document.getElementById('opsProgress');
    var status = document.getElementById('opsStatus');
    var step = document.getElementById('opsStep');
    if (!track || !previous || !next) return;

    var slides = Array.prototype.slice.call(track.querySelectorAll('.ops-slide'));
    var activeIndex = 0;
    var scrollFrame = null;
    var scrollToSlide = null;

    function slideTitle(index) {
      var heading = slides[index] && slides[index].querySelector('h3');
      return heading ? heading.textContent : 'Feature';
    }

    function sync(index) {
      activeIndex = Math.max(0, Math.min(index, slides.length - 1));
      previous.disabled = activeIndex === 0;
      next.disabled = activeIndex === slides.length - 1;
      if (progress) progress.style.width = (((activeIndex + 1) / slides.length) * 100) + '%';
      if (step) step.textContent = pad(activeIndex + 1) + ' / ' + pad(slides.length);
      if (status) status.textContent = 'Step ' + (activeIndex + 1) + ' of ' + slides.length + ': ' + slideTitle(activeIndex) + '.';
    }

    function nearestSlide() {
      var firstOffset = slides[0] ? slides[0].offsetLeft : 0;
      var target = track.scrollLeft + firstOffset;
      var nearest = 0;
      var distance = Infinity;
      slides.forEach(function (slide, index) {
        var nextDistance = Math.abs(slide.offsetLeft - target);
        if (nextDistance < distance) { distance = nextDistance; nearest = index; }
      });
      sync(nearest);
    }

    function goTo(index) {
      var target = Math.max(0, Math.min(index, slides.length - 1));
      if (scrollToSlide) { scrollToSlide(target); return; }
      var firstOffset = slides[0] ? slides[0].offsetLeft : 0;
      track.scrollTo({ left: slides[target].offsetLeft - firstOffset, behavior: reduced ? 'auto' : 'smooth' });
      sync(target);
    }

    previous.addEventListener('click', function () { goTo(activeIndex - 1); });
    next.addEventListener('click', function () { goTo(activeIndex + 1); });
    track.addEventListener('keydown', function (event) {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      goTo(activeIndex + (event.key === 'ArrowRight' ? 1 : -1));
    });
    track.addEventListener('scroll', function () {
      if (scrollToSlide) return;
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      scrollFrame = window.requestAnimationFrame(function () { nearestSlide(); scrollFrame = null; });
    }, { passive: true });
    window.addEventListener('resize', function () {
      if (!scrollToSlide) nearestSlide();
    });
    sync(0);

    // Desktop scroll mode reuses the same controls; mobile and reduced-motion
    // keep the native, keyboard-accessible horizontal carousel.
    return {
      setScrollHandler: function (handler) {
        scrollToSlide = handler;
        if (!handler) nearestSlide();
      },
      sync: sync
    };
  }

  function enableOperationsScroll(controls) {
    var story = document.querySelector('.ops-story');
    var track = document.getElementById('opsTrack');
    if (!story || !track || !controls) return;

    var slides = Array.prototype.slice.call(track.querySelectorAll('.ops-slide'));
    if (slides.length < 2) return;

    var media = gsap.matchMedia();
    media.add('(min-width: 1101px) and (min-height: 600px) and (prefers-reduced-motion: no-preference)', function () {
      var last = slides.length - 1;
      var activeIndex = -1;
      story.classList.add('ops-story-active');
      track.scrollLeft = 0;

      // One card at a time; pauses leave room to read between transitions.
      var timeline = gsap.timeline({
        scrollTrigger: {
          trigger: story,
          start: 'top 92px',
          end: function () { return '+=' + timeline.duration() * Math.max(440, window.innerHeight * 0.68); },
          pin: true,
          scrub: 0.45,
          invalidateOnRefresh: true,
          onUpdate: function (self) {
            var index = Math.min(last, Math.floor(self.progress * timeline.duration() + 0.55));
            if (index === activeIndex) return;
            activeIndex = index;
            controls.sync(index);
          }
        }
      });

      timeline.addLabel('step-0', 0);
      for (var i = 1; i < slides.length; i += 1) {
        timeline.to(slides[i - 1], {
          yPercent: -12, scale: 0.93, opacity: 0, duration: 0.55, ease: 'power2.inOut'
        }, i - 1 + 0.18);
        timeline.fromTo(slides[i], { yPercent: 110 }, {
          yPercent: 0, duration: 0.55, ease: 'power2.inOut'
        }, i - 1 + 0.18);
        timeline.addLabel('step-' + i, i);
      }
      // Keep the final card visible before the section releases its pin.
      timeline.set({}, {}, last + 0.45);

      controls.setScrollHandler(function (index) {
        var trigger = timeline.scrollTrigger;
        window.scrollTo({
          top: trigger.start + (trigger.end - trigger.start) * timeline.labels['step-' + index] / timeline.duration(),
          behavior: 'smooth'
        });
      });

      return function () {
        controls.setScrollHandler(null);
        story.classList.remove('ops-story-active');
        gsap.set(slides, { clearProps: 'transform,opacity' });
      };
    });
  }

  function intelligenceIn() {
    var visual = document.querySelector('.intelligence-visual');
    if (!visual) return;
    gsap.from(visual.querySelectorAll('.portfolio-stage, .portfolio-context'), {
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

  function observePlatform() {
    var section = document.querySelector('.products');
    if (!section) return;
    var observer = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      section.classList.add('platform-entered');
      observer.disconnect();
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    observer.observe(section);
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
   *  Platform tabs — one operating system, four rental models           *
   * ------------------------------------------------------------------ */
  var PROPERTY_MODES = {
    'single-family': {
      number: '01', label: 'Single-family', cardSide: 'right', title: 'Every home.<br />One operating<br />rhythm.',
      copy: 'Keep rent, resident history, repairs, and documents connected to each address, so every home stays clear from move-in to renewal.',
      details: [['Connected', 'Home + resident'], ['Visible', 'Rent + repairs'], ['Ready', 'Renewal context']],
      app: {
        context: 'Single-family OS', title: 'Homes overview', action: 'Add home',
        nav: ['Overview', 'Homes', 'Residents', 'Rent', 'Repairs'],
        metrics: [['Homes', '24'], ['Occupied', '22'], ['Open repairs', '03']],
        columns: ['Property', 'Resident', 'Rent', 'Status'],
        rows: [['Oakview · 12A', 'Smith family', 'Paid', 'Healthy'], ['Riverside · 08', 'Gupta family', 'Due 18 Sep', 'Repair open'], ['Willow Lane · 31', 'Jensen family', 'Paid', 'Healthy']],
        railTitle: 'Today', rail: [['Rent received', '18 / 22'], ['Renewals due', '02'], ['New request', 'Kitchen sink']],
        footer: '24 homes connected to one operating timeline'
      }
    },
    communities: {
      number: '02', label: 'Communities', cardSide: 'right', title: 'One community.<br />Every detail<br />aligned.',
      copy: 'Give on-site and central teams the same view of occupancy, collections, resident conversations, and work across every unit in the community.',
      details: [['Shared', 'Team visibility'], ['Current', 'Unit status'], ['Coordinated', 'Resident service']],
      app: {
        context: 'PG + hostel desk', title: 'Beds & residents', action: 'New move-in',
        nav: ['Overview', 'Beds', 'Residents', 'Dues', 'Service'],
        metrics: [['Beds', '160'], ['Occupied', '142'], ['Arrivals today', '06']],
        columns: ['Building', 'Capacity', 'Occupied', 'Dues'],
        rows: [['Cedar PG · A', '48 beds', '44', '96% clear'], ['North House · B', '64 beds', '58', '07 pending'], ['Campus Hostel · C', '48 beds', '40', '92% clear']],
        railTitle: 'Front desk', rail: [['Move-ins', '06 today'], ['Beds to prepare', '04'], ['Resident requests', '09 open']],
        footer: 'Every bed, resident, due, and request in one desk'
      }
    },
    'short-term': {
      number: '03', label: 'Short-term', cardSide: 'left', title: 'Every stay.<br />Ready for<br />the next.',
      copy: 'Coordinate guest details, turnovers, maintenance, and property records in one continuous timeline built for faster operating cycles.',
      details: [['Timed', 'Stay + turnover'], ['Assigned', 'Service work'], ['Prepared', 'Next arrival']],
      app: {
        context: 'Hotel operations', title: 'Today’s stays', action: 'Add booking',
        nav: ['Today', 'Rooms', 'Guests', 'Turnovers', 'Maintenance'],
        metrics: [['Rooms', '48'], ['Ready', '42'], ['Arrivals', '14']],
        columns: ['Room', 'Guest', 'Turnover', 'Status'],
        rows: [['201 · King', 'A. Mehta', 'Complete', 'Checked in'], ['304 · Suite', 'L. Weber', '11:30', 'Arriving'], ['118 · Twin', '—', 'In progress', 'Cleaning']],
        railTitle: 'Next up', rail: [['Check-ins', '14 today'], ['Late checkout', '02'], ['Rooms blocked', '01']],
        footer: 'Live room readiness from checkout to next arrival'
      }
    },
    'portfolio-ops': {
      number: '04', label: 'Portfolio ops', cardSide: 'right', title: 'Every property.<br />One command<br />view.',
      copy: 'See the same connected operational story at property and portfolio level, so distributed teams can act locally while leadership sees the whole.',
      details: [['Unified', 'Portfolio signal'], ['Governed', 'Roles + records'], ['Scalable', 'Shared workflows']],
      app: {
        context: 'Portfolio command', title: 'Societies overview', action: 'View report',
        nav: ['Portfolio', 'Societies', 'Units', 'Collections', 'Work orders'],
        metrics: [['Societies', '12'], ['Units', '2,480'], ['Collections', '96%']],
        columns: ['Project', 'Units', 'Collected', 'Signal'],
        rows: [['Parkside Society', '640', '97%', 'On track'], ['The Grand Residences', '920', '94%', 'Review'], ['Lakeview Enclave', '480', '98%', 'On track']],
        railTitle: 'Portfolio signal', rail: [['Projects on track', '09 / 12'], ['Work orders', '38 open'], ['Leadership review', '03 items']],
        footer: 'One governed view across projects, societies, and teams'
      }
    }
  };

  var tabs = Array.prototype.slice.call(document.querySelectorAll('.product-tabs button'));
  var panel = document.getElementById('productPanel');
  var tabsEl = document.querySelector('.product-tabs');
  var panelContent = panel ? panel.querySelector('.product-panel-content') : null;
  var cardEl = panel ? panel.querySelector('.product-card') : null;
  var productAppFrame = document.getElementById('productAppFrame');
  var numberEl = document.getElementById('productNumber');
  var labelEl = document.getElementById('productLabel');
  var titleEl = document.getElementById('productTitle');
  var copyEl = document.getElementById('productCopy');
  var detailsEl = document.getElementById('productDetails');
  var activeTab = null;
  var resizeFrame = null;
  var transitionToken = 0;

  function renderProductApp(key) {
    var mode = PROPERTY_MODES[key];
    var app = mode && mode.app;
    if (!app || !productAppFrame) return;
    productAppFrame.setAttribute('data-mode', key);
    productAppFrame.setAttribute('aria-label', mode.label + ' management application wireframe');
    productAppFrame.innerHTML =
      '<aside class="app-sidebar">' +
        '<div class="app-mark"><i></i><b>THΛTJOINT</b></div>' +
        '<p>' + app.context + '</p>' +
        '<nav aria-label="' + mode.label + ' application navigation">' + app.nav.map(function (item, index) {
          return '<span class="' + (index === 0 ? 'is-current' : '') + '"><i></i>' + item + '</span>';
        }).join('') + '</nav>' +
        '<div class="app-user"><i>OS</i><span>Operations<small>Workspace</small></span></div>' +
      '</aside>' +
      '<div class="app-surface">' +
        '<header><div><span>Workspace / ' + app.context + '</span><h4>' + app.title + '</h4></div><button type="button" tabindex="-1">+ ' + app.action + '</button></header>' +
        '<div class="app-metrics">' + app.metrics.map(function (metric, index) {
          return '<article><span>0' + (index + 1) + ' / ' + metric[0] + '</span><strong>' + metric[1] + '</strong><i></i></article>';
        }).join('') + '</div>' +
        '<div class="app-workspace">' +
          '<section class="app-table-card"><div class="app-card-head"><b>Live workspace</b><span>● Synced now</span></div>' +
            '<div class="app-table-head">' + app.columns.map(function (column) { return '<span>' + column + '</span>'; }).join('') + '</div>' +
            '<div class="app-table-body">' + app.rows.map(function (row) {
              return '<div>' + row.map(function (cell, index) { return '<span class="cell-' + index + '">' + cell + '</span>'; }).join('') + '</div>';
            }).join('') + '</div>' +
          '</section>' +
          '<aside class="app-rail"><div class="app-card-head"><b>' + app.railTitle + '</b><span>Live</span></div>' +
            app.rail.map(function (item) { return '<div class="app-rail-item"><span>' + item[0] + '</span><strong>' + item[1] + '</strong></div>'; }).join('') +
            '<div class="app-mini-chart"><i></i><i></i><i></i><i></i><i></i><i></i></div>' +
          '</aside>' +
        '</div>' +
        '<footer><span>● Connected</span><p>' + app.footer + '</p><b>Live view ↗</b></footer>' +
      '</div>';
  }

  function renderPropertyMode(key) {
    var data = PROPERTY_MODES[key];
    if (!data || !panel) return;
    if (numberEl) numberEl.textContent = data.number;
    if (labelEl) labelEl.textContent = data.label;
    if (titleEl) titleEl.innerHTML = data.title;
    if (copyEl) copyEl.textContent = data.copy;
    if (detailsEl) {
      detailsEl.innerHTML = '';
      data.details.forEach(function (detail) {
        var item = document.createElement('div');
        var term = document.createElement('dt');
        var description = document.createElement('dd');
        term.textContent = detail[0];
        description.textContent = detail[1];
        item.appendChild(term);
        item.appendChild(description);
        detailsEl.appendChild(item);
      });
    }
    if (cardEl) cardEl.classList.toggle('product-card-left', data.cardSide === 'left');
    panel.classList.toggle('product-panel-card-left', data.cardSide === 'left');
    panel.setAttribute('data-mode', key);
    renderProductApp(key);
  }

  function positionTabIndicator(tab) {
    if (!tabsEl || !tab) return;
    tabsEl.style.setProperty('--indicator-x', tab.offsetLeft + 'px');
    tabsEl.style.setProperty('--indicator-width', tab.offsetWidth + 'px');
  }

  function keepTabVisible(tab) {
    if (!tabsEl || !tab || tabsEl.scrollWidth <= tabsEl.clientWidth) return;
    var target = tab.offsetLeft - ((tabsEl.clientWidth - tab.offsetWidth) / 2);
    tabsEl.scrollTo({ left: target, behavior: reduced ? 'auto' : 'smooth' });
  }

  function swapPanelContent(key) {
    transitionToken += 1;
    var token = transitionToken;
    if (!panelContent || reduced) {
      renderPropertyMode(key);
      if (panel) panel.removeAttribute('aria-busy');
      return;
    }
    panel.setAttribute('aria-busy', 'true');
    panelContent.classList.remove('is-entering');
    panelContent.classList.add('is-leaving');
    window.setTimeout(function () {
      if (token !== transitionToken) return;
      renderPropertyMode(key);
      panelContent.classList.remove('is-leaving');
      panelContent.classList.add('is-entering');
      void panelContent.offsetWidth;
      window.requestAnimationFrame(function () {
        if (token !== transitionToken) return;
        panelContent.classList.remove('is-entering');
      });
      window.setTimeout(function () {
        if (token !== transitionToken) return;
        panel.removeAttribute('aria-busy');
      }, 300);
    }, 180);
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
    positionTabIndicator(tab);
    keepTabVisible(tab);
    swapPanelContent(tab.getAttribute('data-mode'));
    if (moveFocus) tab.focus();
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener('click', function () { selectTab(tab, false); });
    tab.addEventListener('keydown', function (event) {
      var next = null;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = tabs[(index + 1) % tabs.length];
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = tabs[(index - 1 + tabs.length) % tabs.length];
      if (event.key === 'Home') next = tabs[0];
      if (event.key === 'End') next = tabs[tabs.length - 1];
      if (!next) return;
      event.preventDefault();
      selectTab(next, true);
    });
  });

  activeTab = tabs.filter(function (tab) { return tab.getAttribute('aria-selected') === 'true'; })[0] || tabs[0] || null;
  if (activeTab) {
    var initialMode = activeTab.getAttribute('data-mode');
    renderPropertyMode(initialMode);
    positionTabIndicator(activeTab);
  }

  window.addEventListener('resize', function () {
    if (resizeFrame) window.cancelAnimationFrame(resizeFrame);
    resizeFrame = window.requestAnimationFrame(function () {
      positionTabIndicator(activeTab);
      resizeFrame = null;
    });
  });

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
