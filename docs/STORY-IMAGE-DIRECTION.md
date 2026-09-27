# Shared operating layer — courtyard home concept

An original architectural miniature, generated using the built-in imagegen tool. The proposed pale stone, plaster, oak and sage palette is intended to sit naturally on the existing white section. The transparent silhouette gives the image room to move without revealing a rectangular background.

## References explored

- [Ant Studio — Floating House 2.0](https://ant.studio/portfolio-item/floating-house-2-0/): restrained massing, quiet materials and courtyard composition.
- [Arising Co — Blueprint Arising](https://www.thearising.co/work/blueprint-arising-concept): an example of architecture tied to scroll progress. Our proposed movement is limited to a subtle vertical drift; it does not use their blueprint-to-building sequence.
- [Made:Small](https://www.madesmall.co.uk/): the tactile, approachable scale-model direction.
- [Icons8 — Home Mini](https://icons8.com/illustrations/illustration/3d-mini-house): an alternative stylized stock direction, less appropriate to the site's realistic architectural images.

No reference-site assets are included in the concept.

## Preview

Open `http://localhost:8000/docs/story-concept.html#story` while running the repository's local server. The preview is a snapshot of the current page with a proposed image, restrained placement changes within this section, and gentle scroll-linked vertical motion. Its comparison control switches between the current section and the proposal. The root website files are not modified by this exploration.

Asset: `assets/story-courtyard-concept.png` (transparent PNG).

Proposed composition: the house is enlarged to 138% of its column and pushed past the outer viewport edge, echoing the oversized crop of the original section while keeping the text clear.

Proposed motion: 36 pixels total vertical travel over the section's passage through the viewport, no rotation or continuous idle animation. Reduced-motion preferences disable the drift. Mobile uses a smaller movement range.

## Generation prompt

```text
Use case: stylized-concept
Asset type: original architectural image for THATJOINT, a premium rental operations website, in a white editorial section with large charcoal condensed typography.
Primary request: Create one exquisitely crafted, original architectural miniature of a contemporary two-storey courtyard home. A calm, believable dwelling with a distinctive offset L-shaped composition, pale warm limestone and soft white plaster volumes, slender dark bronze window frames, a recessed timber entrance, a small timber balcony and a sheltered garden court. Low flat roofs with one gently stepped volume, no pitched roof. Restrained sage-green planting, one small sculptural tree, fine ornamental grasses; architecture is the hero. Appropriate to modern urban homes in India without stereotypical decoration.
Style/medium: sophisticated photoreal architectural scale-model render, real material texture, precise slim edges, editorial warmth, high-end but lived-in. Not a toy, not a cartoon, not futuristic.
Composition/framing: elevated three-quarter view showing the front and right side, clear sculptural silhouette, the whole house and its small thin rectangular landscaped ground slab visible with comfortable margins on all sides. One compact cohesive model occupying most of canvas, approximately 4:3 landscape composition. Soft subtle contact shadow only. Strong readability when reduced to 650 pixels wide. The image will be floated beside text on a white web page and moved gently on scroll.
Lighting/mood: broad soft daylight from upper left, beautifully balanced soft shadows, neutral clean lighting, very subtle warmth through windows. No sunset or dramatic spotlight.
Color palette: chalk white, warm pale grey stone, natural muted oak, charcoal frames, soft olive and sage foliage. No saturated colors.
Background: truly transparent alpha background outside the miniature and its soft contact shadow, so the image blends seamlessly into a white website with no visible rectangular image edge.
Constraints: Original building design. No reference website asset copying. No text, logos, people, cars, icons, UI panels, connection lines, glowing halos, exploded layers, cutaway rooms, giant trees or mountain landscape. Entire model in frame, no cropped corners.
```
