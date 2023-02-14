import { Card } from "./Cards.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards, validationConfig } from "./constants.js";

//Объявление глобальных переменных

//Объявление переменной списка карточек
const cardsContainer = document.querySelector('.elements');

//Объявление общих переменных для всех popup
const popups = Array.from(document.querySelectorAll('.popup'));

//Объявление переменных popup редактирования профиля
const popupChangesProfile = document.querySelector('.popup_changes-profile');
const popupFormChangesProfile = document.querySelector('.popup__form-changes-profile');
const popupInputValueName = document.querySelector('.popup__input_value_name');
const popupInputValueAbout = document.querySelector('.popup__input_value_about');

//Объявление переменных popup добаления карточек
const popupAddCard = document.querySelector('.popup_add-card');
const profileAddButton = document.querySelector('.profile__add-button');
const popupInputValueTitle = document.querySelector('.popup__input_value_title');
const popupInputValueImage = document.querySelector('.popup__input_value_image');
const popupFormAddCard = document.querySelector('.popup__form-add-card');
const formAddCard = popupAddCard.querySelector('.popup__form')

//Объявление переменных профиля
const profileUserName = document.querySelector('.profile__user-name');
const profileUserAbout = document.querySelector('.profile__user-about');
const profileEditorButton = document.querySelector('.profile__editor-button');

//Popup картинки
const imagePopup = document.querySelector('.popup_open-image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupParagraph = imagePopup.querySelector('.popup__paragraph');

//Создание экземляров класса FormValidator для каждой формы
const validatorFormChangesProfile = new FormValidator(validationConfig, popupFormChangesProfile);
const validatorFormAddCard = new FormValidator(validationConfig, popupFormAddCard);

//Функция открытия popup
function openPopup(popup) {
    popup.classList.add('popup_active');
    window.addEventListener('keydown', handleEsc);
}

const handleEsc = (evt) => {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_active'));
    }
}

//Функция заполения popup редактирования профиля
function openEditProfilePopup() {
    popupInputValueName.value = profileUserName.textContent;
    popupInputValueAbout.value = profileUserAbout.textContent;
    openPopup(popupChangesProfile);
    validatorFormChangesProfile.resetValidation()
}

//Функция редактирования профиля    
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileUserName.textContent = popupInputValueName.value;
    profileUserAbout.textContent = popupInputValueAbout.value;
    closePopup(popupChangesProfile);
}

//Submit формы добавления карточки
function handleCardFormSubmit(evt) {
    evt.preventDefault();
    addCard(createNewCard(popupInputValueTitle.value, popupInputValueImage.value));
    closePopup(popupAddCard);
}

function createNewCard(cardName, cardLink) {
    const newCard = new Card({
        name: cardName,
        link: cardLink
    }, '.card-billet', openImagePopup);
    return newCard.getCardElement()
}

//Функциядобавления popup в DOM 
function addCard(card) {
    cardsContainer.prepend(card);
}

//Функция закрытия popup
function closePopup(popup) {
    popup.classList.remove('popup_active');
    window.removeEventListener('keydown', handleEsc);
}

//Функция создания popup картинки
function openImagePopup(evt) {
    const cardName = evt.target.closest('.elements__element').querySelector('.elements__element-name').textContent;
    popupImage.src = evt.target.src;
    popupParagraph.textContent = cardName;
    popupImage.alt = `Фотография ${cardName}`;
    openPopup(imagePopup);
}

//Подготовка формы добавления карточек к открытию
function openAddCardPopup() {
    formAddCard.reset();
    openPopup(popupAddCard);
    validatorFormAddCard.resetValidation();
}

//Создание первых 6-ти карточек
initialCards.forEach(item => {
    addCard(createNewCard(item.name, item.link));
});

//Инициализация валидации форм
validatorFormAddCard.enableValidation();
validatorFormChangesProfile.enableValidation();

//Вешаем слушатели на кнопки открытия popup добавления карточки
profileAddButton.addEventListener('click', openAddCardPopup);

//Слушатель кнопки открытия popup редактирования профиля
profileEditorButton.addEventListener('click', openEditProfilePopup);

//Слушатель submit формы добавления карточки
popupFormAddCard.addEventListener('submit', handleCardFormSubmit);

//Слушатель submit формы редактирования профиля
popupFormChangesProfile.addEventListener('submit', handleProfileFormSubmit);

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup__button_close')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup')) {
          closePopup(popup)
        }
    })
})