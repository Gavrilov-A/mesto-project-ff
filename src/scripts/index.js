import "../pages/index.css";
import { newCard, handleDeleteClick, likeCard } from "../components/card.js";
import { closeModal, openModal } from "../components/modal.js";
import {
  enableValidation,
  validationConfig,
  clearValidation,
} from "../components/validation.js";
import {
  getUserData,
  getAllCards,
  updataUserData,
  updataUserAvatar,
  createCard,
} from "../components/api.js";

const cardsContainer = document.querySelector(".places__list");
const popups = document.querySelectorAll(".popup");
const profileAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupEdit = document.querySelector(".popup_type_edit");
const popupImages = document.querySelector(".popup_type_image");
const popupDelete = document.querySelector(".popup_type_delete-card");
const popupUpdateAvatar = document.querySelector(".popup_type_update-avatar");
const formEditProfile = document.forms["edit-profile"];
const formEditAvatar = document.forms["update-avatar"];
const nameInput = formEditProfile.elements.name;
const aboutInput = formEditProfile.elements.description;
const formAddCards = document.forms["new-place"];
const namePlaceInput = formAddCards.elements["place-name"];
const linkImageInput = formAddCards.elements.link;
const inputAvatarUrl = formEditAvatar.elements["avatar-url"];
const nameProfile = document.querySelector(".profile__title");
const aboutProfile = document.querySelector(".profile__description");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const avatarProfile = document.querySelector(".profile__image");
let userId = null;

const editAvatar = (evt) => {
  evt.preventDefault();
  const urlAvatar = inputAvatarUrl.value;
  const but = popupUpdateAvatar.querySelector(".popup__button");
  but.textContent = "Сохранение...";
  updataUserAvatar(urlAvatar).then((profile) => {
    avatarProfile.style.backgroundImage = "url(" + profile.avatar + ")";
    but.textContent = "Сохранить";
  })
  .catch((err) => {
      console.log(err); 
  });
  closeModal(popupUpdateAvatar);
};

const editProfile = (evt) => {
  evt.preventDefault();
  const but = popupEdit.querySelector(".popup__button");
  but.textContent = "Редактирование...";
  const name = nameInput.value;
  const about = aboutInput.value;
  nameProfile.textContent = name;
  aboutProfile.textContent = about;
  updataUserData(name, about).then((user) => {
    nameProfile.textContent = user.name;
    aboutProfile.textContent = user.about;
    but.textContent = "Редактировать";
  })
  .catch((err) => {
      console.log(err); 
    });
  closeModal(popupEdit);
};

const addCards = (evt) => {
  evt.preventDefault();
  const nameCard = namePlaceInput.value;
  const linkCard = linkImageInput.value;
  const but = popupNewCard.querySelector(".popup__button");
  but.textContent = "Сохранение...";
  createCard(nameCard, linkCard).then((cardData) => {
    const card = newCard(
      cardData.owner._id,
      {
        name: nameCard,
        link: linkCard,
        owner: { _id: cardData.owner._id },
        likes: cardData.likes,
      },
      likeCard,
      openImage,
      handleDeleteClick
    );
    but.textContent = "Сохранить";
    cardsContainer.prepend(card);
  })
  .catch((err) => {
      console.log(err); 
    });

  formAddCards.reset();
  closeModal(popupNewCard);
};

const openImage = (cardData) => {
  popupImage.setAttribute("src", cardData.link);
  popupImage.setAttribute("alt", cardData.name);
  popupCaption.textContent = cardData.name;
  openModal(popupImages);
};

const initCards = () => {
  Promise.all([getAllCards(), getUserData()]).then(([cards, userData]) => {
    userId = userData._id;
    nameProfile.textContent = userData.name;
    aboutProfile.textContent = userData.about;
    avatarProfile.style.backgroundImage = "url(" + userData.avatar + ")";
    const cardsList = Array.from(cards);
    cardsList.forEach((cardData) => {
      const card = newCard(
        userId,
        cardData,
        likeCard,
        openImage,
        handleDeleteClick
      );
      cardsContainer.append(card);
    });
  })
  .catch((err) => {
      console.log(err); 
    });
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

profileAddButton.addEventListener("click", () => {
  clearValidation(formAddCards, validationConfig);
  openModal(popupNewCard);
});

profileEditButton.addEventListener("click", () => {
  clearValidation(formEditProfile, validationConfig);
  nameInput.value = nameProfile.textContent;
  aboutInput.value = aboutProfile.textContent;
  openModal(popupEdit);
});

avatarProfile.addEventListener("click", () => {
  clearValidation(formEditAvatar, validationConfig);
  openModal(popupUpdateAvatar);
});

formEditProfile.addEventListener("submit", editProfile);

formAddCards.addEventListener("submit", addCards);

formEditAvatar.addEventListener("submit", editAvatar);

enableValidation(validationConfig);

initCards();

export { handleDeleteClick };
