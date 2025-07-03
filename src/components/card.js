import { addLike, removeLike, deleteCard } from "./api.js";

const handleDeleteClick = (id, card) => {
  deleteCard(id)
    .then(() => {
      card.remove();
    })
    .catch((err) => {
      console.log(err);
    });
};

const likeCard = (cardId, likeButton, likeCount) => {
  if (likeButton.classList.contains("card__like-button_is-active")) {
    removeLike(cardId)
      .then((cardData) => {
        likeCount.textContent = cardData.likes.length;
        likeButton.classList.remove("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    addLike(cardId)
      .then((cardData) => {
        likeCount.textContent = cardData.likes.length;
        likeButton.classList.add("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const newCard = (
  userId,
  cardData,
  likeCard,
  openImageModal,
  handleDeleteClick
) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector(".card__like-count");
  const ownerCardId = cardData.owner._id;
  const userLikeInfo = cardData.likes;

  const objIdUser = userLikeInfo.reduce((result, userId) => {
    return {
      ...result,
      _id: userId._id,
    };
  }, {});

  if (userId !== objIdUser._id) {
    likeButton.classList.remove("card__like-button_is-active");
  } else {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeCount.textContent = cardData.likes.length;

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
    openImageModal(cardData);
  });

  return cardElement;
};

export { newCard, likeCard, handleDeleteClick };
