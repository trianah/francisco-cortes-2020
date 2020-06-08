/**
 * Remove slashes from the start and end of a string
 * @param {string} str
 * @return {string}
 */
function stripSlashes(str) {
  return str.replace(/(^\/+|\/+$)/g, "");
}

export default path => {
  [...document.querySelectorAll("a.is-active, a.is-current")].forEach(link => {
    link.classList.remove("is-active", "is-current");
  });
  [...document.querySelectorAll("a")].forEach(link => {
    if (stripSlashes(link.pathname) === stripSlashes(path)) {
      link.classList.add("is-current");
    }
  });
};
