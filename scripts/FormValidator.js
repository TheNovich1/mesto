

export class FormValidator {
    constructor(validationConfig, formElement) {
        this._formSelector = validationConfig.formSelector;
        this._inputSelector = validationConfig.inputSelector;
        this._submitButtonSelector = validationConfig.submitButtonSelector;
        this._inactiveButtonClass = validationConfig.inactiveButtonClass;
        this._inputErrorClass = validationConfig.inputErrorClass;
        this._errorClass = validationConfig.errorClass;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(`${this._inputSelector}`));
        this._buttonElement = this._formElement.querySelector(`${this._submitButtonSelector}`);
    }

    _showError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(`${this._inputErrorClass}`);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(`${this._errorClass}`);
    }

    _hideError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`)
        inputElement.classList.remove(`${this._inputErrorClass}`)
        errorElement.classList.remove(`${this._errorClass}`)
        errorElement.textContent = ""
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid
        })
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(`${this._inactiveButtonClass}`);
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.classList.remove(`${this._inactiveButtonClass}`);
            this._buttonElement.disabled = false;
        }
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showError(inputElement, inputElement.validationMessage);
        } else {
            this._hideError(inputElement);
        };
    }

    _setEventListeners() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(this._inputList, this._buttonElement);
            });
        })
    }

    resetValidation() {
        this._toggleButtonState();
        this._inputList.forEach(inputElement => {
            this._hideError(inputElement)
        })
    }

    enableValidation() {
        this._setEventListeners();
    }
}