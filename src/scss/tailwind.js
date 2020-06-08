const R = require("ramda");
const { numRange } = require("./tailwind/tailwind.utils");
const { backgroundSize } = require("./tailwind/backgrounds");
const { borderRadius, borderWidth } = require("./tailwind/borders");
const { colors } = require("./tailwind/colors");
const { zIndex } = require("./tailwind/layout");
const { opacity, boxShadow, fill, stroke } = require("./tailwind/misc");
const { screens } = require("./tailwind/screens");
const {
  width,
  minWidth,
  maxWidth,
  height,
  minHeight,
  maxHeight
} = require("./tailwind/sizing");
const { margin, padding } = require("./tailwind/spacing");
const {
  fontFamily,
  fontWeight,
  lineHeight,
  letterSpacing,
  fontSize
} = require("./tailwind/typography");

module.exports = {
  theme: {
    extend: {
      margin,
      padding,
      colors,
      backgroundColor: theme => theme("colors"),
      borderColor: theme => theme("colors"),
      textColor: theme => theme("colors"),
      fontSize,
      backgroundSize,
      borderRadius,
      borderWidth,
      zIndex,
      opacity,
      boxShadow,
      fill,
      stroke,
      screens,
      width,
      minWidth,
      maxWidth,
      height,
      minHeight,
      maxHeight,
      fontFamily,
      fontWeight,
      lineHeight,
      letterSpacing
    }
  },
  variants: {
    alignContent: ["responsive"],
    alignItems: ["responsive"],
    alignSelf: ["responsive"],
    appearance: ["responsive"],
    backgroundAttachment: ["responsive"],
    backgroundColor: ["responsive", "hover", "focus"],
    backgroundPosition: ["responsive"],
    backgroundRepeat: ["responsive"],
    backgroundSize: ["responsive"],
    borderCollapse: ["responsive"],
    borderColor: ["responsive", "hover", "focus"],
    borderRadius: ["responsive"],
    borderStyle: ["responsive"],
    borderWidth: ["responsive"],
    boxShadow: ["responsive", "hover", "focus"],
    cursor: ["responsive"],
    display: ["responsive"],
    fill: ["responsive"],
    flex: ["responsive"],
    flexDirection: ["responsive"],
    flexGrow: ["responsive"],
    flexShrink: ["responsive"],
    flexWrap: ["responsive"],
    fontFamily: ["responsive"],
    fontSize: ["responsive"],
    fontSmoothing: ["responsive"],
    fontStyle: ["responsive"],
    fontWeight: ["responsive", "hover", "focus"],
    height: ["responsive"],
    inset: ["responsive"],
    justifyContent: ["responsive"],
    letterSpacing: ["responsive"],
    lineHeight: ["responsive"],
    listStylePosition: [],
    listStyleType: [],
    margin: ["responsive"],
    maxHeight: ["responsive"],
    maxWidth: ["responsive"],
    minHeight: ["responsive"],
    minWidth: ["responsive"],
    objectFit: ["responsive"],
    objectPosition: ["responsive"],
    opacity: ["responsive", "hover", "focus"],
    order: ["responsive"],
    outline: ["responsive", "focus"],
    overflow: ["responsive"],
    padding: ["responsive"],
    pointerEvents: ["responsive"],
    position: ["responsive"],
    resize: [],
    stroke: ["responsive"],
    tableLayout: ["responsive"],
    textAlign: ["responsive"],
    textColor: ["responsive", "hover", "focus"],
    textDecoration: ["responsive", "hover", "focus"],
    textTransform: ["responsive"],
    userSelect: ["responsive"],
    verticalAlign: ["responsive"],
    visibility: ["responsive"],
    whitespace: ["responsive"],
    width: ["responsive"],
    wordBreak: [],
    zIndex: ["responsive"]
  },
  corePlugins: {
    float: false
  },
  plugins: [
    // https://github.com/bradlc/tailwindcss-alpha
    require("tailwindcss-alpha")({
      modules: {
        backgroundColors: true,
        borderColors: true,
        textColors: true
      },
      alpha: ((from, to) =>
        R.reduce((acc, curr) => {
          acc[`${curr * 10}`] = curr / 10;
          return acc;
        }, {})(numRange(from, to, value => value)))(0, 10)
    }),
    require("tailwindcss-visuallyhidden")(),
    require("./tailwind/plugins/order")(),
    require("./tailwind/plugins/object-fit")(),
    require("./tailwind/plugins/rotate")(),
    require("./tailwind/plugins/translate3d")([
      "responsive",
      "hover",
      "group-hover"
    ]),
    require("./tailwind/plugins/transition")(["responsive", "hover"]),
    require("@tailwindcss/ui")
  ]
};
