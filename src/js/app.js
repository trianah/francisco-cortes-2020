import { loadApp, loadModule } from "@spon/core";
import { eventBus } from "@spon/plugins";
import barba from "@barba/core";
import barbaCss from "@barba/css";
import "lazysizes";
import Header from "@/behaviours/Header";
import Modal from "@/behaviours/Modal";
import SetVh from "@/behaviours/SetVh";
import "@/plugins/logger";
import webfontloader from "@/plugins/webfontloader";
import views from "@/views";
import detectTab from "@/utils/detectTab";
import activeLinks from "@/utils/activeLinks";
import localLinks from "@/utils/localLinks";

if (module.hot) {
  module.hot.accept();
}

webfontloader();

// load from data-behaviours
const app = loadApp(name => import(`./behaviours/${name}`), document.body);

loadModule({
  module: Header,
  id: "header",
  node: document.querySelector("header"),
  keepAlive: true
});

loadModule({
  module: Modal,
  id: "modal",
  node: document.body,
  keepAlive: true
});

loadModule({
  module: SetVh,
  id: "set-vh",
  node: document.body,
  keepAlive: true
});

detectTab();

barba.use(barbaCss);

barba.init({
  transitions: views,
  prefetchIgnore: true,
  preventRunning: false,
  timeout: 10000
});

barba.hooks.after(({ next }) => {
  app.hydrate(next.container);
});

barba.hooks.leave(() => {
  app.destroy();
  eventBus.emit("page:exited");
});

barba.hooks.enter(({ next, trigger }) => {
  window.scrollTo(0, 0);

  eventBus.emit("page:entered", next);

  const {
    url: { path }
  } = next;
  const segments = path.split("/");
  const firstSegment = segments[1].length ? segments[1] : "home";

  document.documentElement.setAttribute("data-section", firstSegment);
  document.documentElement.setAttribute("data-segments", segments.length - 1);

  activeLinks(path, trigger);
  localLinks(next.html);
});
