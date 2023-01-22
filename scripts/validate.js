//Функция демонстрации ошибки
const showError = (formElement, inputElement, errorMessage, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add(`${validationConfig.inputErrorClass}`)
    errorElement.textContent = errorMessage
    inputElement.classList.add(`${validationConfig.inputErrorClass}`)
    errorElement.classList.add(`${validationConfig.errorClass}`)
}

//Функция скрытия ошибки
const hideError = (formElement, inputElement, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.remove(`${validationConfig.inputErrorClass}`)
    errorElement.classList.remove(`${validationConfig.errorClass}`)
    errorElement.textContent = ""
}

//Валидация input
const checkInputValidity = (formElement, inputElement, validationConfig) => {
    if (!inputElement.validity.valid) {
        showError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    } else {
        hideError(formElement, inputElement, validationConfig);
    };
}

//Функция вешает слушаетель на все инпуты
const setEventListeners = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(`${validationConfig.inputSelector}`));
    const buttonElement = formElement.querySelector(`${validationConfig.submitButtonSelector}`);

    toggleButtonState(inputList, buttonElement,validationConfig);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function () {
            checkInputValidity(formElement, inputElement, validationConfig);
            toggleButtonState(inputList, buttonElement, validationConfig);
        });
    })
}

//Находит все формы на странице и вызывает функцию вешающую слушатели 
const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(`${validationConfig.formSelector}`));
    formList.forEach((formElement) => {
        setEventListeners(formElement, validationConfig);
    });
}

//Проверка на валидность интпута
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid
    })
}

//Переключение кнопки в зависимости от валидности формы
const toggleButtonState = (inputList, buttonElement, validationConfig) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(`${validationConfig.inactiveButtonClass}`);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(`${validationConfig.inactiveButtonClass}`);
        buttonElement.disabled = false;
    }
}

enableValidation(validationConfig);