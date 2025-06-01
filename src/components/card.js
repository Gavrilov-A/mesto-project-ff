const deleteCard = (card) => {
  const currentCard = card.target.closest(".card");
  currentCard.remove();
};

const likeCard = (evt) => {
  evt.target.classList.toggle("card__like-button_is-active");
};

function createCards(cardData, deleteCard, likeCard, openImage) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  deleteButton.addEventListener("click", deleteCard);

  likeButton.addEventListener("click", likeCard);

  cardImage.addEventListener("click", openImage);

  return cardElement;
}

export { deleteCard, createCards, likeCard };
