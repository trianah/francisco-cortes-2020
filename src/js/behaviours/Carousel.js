import Flickity from "flickity";

function Carousel({ node }) {
  const options = {
    cellAlign: "left",
    contain: false,
    pageDots: false,
    wrapAround: true,
    prevNextButtons: false,
    cellSelector: ".c-carousel__item"
  };

  // const options = node.dataset.carouselOptions ? JSON.parse(node.dataset.carouselOptions) : {}

  // const combinedOptions = { ...defaultOptions, ...options }

  // console.log(combinedOptions)

  const carousel = new Flickity(node, options);

  return () => {
    carousel.destroy();
  };
}

export default Carousel;
