// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const cardsList = document.querySelector('.places__list');

function createCard(cardData) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__image').src = cardData.link;

  deleteButton.addEventListener('click', () => {
    const currentCard = deleteButton.closest('.card');
    currentCard.remove();
  });

  return cardElement;
}

initialCards.forEach(item => {
  const card = createCard(item);
  cardsList.append(card);
});

