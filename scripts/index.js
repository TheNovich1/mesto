const profileUserName = document.querySelector('.profile__user-name');
const profileUserAbout = document.querySelector('.profile__user-about');
const profileEditorButton = document.querySelector('.profile__editor-button');
const popup = document.querySelector('.popup');
const popupInputValueName = document.querySelector('.popup__input_value_name');
const popupInputValueAbout = document.querySelector('.popup__input_value_about');
const popupForm = document.querySelector('.popup__form');
const popupButtonValueClose = document.querySelector('.popup__button_value_close');
// const elementsElementLikeButton = document.querySelectorAll('.elements__element-like-button');

function openPopup() {
    popup.classList.add('popup_active');
    popupInputValueName.value = profileUserName.textContent;
    popupInputValueAbout.value = profileUserAbout.textContent;
}

function submitForm(evt) {
    evt.preventDefault();
    profileUserName.textContent = popupInputValueName.value;
    profileUserAbout.textContent = popupInputValueAbout.value;
    closePopup();
}

function closePopup() {
    popup.classList.remove('popup_active');
};

profileEditorButton.addEventListener('click', openPopup);
popupForm.addEventListener('submit', submitForm);
popupButtonValueClose.addEventListener('click', closePopup);

// for (i = 0; i <= elementsElementLikeButton.length - 1; i++){
//     elementsElementLikeButton[i].addEventListener('click', like);
// };

// function like(e){
//     e.target.classList.toggle('elements__element-like-button_active');
// };