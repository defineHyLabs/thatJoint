# THATJOINT Website

THATJOINT is a static marketing site for a connected rental-operations platform. It translates the editorial, architectural direction of The Foundation reference into an original THATJOINT experience using approved brand and property assets.

## Stack

- Semantic HTML5
- Responsive CSS3
- Vanilla JavaScript
- GSAP 3.12.5 and ScrollTrigger (progressively enhanced via CDN)
- Native browser scrolling for immediate wheel, trackpad, touch, and keyboard control
- Google Fonts: Barlow Condensed and DM Sans

No package installation or build step is required.

## Run locally

```bash
cd /Users/chirag/Desktop/thatJoint
python3 -m http.server 8000
```

Open `http://localhost:8000`.

## Deployment & CI/CD

The repository implements automated CI/CD and Code Review via **GitHub Actions**:

1. **Automated Code Review (`.github/workflows/ci.yml`)**:
   - Executes on all Pull Requests and pushes targeting `main` or feature branches.
   - Audits JavaScript syntax (`node --check`) and Python compiler readiness.
   - Scans for leaked secrets/API keys, unsafe `eval()` or `document.write()` calls.
   - Enforces HTML5 semantic accessibility (DOCTYPE, lang, viewport, alt text) and design token consistency.
   - Simulates packaging into `_site/` to guarantee zero 404s or broken local assets.
   - Emits structured review dashboards to `$GITHUB_STEP_SUMMARY`.

2. **GitHub Pages Deployment (`.github/workflows/static.yml`)**:
   - Packages all root site files (`index.html`, `building-tour.html`, `chatbot.html`, `*.css`, `*.js`, `assets/`, `.nojekyll`) into a deployment artifact.
   - Validates the packaged artifact using `scripts/check_site.py` prior to publication.
   - Deploys directly to GitHub Pages via `actions/deploy-pages@v5`.

3. **Jekyll & GitHub Pages Compatibility**:
   - THΛTJOINT features a bespoke, dark-architectural design system with custom Barlow Condensed and DM Sans typography, a Three.js 3D spatial tour, and a Generative AI companion interface.
   - To prevent Jekyll themes (e.g. `jekyll-theme-primer`) from injecting conflicting layouts or stylesheets, `.nojekyll` is committed at the repository root and `_config.yml` explicitly sets `theme: ""`.
   - Set GitHub Pages build source to **GitHub Actions** in repository settings.

Run validation locally with:

```bash
# Run complete multi-layer code review & security audit
python3 scripts/code_review.py

# Run static link and reference validation
python3 scripts/check_site.py .
```

## Structure

```text
thatjoint/
├── .github/
│   └── workflows/
│       ├── ci.yml                 # PR & branch automated code review
│       └── static.yml             # GitHub Pages deployment workflow
├── assets/                        # High-resolution property and brand assets
├── scripts/
│   ├── check_site.py              # Reference and asset link integrity validator
│   └── code_review.py             # Multi-layer automated code review engine
├── .nojekyll                      # Prevents Jekyll theme collision on GitHub Pages
├── _config.yml                    # GitHub Pages metadata and theme override
├── app.js                         # Homepage interactive orchestration
├── building-tour.css              # 3D Tour styling and coordinate overlays
├── building-tour.html             # Dedicated 3D Architectural Building Tour
├── building-tour.js               # Three.js 3D building visualizer & floor selector
├── chatbot.css                    # Sentinel AI Companion styling & SVG animations
├── chatbot.html                   # Dedicated Generative AI Property Sentinel view
├── chatbot.js                     # Generative AI companion engine & multi-turn memory
├── index.html                     # Core platform homepage
├── styles.css                     # Design system foundation and typography
└── README.md
```

## Interactions

- Animated loader and hero entrance
- GSAP/ScrollTrigger reveals, counters, parallax, and chart animation
- Native scrolling with fixed-header anchor offsets
- Keyboard-accessible product tabs
- Interactive India rollout-planning selector for eight major property markets
- Full-screen responsive menu
- Native pilot-request dialog and local confirmation toast
- Reduced-motion support

## Production notes

- The pilot form is a frontend prototype and does not send or store data. Connect it to a backend or CRM before accepting submissions.
- Google Fonts and animation libraries are loaded from external CDNs. The page remains readable and functional if those libraries fail, but it uses system fonts and reduced motion.
- Replace the contact email if `hello@thatjoint.com` is not the intended production mailbox.