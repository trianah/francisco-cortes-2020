import fitty from "fitty";

function FitText() {
  fitty("[data-fit]", {
    minSize: 12,
    maxSize: 300
  });
}

export default FitText;
