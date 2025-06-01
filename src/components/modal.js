const popups = document.querySelectorAll(".popup");
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

popups.forEach((modal) => {
  modal.classList.add("popup_is-animated");
  modal.addEventListener("click", (evt) => {
    if (
      evt.target.classList.contains("popup_is-opened") ||
      evt.target.classList.contains("popup__close")
    ) {
      closeModal(modal);
    }
  });
});

export { closeModal, openModal };
