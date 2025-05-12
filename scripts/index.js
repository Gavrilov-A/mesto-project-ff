const cardsContainer = document.querySelector(".places__list");

const deleteCard = (evt) => {
  const currentCard = evt.target.closest(".card");
  currentCard.remove();
};

function createCard(cardData, deleteCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  deleteButton.addEventListener("click", deleteCard);

  return cardElement;
}

initialCards.forEach((item) => {
  const card = createCard(item, deleteCard);
  cardsContainer.append(card);
});
