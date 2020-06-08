import FontFaceObserver from "fontfaceobserver";

export default () => {
  const $html = document.getElementsByTagName("html")[0];
  const regular = new FontFaceObserver("alternate_gothic_no3_dregular");

  Promise.all([regular.load()])
    .then(() => $html.classList.add("fonts-loaded"))
    .catch(() => $html.classList.add("fonts-failed"));
};
