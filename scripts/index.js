let profileUserName = document.querySelector('.profile__user-name');
let profileUserAbout = document.querySelector('.profile__user-about');
let profileEditorButton = document.querySelector('.profile__editor-button');
let popup = document.querySelector('.popup');
let popupInputValueName = document.querySelector('.popup__input_value_name');
let popupInputValueAbout = document.querySelector('.popup__input_value_about');
let popupForm = document.querySelector('.popup__form');
let popupButtonValueSubmit = document.querySelector('.popup__button_value_submit');
let popupButtonValueClose = document.querySelector('.popup__button_value_close');
let elementsElementLikeButton = document.querySelectorAll('.elements__element-like-button');

function openPopup(){
    popup.classList.toggle('popup_active');
    popupInputValueName.value = profileUserName.textContent;
    popupInputValueAbout.value = profileUserAbout.textContent;
}

function submitForm(evt){
    evt.preventDefault();
    profileUserName.textContent = popupInputValueName.value;
    profileUserAbout.textContent = popupInputValueAbout.value;
    popup.classList.remove('popup_active');
}

function closeForm(){
    popup.classList.remove('popup_active');
}

function like(e){
    e.target.classList.toggle('elements__element-like-button_active')
};

profileEditorButton.addEventListener('click', openPopup);
popupButtonValueSubmit.addEventListener('click', submitForm);
popupButtonValueClose.addEventListener('click', closeForm);

for (i = 0; i <= elementsElementLikeButton.length - 1; i++){
    elementsElementLikeButton[i].addEventListener('click', like);
}