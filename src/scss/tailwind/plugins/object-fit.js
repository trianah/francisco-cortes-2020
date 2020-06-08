module.exports = function(variants = ["responsive"]) {
  const utils = {
    ".object-cover": {
      "object-fit": "cover",
      "font-family": "'object-fit: cover'"
    },
    ".object-fill": {
      "object-fit": "fill",
      "font-family": "'object-fit: fill'"
    },
    ".object-none": {
      "object-fit": "none",
      "font-family": "'object-fit: none'"
    },
    ".object-scale-down": {
      "object-fit": "scale-down",
      "font-family": "'object-fit: scale-down'"
    },
    ".object-contain": {
      "object-fit": "contain",
      "font-family": "'object-fit: contain'"
    },
    ".object-fit-center": {
      "object-position": "center center",
      "font-family": "'object-position: center center'"
    }
  };

  return function({ addUtilities }) {
    addUtilities(utils, variants);
  };
};
