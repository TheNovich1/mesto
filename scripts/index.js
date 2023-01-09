//Объявление глобальных переменных

const body = document.querySelector('body');

//Объявление переменной списка карточек
const elements = document.querySelector('.elements');

//Объявление общих переменных для всех popup
const popup = document.querySelector('.popup');
const popupButtonValueClose = document.querySelectorAll('.popup__button_value_close');
const popupForms = document.querySelectorAll('.popup__form');

//Объявление переменных popup редактирования профиля
const popupChangesProfile = document.querySelector('.popup_changes-profile');

//Объявление переменных popup добаления карточек
const popupAddCard = document.querySelector('.popup_add-card');
const profileAddButton = document.querySelector('.profile__add-button');
const popupInputValueTitle = document.querySelector('.popup__input_value_title');
const popupInputValueImage = document.querySelector('.popup__input_value_image');

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

const imagePopup = document.querySelector('.popup_open-image');
const popupCloseButton = document.querySelector('.popup__close-button');

//Функция открытия popup
function openPopup(popup) {
    console.log(popup);
    popup.classList.add('popup_active');
}

function preparingOpeningPopupChangesProfile() {
    const popupInputValueName = document.querySelector('.popup__input_value_name');
    const popupInputValueAbout = document.querySelector('.popup__input_value_about');
    popupInputValueName.value = profileUserName.textContent;
    popupInputValueAbout.value = profileUserAbout.textContent;
    openPopup(popupChangesProfile);
}

//Вешаем слушатели на кнопки открытия popup 
profileAddButton.addEventListener('click', openPopup.bind(null, popupAddCard));
profileEditorButton.addEventListener('click', preparingOpeningPopupChangesProfile);

//Функция редактирования профиля
function submitForm(evt) {
    evt.preventDefault();
    if (evt.target.classList[1] === 'popup__form-changes-profile') {
        profileUserName.textContent = popupInputValueName.value;
        profileUserAbout.textContent = popupInputValueAbout.value;
    } else {
        const newCard = cardBillet.cloneNode(true);
        newCard.querySelector('img').src = popupInputValueImage.value;
        newCard.querySelector('.elements__element-name');
        newCard.querySelector('.elements__element-name').textContent = popupInputValueTitle.value;
        newCard.querySelector('.elements__element-like-button').addEventListener('click', like);
        newCard.querySelector('.elements__delete-button').addEventListener('click', deleteCard);
        newCard.querySelector('.elements__image').addEventListener('click', createImagePopup);
        elements.prepend(newCard);
    }
    closePopup(evt);
}

//Вешаем слушаетль на кнопку отправки формы 
popupForms.forEach(item => item.addEventListener('submit', submitForm))


//Функция закрытия popup
function closePopup(evt) {
    evt.target.closest('.popup').classList.add('popup__close')
    const elem = evt;
    setTimeout((evt = elem) => {
        evt.target.closest('.popup').classList.remove('popup__close');
        evt.target.closest('.popup').classList.remove('popup_active');
    }, 200);
};

//Вешаем слушатель на кнопку закрытия popup
popupButtonValueClose.forEach(item => item.addEventListener('click', closePopup));


//Вешаем слушател на все кнопки like
elementsElementLikeButtons.forEach(item => item.addEventListener('click', like));

//Функция изменения цвета кнопки like
function like(evt) {
    evt.target.classList.toggle('elements__element-like-button_active');
};


//Функция удаления карточки
function deleteCard(evt) {
    evt.target.closest('.elements__element').remove();
};
//Вешаем слушатель на кнопки удаления
elementsDeleteButtons.forEach(item => item.addEventListener('click', deleteCard));
//Вешаем слушатели на картинки карточек
function createImagePopup(evt) {
    imagePopup.querySelector('.popup__image').src = evt.target.src;
    imagePopup.querySelector('.popup__paragraph').textContent = evt.target.closest('.elements__element').querySelector('.elements__element-name').textContent;
    console.log(`${imagePopup} !!!!!`)
    imagePopup.querySelector('.popup__image').addEventListener('click', createImagePopup);
    openPopup(imagePopup);
};

// elementsImages.forEach(item => item.addEventListener('click', createImagePopup))
elementsImages.forEach(function(item){
    item.addEventListener('click', createImagePopup)
})
popupCloseButton.addEventListener('click', closePopup)

function closeImagePopup(evt) {
    evt.target.closest('.popup').classList.add('popup__close')
    const elem = evt;
    setTimeout((evt = elem) => {
        evt.target.closest('.popup').remove();
    }, 100)
}