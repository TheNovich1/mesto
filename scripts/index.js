//Объявление глобальных переменных

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    },
];

//Объявление переменной списка карточек
const elements = document.querySelector('.elements');

//Объявление общих переменных для всех popup
const buttonsClosePopup = document.querySelectorAll('.popup__button_close');

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

//Заготовка карточек
const cardBillet = document.querySelector('.card-billet').content;

//Popup картинки
const imagePopup = document.querySelector('.popup_open-image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupParagraph = imagePopup.querySelector('.popup__paragraph');

//Функция открытия popup
function openPopup(popup) {
    popup.classList.add('popup_active');
}

//Функция заполения popup редактирования профиля
function openEditProfilePopup() {
    popupInputValueName.value = profileUserName.textContent;
    popupInputValueAbout.value = profileUserAbout.textContent;
    openPopup(popupChangesProfile);
}

//Функция редактирования профиля
function submitFormChangesProfile(evt) {
    evt.preventDefault();
    profileUserName.textContent = popupInputValueName.value;
    profileUserAbout.textContent = popupInputValueAbout.value;
    closePopup(popupChangesProfile);
}

//Submit формы добавления карточки
function submitFormAddCard(evt) {
    evt.preventDefault();
    addCard(createNewCard({
        name: popupInputValueTitle.value,
        link: popupInputValueImage.value
    }));
    closePopup(popupAddCard);
}

//Функция создания новой карточки
function createNewCard(cardData) {
    const newCard = cardBillet.cloneNode(true);
    const cardImage = newCard.querySelector('.elements__image');
    newCard.querySelector('.elements__element-name').textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = `Фотография ${cardData.name}`;
    newCard.querySelector('.elements__element-like-button').addEventListener('click', like);
    newCard.querySelector('.elements__delete-button').addEventListener('click', deleteCard);
    cardImage.addEventListener('click', openImagePopup);
    return newCard;
}

//Функциядобавления popup в DOM 
function addCard(card) {
    elements.prepend(card);
}

//Функция поиска popup
function findPopup(evt) {
    closePopup(evt.target.closest('.popup'));
}

//Функция закрытия popup
function closePopup(popup) {
    popup.classList.remove('popup_active');
}

//Функция удаления карточки
function deleteCard(evt) {
    evt.target.closest('.elements__element').remove();
}

//Функция создания popup картинки
function openImagePopup(evt) {
    popupImage.src = evt.target.src;
    popupParagraph.textContent = evt.target.closest('.elements__element').querySelector('.elements__element-name').textContent;
    popupImage.alt = `Фотография ${evt.target.closest('.elements__element').querySelector('.elements__element-name').textContent}`;
    openPopup(imagePopup);
}

//Функция изменения цвета кнопки like
function like(evt) {
    evt.target.classList.toggle('elements__element-like-button_active');
}


//Подготовка формы добавления карточек к открытию
function openAddCardPopup() {
    popupInputValueTitle.value = '';
    popupInputValueImage.value = '';
    openPopup(popupAddCard);
}

//Создание первых 6-ти карточек
initialCards.forEach(item => addCard(createNewCard(item, {})));

//Вешаем слушатели на кнопки открытия popup добавления карточки
profileAddButton.addEventListener('click', openAddCardPopup);

//Слушатель кнопки открытия popup редактирования профиля
profileEditorButton.addEventListener('click', openEditProfilePopup);

//Слушатель submit формы добавления карточки
popupFormAddCard.addEventListener('submit', submitFormAddCard);

//Слушатель submit формы редактирования профиля
popupFormChangesProfile.addEventListener('submit', submitFormChangesProfile);

//Вешаем слушатель на кнопку закрытия popup
buttonsClosePopup.forEach(item => item.addEventListener('click', findPopup));