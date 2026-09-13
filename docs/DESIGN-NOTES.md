# THATJOINT Design Notes

## Direction

This implementation uses the reference site's high-level visual language—large condensed typography, cool architectural imagery, stark editorial spacing, charcoal panels, purple conversion moments, pale green intelligence surfaces, and precise motion—without copying its logo, written copy, proprietary font, code, photography, illustrations, or Lottie assets.

## Palette

- Ink: `#2b2b2b`
- Black: `#111016`
- Paper: `#f4f4f1`
- Fog: `#e9edf0`
- Steel: `#7897a2`
- Purple: `#a459ff`
- Mint: `#cee9d4`

## Brand and assets

- Brand: THATJOINT
- Approved logo: copied unchanged from `/Users/chirag/Desktop/propertyflow-source/assets/logo_main.png`
- Property photograph: carried forward from the supplied PropertyFlow MVP
- The source logo has a solid dark canvas, so the implementation crops it responsively inside fixed-ratio containers rather than altering the approved file.

## Accessibility

- Semantic sections and heading order
- Skip navigation link
- Visible focus behavior inherited from browser controls
- ARIA-selected product tabs with arrow-key navigation
- Live selected-market and confirmation regions
- Native dialog semantics
- Menu state announced through `aria-expanded` and `aria-hidden`
- Reduced-motion stylesheet and runtime path

## Limitations

Helvetica Now Display and custom reference-site illustration/Lottie files were not available or licensed. Barlow Condensed, CSS geometry, and original interface compositions provide a close equivalent while keeping the implementation safe and maintainable.