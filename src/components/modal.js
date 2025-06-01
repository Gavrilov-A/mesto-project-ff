let activeModal = null;

const closeModal = (popup) => {
  document.removeEventListener("keydown", pressButtonEsc);
  popup.classList.remove("popup_is-opened");
};

const openModal = (popup) => {
  activeModal = popup;
  document.addEventListener("keydown", pressButtonEsc);
  popup.classList.add("popup_is-opened");
};

const pressButtonEsc = (evt) => {
  if (evt.key === "Escape") {
    closeModal(activeModal);
  }
};

export { closeModal, openModal };
