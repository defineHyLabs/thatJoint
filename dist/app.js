const states = [
  ["AL", "Alabama"], ["AK", "Alaska"], ["AZ", "Arizona"], ["AR", "Arkansas"],
  ["CA", "California"], ["CO", "Colorado"], ["CT", "Connecticut"], ["DE", "Delaware"],
  ["FL", "Florida"], ["GA", "Georgia"], ["HI", "Hawaii"], ["ID", "Idaho"],
  ["IL", "Illinois"], ["IN", "Indiana"], ["IA", "Iowa"], ["KS", "Kansas"],
  ["KY", "Kentucky"], ["LA", "Louisiana"], ["ME", "Maine"], ["MD", "Maryland"],
  ["MA", "Massachusetts"], ["MI", "Michigan"], ["MN", "Minnesota"], ["MS", "Mississippi"],
  ["MO", "Missouri"], ["MT", "Montana"], ["NE", "Nebraska"], ["NV", "Nevada"],
  ["NH", "New Hampshire"], ["NJ", "New Jersey"], ["NM", "New Mexico"], ["NY", "New York"],
  ["NC", "North Carolina"], ["ND", "North Dakota"], ["OH", "Ohio"], ["OK", "Oklahoma"],
  ["OR", "Oregon"], ["PA", "Pennsylvania"], ["RI", "Rhode Island"], ["SC", "South Carolina"],
  ["SD", "South Dakota"], ["TN", "Tennessee"], ["TX", "Texas"], ["UT", "Utah"],
  ["VT", "Vermont"], ["VA", "Virginia"], ["WA", "Washington"], ["WV", "West Virginia"],
  ["WI", "Wisconsin"], ["WY", "Wyoming"], ["DC", "District of Columbia"], ["PR", "Puerto Rico"]
];

const products = {
  rent: {
    label: "COLLECTION INTELLIGENCE",
    title: "Rent without<br />the chase.",
    copy: "Give every resident a clear payment path, verify incoming rent automatically, and see revenue status across the portfolio in real time.",
    stats: [["Collection status", "94%"], ["Reconciliation", "Automatic"], ["Monthly reporting", "Ready"]]
  },
  residents: {
    label: "RESIDENT OPERATIONS",
    title: "Every resident,<br />in context.",
    copy: "Keep leases, contact details, conversations, renewals, and building history together in one living resident record.",
    stats: [["Active residents", "318"], ["Renewals due", "12"], ["Records complete", "98%"]]
  },
  repairs: {
    label: "MAINTENANCE OPERATIONS",
    title: "Repairs that<br />close the loop.",
    copy: "Capture an issue, assign ownership, schedule the work, preserve evidence, and confirm the outcome with the resident.",
    stats: [["Open requests", "3"], ["Average response", "18 min"], ["Resident approval", "Tracked"]]
  },
  documents: {
    label: "DOCUMENT CONTROL",
    title: "Files that stay<br />useful.",
    copy: "Organize leases, identity files, inspections, and vendor documents with clear status, access controls, and expiry reminders.",
    stats: [["Documents", "1,482"], ["Verified", "96%"], ["Expiry alerts", "On"]]
  }
};

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const loader = document.getElementById("loader");
const loaderCount = document.getElementById("loaderCount");
const header = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const dialog = document.getElementById("demoDialog");
const demoForm = document.getElementById("demoForm");
const toast = document.getElementById("toast");

function completeLoader() {
  loader.classList.add("is-complete");
  window.setTimeout(() => loader.remove(), reducedMotion ? 0 : 1100);
}

if (reducedMotion) {
  completeLoader();
} else {
  const started = performance.now();
  const countLoader = (time) => {
    const progress = Math.min((time - started) / 1300, 1);
    loaderCount.textContent = String(Math.round(progress * 100)).padStart(2, "0");
    if (progress < 1) requestAnimationFrame(countLoader);
  };
  requestAnimationFrame(countLoader);
  window.addEventListener("load", () => window.setTimeout(completeLoader, 1350), { once: true });
  window.setTimeout(completeLoader, 3000);
}

function setMenu(open) {
  mobileMenu.classList.toggle("open", open);
  mobileMenu.setAttribute("aria-hidden", String(!open));
  menuToggle.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("menu-open", open);
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  if (open) mobileMenu.querySelector("a").focus({ preventScroll: true });
}

menuToggle.addEventListener("click", () => setMenu(!mobileMenu.classList.contains("open")));
mobileMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && mobileMenu.classList.contains("open")) setMenu(false);
});

window.addEventListener("scroll", () => header.classList.toggle("is-scrolled", window.scrollY > 30), { passive: true });

const stateGrid = document.getElementById("stateGrid");
const selectedCode = document.getElementById("selectedCode");
const selectedState = document.getElementById("selectedState");
const selectedStateCopy = document.getElementById("selectedStateCopy");

states.forEach(([abbreviation, name]) => {
  const button = document.createElement("button");
  button.type = "button";
  button.innerHTML = `<b>${abbreviation}</b><span>${name}</span>`;
  button.setAttribute("aria-label", `Select ${name}`);
  button.setAttribute("aria-pressed", String(abbreviation === "CA"));
  if (abbreviation === "CA") button.classList.add("active");
  button.addEventListener("click", () => {
    stateGrid.querySelectorAll("button").forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-pressed", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");
    selectedCode.textContent = abbreviation;
    selectedState.textContent = name;
    selectedStateCopy.textContent = `THATJOINT rollout workspace ready for ${name} portfolios.`;
  });
  stateGrid.appendChild(button);
});

const productContent = document.getElementById("productContent");
const productTabs = [...document.querySelectorAll("[data-product]")];

function selectProduct(tab) {
  productTabs.forEach((item) => {
    const active = item === tab;
    item.setAttribute("aria-selected", String(active));
    item.tabIndex = active ? 0 : -1;
  });
  const product = products[tab.dataset.product];
  productContent.setAttribute("aria-labelledby", tab.id);
  productContent.innerHTML = `
    <div class="product-stage-head"><p>${product.label}</p><i>● LIVE</i></div>
    <h3>${product.title}</h3>
    <p>${product.copy}</p>
    <div class="product-stats">${product.stats.map(([label, value]) => `<div><span>${label}</span><b>${value}</b></div>`).join("")}</div>`;
  productContent.classList.remove("is-changing");
  void productContent.offsetWidth;
  productContent.classList.add("is-changing");
}

productTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectProduct(tab));
  tab.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % productTabs.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + productTabs.length) % productTabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = productTabs.length - 1;
    productTabs[nextIndex].focus();
    selectProduct(productTabs[nextIndex]);
  });
});

document.querySelectorAll(".open-demo").forEach((button) => button.addEventListener("click", () => {
  if (mobileMenu.classList.contains("open")) setMenu(false);
  if (typeof dialog.showModal === "function") {
    dialog.showModal();
    document.body.classList.add("dialog-open");
  }
}));

dialog.addEventListener("click", (event) => {
  const bounds = dialog.getBoundingClientRect();
  const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
  if (outside) dialog.close("cancel");
});
dialog.addEventListener("close", () => document.body.classList.remove("dialog-open"));
demoForm.addEventListener("submit", (event) => {
  const submitterIsClose = event.submitter?.classList.contains("dialog-close");
  if (submitterIsClose) return;
  event.preventDefault();
  if (!demoForm.reportValidity()) return;
  dialog.close("submitted");
  demoForm.reset();
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 3800);
});

function splitHeadings() {
  document.querySelectorAll(".split-heading").forEach((heading) => {
    const nodes = [...heading.childNodes];
    nodes.forEach((node) => {
      if (node.nodeType !== Node.TEXT_NODE || !node.textContent.trim()) return;
      const fragment = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach((part) => {
        if (/^\s+$/.test(part)) {
          fragment.appendChild(document.createTextNode(part));
        } else if (part) {
          const outer = document.createElement("span");
          const inner = document.createElement("span");
          outer.className = "word";
          inner.textContent = part;
          outer.appendChild(inner);
          fragment.appendChild(outer);
        }
      });
      node.replaceWith(fragment);
    });
  });
}

splitHeadings();

function initNativeReveals() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.style.opacity = "1";
      entry.target.style.transform = "none";
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08 });
  document.querySelectorAll(".reveal").forEach((element) => {
    element.style.transition = "opacity .8s ease, transform .8s ease";
    observer.observe(element);
  });
}

function initMotion() {
  if (reducedMotion) {
    document.querySelectorAll(".reveal").forEach((element) => {
      element.style.opacity = "1";
      element.style.transform = "none";
    });
    document.querySelectorAll(".title-line span").forEach((element) => { element.style.transform = "none"; });
    return;
  }

  if (!window.gsap || !window.ScrollTrigger) {
    document.querySelectorAll(".title-line span").forEach((element) => { element.style.transform = "none"; });
    initNativeReveals();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  gsap.timeline({ delay: 1.65 })
    .to(".title-line span", { y: 0, duration: 1.15, stagger: .12, ease: "power4.out" })
    .fromTo(".hero-reveal", { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: .7, stagger: .1 }, "-=.55")
    .fromTo(".hero-cta", { xPercent: -100 }, { xPercent: 0, duration: .8, ease: "power3.out" }, "-=.45");

  gsap.to(".hero-media img", {
    yPercent: 9,
    scale: 1,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
  });

  gsap.utils.toArray(".reveal").forEach((element) => {
    gsap.to(element, {
      y: 0,
      opacity: 1,
      duration: .9,
      ease: "power3.out",
      scrollTrigger: { trigger: element, start: "top 88%", once: true }
    });
  });

  gsap.utils.toArray(".split-heading").forEach((heading) => {
    const words = heading.querySelectorAll(".word > span");
    gsap.from(words, {
      yPercent: 105,
      duration: .9,
      stagger: .025,
      ease: "power3.out",
      scrollTrigger: { trigger: heading, start: "top 84%", once: true }
    });
  });

  document.querySelectorAll(".count").forEach((counter) => {
    const target = Number(counter.dataset.count);
    const value = { current: 0 };
    gsap.to(value, {
      current: target,
      duration: 1.6,
      ease: "power2.out",
      onUpdate: () => { counter.textContent = Math.round(value.current); },
      scrollTrigger: { trigger: counter, start: "top 88%", once: true }
    });
  });

  gsap.from(".chart i", {
    scaleY: 0,
    duration: .9,
    stagger: .07,
    ease: "power3.out",
    scrollTrigger: { trigger: ".chart", start: "top 85%", once: true }
  });
}

initMotion();