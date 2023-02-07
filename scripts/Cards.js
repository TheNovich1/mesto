import { openImagePopup } from "./index.js";
export class Card {
    constructor(cardConfig, selectorTemeplateElement) {
        this._selectorTemeplateElement = selectorTemeplateElement;
        this._cardName = cardConfig.name;
        this._cardImageLink = cardConfig.link;
        this._isLiked = false;
    }

    _handleDeleteClick(evt) {
        evt.target.closest('.elements__element').remove();
    }

    _handleLikeClick(evt) {
        evt.target.classList.toggle('elements__element-like-button_active');
        this._isLiked = !this._isLiked;
    }

    _setEventListeners(card, cardImage) {
        card.querySelector('.elements__element-like-button').addEventListener('click', this._handleLikeClick);
        card.querySelector('.elements__delete-button').addEventListener('click', this._handleDeleteClick);
        cardImage.addEventListener('click', openImagePopup);
    }

    getCardElement() {
        const newCard = document.querySelector(`${this._selectorTemeplateElement}`).content.cloneNode(true);
        const cardImage = newCard.querySelector('.elements__image');
        newCard.querySelector('.elements__element-name').textContent = this._cardName;
        cardImage.src = this._cardImageLink;
        cardImage.alt = `Фотография ${this._cardName}`;
        this._setEventListeners(newCard, cardImage);
        return newCard;
    }
}