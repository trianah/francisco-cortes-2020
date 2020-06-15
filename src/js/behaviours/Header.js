import { domEvents, withPlugins, eventBus } from "@spon/plugins";
import Headroom from "headroom.js";
import gsap from "gsap";
import toggle from "@/ui/Toggle";
// import accordion from '@/ui/Accordion'

function Header({ node, name, plugins: { addEvents } }) {
  // Main Mobile Menu START
  let windowTop = 0;
  const nav = toggle({
    button: node.querySelector(".o-burger"),
    name,
    activeClass: "is-active"
  });

  const lock = {
    capture() {
      windowTop = window.pageYOffset;
      gsap.set(document.body, {
        position: "fixed",
        height: "100%",
        top: `${windowTop * -1}px`,
        overflow: "hidden",
        width: "100%"
      });
    },
    release() {
      gsap.set(document.body, {
        position: "",
        height: "",
        top: "",
        overflow: "",
        width: ""
      });

      window.scrollTo = (0, windowTop);
    }
  };

  nav.init();

  nav.on(`open:${name}`, ({ target }) => {
    node.classList.add("is-open");
    target.classList.add("is-open");

    eventBus.emit("menu:open");

    lock.capture();
  });

  nav.on(`close:${name}`, ({ target }) => {
    node.classList.remove("is-open");
    target.classList.remove("is-open");

    eventBus.emit("menu:close");

    lock.release();
  });

  eventBus.on("page:exited", nav.close);
  // Main Mobile Menu END

  // Headroom
  const options = {
    // vertical offset in px before element is first unpinned
    offset: 0,
    // or you can specify tolerance individually for up/down scroll
    tolerance: {
      up: 5,
      down: 0
    }
  };
  const headroom = new Headroom(node, options);
  headroom.init();
  eventBus.on("menu:open", () => headroom.freeze());
  eventBus.on("menu:close", () => headroom.unfreeze());

  /*
		START - Mobile Accordion (if multi-level)
	*/
  // const menuAccordion = accordion({
  // 	node,
  // 	closeOthers: true,
  // 	activeIndex: false
  // })

  // device.at('(max-width: 768px)', {
  // 	on: () => {
  // 		menuAccordion.init()
  // 	},

  // 	off: () => {
  // 		if (menuAccordion) menuAccordion.destroy()
  // 	}
  // })
  const mainNavLinks = node.querySelectorAll("[main-nav-link]");

  function updateNavLinks(e, el) {
    mainNavLinks.forEach(n => {
      if (n === el) {
        n.classList.add("is-active");
      } else {
        n.classList.remove("is-active");
      }
    });
  }

  addEvents({
    "click [main-nav-link]": updateNavLinks
  });
}

export default withPlugins(domEvents)(Header);
