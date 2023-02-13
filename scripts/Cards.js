export class Card {
    constructor(cardConfig, selectorTemeplateElement, handleImageClick) {
        this._selectorTemeplateElement = selectorTemeplateElement;
        this._cardName = cardConfig.name;
        this._cardImageLink = cardConfig.link;
        this._handleImageClick = handleImageClick;
        this._cardE = document.querySelector(`${this._selectorTemeplateElement}`).content.cloneNode(true);
        this._cardImage = this._card.querySelector('.elements__image');
    }

    _handleDeleteClick(evt) {
        evt.target.closest('.elements__element').remove();
    }

    _handleLikeClick(evt) {
        evt.target.classList.toggle('elements__element-like-button_active');
    }

    _setEventListeners() {
        this._card.querySelector('.elements__element-like-button').addEventListener('click', this._handleLikeClick);
        this._card.querySelector('.elements__delete-button').addEventListener('click', this._handleDeleteClick);
        this._cardImage.addEventListener('click', this._handleImageClick);
    }

    getCardElement() {
        this._card.querySelector('.elements__element-name').textContent = this._cardName;
        this._cardImage.src = this._cardImageLink;
        this._cardImage.alt = `Фотография ${this._cardName}`;
        this._setEventListeners();
        return this._card;
    }
}