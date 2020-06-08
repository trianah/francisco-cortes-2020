import { domEvents, withPlugins } from "@spon/plugins";

function Video({ node, name, plugins: { addEvents } }) {
  function onClick(e, $el) {
    e.preventDefault();
    $el.classList.toggle("huzzah");
  }

  addEvents({
    "click [data-link]": onClick
  });

  log(this, node, name);

  return () => {
    log("i am called when the module is destroyed");
  };
}

export default withPlugins(domEvents)(Video);
