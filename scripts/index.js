import { Card } from "./Cards.js";
import { FormValidator} from "./FormValidator.js";
import { initialCards, validationConfig } from "./constants.js";

//Объявление глобальных переменных

//Объявление переменной списка карточек
const cardsContainer = document.querySelector('.elements');

//Объявление общих переменных для всех popup
const buttonsClosePopup = document.querySelectorAll('.popup__button_close');
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
    validatorFormChangesProfile.openForm()
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
    const newCard = new Card({
        name: popupInputValueTitle.value,
        link: popupInputValueImage.value
    }, '.card-billet');
    addCard(newCard.getCardElement());
    closePopup(popupAddCard);
}

//Функциядобавления popup в DOM 
function addCard(card) {
    cardsContainer.prepend(card);
}

//Функция поиска popup
function handleClosePopupButtonClick(evt) {
    const popup = evt.target.closest('.popup');
    closePopup(popup);
}

//Функция закрытия popup
function closePopup(popup) {
    popup.classList.remove('popup_active');
    window.removeEventListener('keydown', handleEsc);
}

//Функция создания popup картинки
export function openImagePopup(evt) {
    const cardName = evt.target.closest('.elements__element').querySelector('.elements__element-name').textContent;
    popupImage.src = evt.target.src;
    popupParagraph.textContent = cardName;
    popupImage.alt = `Фотография ${cardName}`;
    openPopup(imagePopup);
}

//Функция изменения цвета кнопки like
function handleLikeClick(evt) {
    evt.target.classList.toggle('elements__element-like-button_active');
}

//Подготовка формы добавления карточек к открытию
function openAddCardPopup() {
    popupAddCard.querySelector('.popup__form').reset();
    openPopup(popupAddCard);
    validatorFormAddCard.openForm();
}

//Функция проверки нажатия на попап вне формы
function handleClosePopupByOverlayClick(evt) {
    if (evt.target.classList.contains('popup')) {
        const popup = evt.target;
        closePopup(popup);
    };
};

//Создание первых 6-ти карточек
initialCards.forEach(item => {
    const newCard = new Card(item, '.card-billet');
    addCard(newCard.getCardElement());
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

//Вешаем слушатель на кнопку закрытия popup
buttonsClosePopup.forEach(item => item.addEventListener('click', handleClosePopupButtonClick));

//Слушаетли попапов закрытия по нажатию вне формы 
popups.forEach(popup => popup.addEventListener('mousedown', handleClosePopupByOverlayClick));