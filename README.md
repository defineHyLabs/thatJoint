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
cd /Users/chirag/Desktop/thatjoint
python3 -m http.server 8000 --directory dist
```

Open `http://localhost:8000`.

## Structure

```text
thatjoint/
├── README.md
├── docs/DESIGN-NOTES.md
└── dist/
    ├── assets/
    │   ├── thatjoint-logo.png
    │   └── thatjoint-property.png
    ├── app.js
    ├── index.html
    └── styles.css
```

## Interactions

- Animated loader and hero entrance
- GSAP/ScrollTrigger reveals, counters, parallax, and chart animation
- Native scrolling with fixed-header anchor offsets
- Keyboard-accessible product tabs
- Interactive U.S. market selector (50 states, D.C., and Puerto Rico)
- Full-screen responsive menu
- Native pilot-request dialog and local confirmation toast
- Reduced-motion support

## Production notes

- The pilot form is a frontend prototype and does not send or store data. Connect it to a backend or CRM before accepting submissions.
- Google Fonts and animation libraries are loaded from external CDNs. The page remains readable and functional if those libraries fail, but it uses system fonts and reduced motion.
- Replace the contact email if `hello@thatjoint.com` is not the intended production mailbox.