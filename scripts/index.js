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
const popup = document.querySelector('.popup');
const popupButtonValueClose = document.querySelectorAll('.popup__button_value_close');

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

//Объявление общих переменных для карточек
const elementsElementLikeButtons = document.querySelectorAll('.elements__element-like-button');
const elementsDeleteButtons = document.querySelectorAll('.elements__delete-button');
const elementsImages = document.querySelectorAll('.elements__image');

//Заготовка карточек
const cardBillet = document.querySelector('.card-billet').content;

//Popup картинки
const imagePopup = document.querySelector('.popup_open-image');
const popupCloseButton = document.querySelector('.popup__close-button');

//Функция открытия popup
function openPopup(popup) {
    popup.classList.add('popup_active');
}

//Функция заполения popup редактирования профиля
function preparingOpeningPopupChangesProfile() {
    popupInputValueName.value = profileUserName.textContent;
    popupInputValueAbout.value = profileUserAbout.textContent;
    openPopup(popupChangesProfile);
}

//Функция редактирования профиля
function submitFormChangesProfile(evt) {
    evt.preventDefault();
    profileUserName.textContent = popupInputValueName.value;
    profileUserAbout.textContent = popupInputValueAbout.value;
    closePopup(evt);
}

//Submit формы добавления карточки
function submitFormAddCard(evt) {
    evt.preventDefault();
    initialCards.push({
        name: popupInputValueTitle.value,
        link: popupInputValueImage.value
    });
    createNewCard(initialCards.pop());
};

//Функция создания новой карточки
function createNewCard(obj) {
    const newCard = cardBillet.cloneNode(true);
    newCard.querySelector('.elements__element-name').textContent = obj.name;
    newCard.querySelector('img').src = obj.link;
    newCard.querySelector('.elements__element-like-button').addEventListener('click', like);
    newCard.querySelector('.elements__delete-button').addEventListener('click', deleteCard);
    newCard.querySelector('.elements__image').addEventListener('click', createImagePopup);
    elements.prepend(newCard);
    if (Array.from(popupAddCard.classList).pop() === 'popup_active') {
        closePopup(event);
    };
};

//Функция закрытия popup
function closePopup(evt) {
    evt.target.closest('.popup').classList.add('popup__close');
    const elem = evt;
    setTimeout((evt = elem) => {
        evt.target.closest('.popup').classList.remove('popup__close');
        evt.target.closest('.popup').classList.remove('popup_active');
        popupInputValueTitle.value = '';
        popupInputValueImage.value = '';
    }, 200);
};

//Функция удаления карточки
function deleteCard(evt) {
    evt.target.closest('.elements__element').remove();
};

//Функция создания popup картинки
function createImagePopup(evt) {
    imagePopup.querySelector('.popup__image').src = evt.target.src;
    imagePopup.querySelector('.popup__paragraph').textContent = evt.target.closest('.elements__element').querySelector('.elements__element-name').textContent;
    imagePopup.querySelector('.popup__image').addEventListener('click', createImagePopup);
    openPopup(imagePopup);
};

//Функция изменения цвета кнопки like
function like(evt) {
    evt.target.classList.toggle('elements__element-like-button_active');
};
//Функция закрытия popup
function closeImagePopup(evt) {
    evt.target.closest('.popup').classList.add('popup__close');
    const elem = evt;
    setTimeout((evt = elem) => {
        evt.target.closest('.popup').remove();
    }, 100);
};

//Создание первых 6-ти карточек
initialCards.forEach(item => createNewCard(item, {}));

//Вешаем слушатели на кнопки открытия popup 
profileAddButton.addEventListener('click', openPopup.bind(null, popupAddCard));

//Слушатель кнопки открытия редактирования профиля
profileEditorButton.addEventListener('click', preparingOpeningPopupChangesProfile);

//Слушатель submit формы добавления карточки
popupFormAddCard.addEventListener('submit', submitFormAddCard);

//Слушатель submit формы редактирования профиля
popupFormChangesProfile.addEventListener('submit', submitFormChangesProfile);

//Вешаем слушатель на кнопку закрытия popup
popupButtonValueClose.forEach(item => item.addEventListener('click', closePopup));

// elementsImages.forEach(item => item.addEventListener('click', createImagePopup))
elementsImages.forEach(function (item) {
    item.addEventListener('click', createImagePopup);
});
//Слушатель кнопки закрытия popup
popupCloseButton.addEventListener('click', closePopup);