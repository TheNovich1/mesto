//Функция демонстрации ошибки
const showError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add("popup__input_type_error")
    errorElement.textContent = errorMessage
    errorElement.classList.add("popup__input-error_active")
}

//Функция скрытия ошибки
const hideError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.remove("popup__input_type_error")
    errorElement.classList.remove("popup__input-error_active")
    errorElement.textContent = ""
}

//Валидация input
const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showError(formElement, inputElement, inputElement.validationMessage)
    } else {
        hideError(formElement, inputElement)
    }
}

//
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(".popup__input"))
    const buttonElement = formElement.querySelector(".popup__button_submit")

    toggleButtonState(inputList, buttonElement)
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function () {
            checkInputValidity(formElement, inputElement)
            toggleButtonState(inputList, buttonElement)
        })
    })
}

//
const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(".popup__form"))
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", function (evt) {
            evt.preventDefault()
            setEventListeners(formElement)
        })
        setEventListeners(formElement)
    })
}

//
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid
    })
}

//
const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add("popup__button_inactive")
        buttonElement.setAttribute("disabled", "disabled")
    } else {
        buttonElement.classList.remove("popup__button_inactive")
        buttonElement.removeAttribute("disabled", "disabled")
    }
}

//
enableValidation()  