import { addLike, removeLike, deleteCard } from "./api.js";

let idCardForDelete;
let сardForDelete;

const handleDeleteClick = (id, card) => {
  idCardForDelete = id;
  сardForDelete = card;
  deleteCard(idCardForDelete);
  сardForDelete.remove();
};

const likeCard = (cardId, likeButton, likeCount) => {
  if (likeButton.classList.contains("card__like-button_is-active")) {
    removeLike(cardId).then((cardData) => {
      if (cardData.likes.length === 0) {
        likeCount.textContent = "";
      } else {
        likeCount.textContent = cardData.likes.length;
      }
    });
    likeButton.classList.remove("card__like-button_is-active");
  } else {
    addLike(cardId).then((cardData) => {
      likeCount.textContent = cardData.likes.length;
    })
    .catch((err) => {
      console.log(err); 
    });
    likeButton.classList.add("card__like-button_is-active");
  }
};

const newCard = (userId, cardData, likeCard, openImage, handleDeleteClick) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector(".card__like-count");
  const ownerCardId = cardData.owner._id;
  const userLikeInfo = cardData.likes;

  userLikeInfo.forEach((user) => {
    if (user._id === ownerCardId) {
      likeButton.classList.add("card__like-button_is-active");
    }
  });

  if (cardData.likes.length !== 0) {
    likeCount.textContent = cardData.likes.length;
  }

  if (userId !== ownerCardId) {
    deleteButton.style.display = "none";
  }
  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  deleteButton.addEventListener("click", () => {
    handleDeleteClick(cardData._id, cardElement);
  });

  likeButton.addEventListener("click", () => {
    likeCard(cardData._id, likeButton, likeCount);
  });

  cardImage.addEventListener("click", () => {
    openImage(cardData);
  });

  return cardElement;
};

export { newCard, likeCard, handleDeleteClick };
