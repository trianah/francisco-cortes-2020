import local from "local-links";

export default () => {
  [...document.querySelectorAll("a")]
    .filter(
      a =>
        local.isLocal("click", a, true) === null &&
        a.href !== window.location.href
    )
    .forEach(a => {
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener");
    });
};
