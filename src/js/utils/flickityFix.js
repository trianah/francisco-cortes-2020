/* iOS 13 introduced changes that make Flickity quite buggy
 * Import this fix into app.js if you're using the Flickity
 * `import flickityFix from '@/utils/flickityFix'`
 * `flickityFix();`
 */

export default () => {
  let touchingCarousel = false;
  let touchStartCoords;

  document.body.addEventListener("touchstart", e => {
    if (e.target.closest(".flickity-slider")) {
      touchingCarousel = true;
    } else {
      touchingCarousel = false;
      return;
    }

    touchStartCoords = {
      x: e.touches[0].pageX,
      y: e.touches[0].pageY
    };
  });

  document.body.addEventListener(
    "touchmove",
    e => {
      if (!(touchingCarousel && e.cancelable)) {
        return;
      }

      const moveVector = {
        x: e.touches[0].pageX - touchStartCoords.x,
        y: e.touches[0].pageY - touchStartCoords.y
      };

      if (Math.abs(moveVector.x) > 7) e.preventDefault();
    },
    { passive: false }
  );
};
