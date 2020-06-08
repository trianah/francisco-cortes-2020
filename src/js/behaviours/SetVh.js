import { withPlugins, device } from "@spon/plugins";

function SetVh({ plugins: { device } }) {
  let vh = window.innerHeight * 0.01;

  function setVertHeight() {
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  setVertHeight();

  device.resize(() => setVertHeight());
}

export default withPlugins(device)(SetVh);
