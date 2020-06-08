import VanillaModal from "vanilla-modal";
import eventBus from "@/plugins/eventBus";

function Modal({ node }) {
  const base = {
    el: node,
    clickOutside: true,
    modal: ".modal",
    modalInner: ".modal-inner",
    modalContent: ".modal-content"
  };

  const modal = new VanillaModal(base);

  eventBus.on("modal:open", id => {
    modal.open(id);
  });

  return () => {
    modal.destroy();
  };
}

export default Modal;
