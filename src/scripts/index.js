import "../pages/index.css";
import { initialCards } from "../components/cards.js";
import { createCards, deleteCard, likeCard } from "../components/card.js";
import { closeModal, openModal } from "../components/modal.js";

const cardsContainer = document.querySelector(".places__list");
const popups = document.querySelectorAll(".popup");
const profileAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupEdit = document.querySelector(".popup_type_edit");
const popupImages = document.querySelector(".popup_type_image");
const formEditProfile = document.forms["edit-profile"];
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;
const formAddCards = document.forms["new-place"];
const namePlaceInput = formAddCards.elements["place-name"];
const linkImageInput = formAddCards.elements.link;
const nameProfile = document.querySelector(".profile__title");
const jobProfile = document.querySelector(".profile__description");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

const editProfile = (evt) => {
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;
  nameProfile.textContent = name;
  jobProfile.textContent = job;
  closeModal(popupEdit);
};

const addCards = (evt) => {
  evt.preventDefault();
  const nameValue = namePlaceInput.value;
  const linkValue = linkImageInput.value;
  const card = createCards(
    { name: nameValue, link: linkValue },
    deleteCard,
    likeCard,
    openImage
  );
  cardsContainer.prepend(card);
  formAddCards.reset();
  closeModal(popupNewCard);
};

const openImage = (evt) => {
  const currentSrcImage = evt.target.getAttribute("src");
  const currentAltImage = evt.target.getAttribute("alt");
  popupImage.setAttribute("src", currentSrcImage);
  popupImage.setAttribute("alt", currentAltImage);
  popupCaption.textContent = currentAltImage;
  openModal(popupImages);
};

initialCards.forEach((item) => {
  const card = createCards(item, deleteCard, likeCard, openImage);
  cardsContainer.append(card);
});

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

profileAddButton.addEventListener("click", () => {
  openModal(popupNewCard);
});

profileEditButton.addEventListener("click", () => {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  openModal(popupEdit);
});

formEditProfile.addEventListener("submit", editProfile);

formAddCards.addEventListener("submit", addCards);
