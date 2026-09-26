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

## Deployment

The GitHub Pages workflow packages the root site files (`index.html`,
`styles.css`, `app.js`, and `assets/`) into a clean deployment artifact. It
validates required files and local asset references before uploading.

Run the same validation locally with:

```bash
python3 scripts/check_site.py .
```

To publish, commit the root site files and workflow changes, push to `main`,
and configure GitHub Pages to use **GitHub Actions** as its source.

## Structure

```text
thatjoint/
├── .github/workflows/static.yml
├── assets/
├── app.js
├── index.html
├── scripts/check_site.py
├── styles.css
├── README.md
└── docs/DESIGN-NOTES.md
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