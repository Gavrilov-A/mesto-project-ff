import "../pages/index.css";
import { initialCards } from "../components/cards.js";
import { createCards, deleteCard, likeCard } from "../components/card.js";
import { closeModal, openModal } from "../components/modal.js";

const cardsContainer = document.querySelector(".places__list");
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

const handleFormSubmit = (evt) => {
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;
  document.querySelector(".profile__title").textContent = name;
  document.querySelector(".profile__description").textContent = job;
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
  const image = document.querySelector(".popup__image");
  const currentSrcImage = evt.target.getAttribute("src");
  const currentAltImage = evt.target.getAttribute("alt");
  console.log(currentSrcImage);
  image.setAttribute("src", currentSrcImage);
  image.setAttribute("alt", currentAltImage);
  openModal(popupImages);
};

initialCards.forEach((item) => {
  const card = createCards(item, deleteCard, likeCard, openImage);
  cardsContainer.append(card);
});

profileAddButton.addEventListener("click", () => {
  openModal(popupNewCard);
});

profileEditButton.addEventListener("click", () => {
  nameInput.value = document.querySelector(".profile__title").textContent;
  jobInput.value = document.querySelector(".profile__description").textContent;
  openModal(popupEdit);
});

formEditProfile.addEventListener("submit", handleFormSubmit);

formAddCards.addEventListener("submit", addCards);

