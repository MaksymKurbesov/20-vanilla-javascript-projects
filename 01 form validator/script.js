const form = document.getElementById(`form`);
const usernameInput = document.getElementById(`username`);
const emailInput = document.getElementById(`email`);
const passwordInput = document.getElementById(`password`);
const passwordConfirmInput = document.getElementById(`password2`);


const inputs = [usernameInput, emailInput, passwordInput, passwordConfirmInput]


const checkEmail = (input) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input)
  } else {
    showError(input, `Email is not valid`)
  }
}

const checkRequired = (inputsArr) => {
  inputsArr.forEach((input) => {
    if (input.value.trim() === ``) {
      showError(input, `${getFieldName(input)} is required`)
    } else {
      showSuccess(input)
    }
  })
}

const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters`)
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less than ${max} characters`)
  } else {
    showSuccess(input)
  }
}

const checkPassMatch = (passInput, passInputConfirm) => {
  const isConfirm = passInput.value === passInputConfirm.value

  if (!isConfirm) {
    showError(passInputConfirm, `Password do not match`)
  }
}

const getFieldName = (input) => {
  return `${input.id.charAt(0).toUpperCase()}${input.id.slice(1)}`
}

const showError = (input, message) => {
  const parentElement = input.parentElement;
  const errorMessage = parentElement.querySelector(`small`);
  parentElement.className = `form-control error`;
  errorMessage.textContent = message
}

const showSuccess = (input) => {
  const parentElement = input.parentElement;
  parentElement.className = `form-control success`;
}


form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  checkRequired(inputs)
  checkEmail(emailInput)
  checkLength(usernameInput, 3, 15)
  checkLength(passwordInput, 6, 25)
  checkPassMatch(passwordInput, passwordConfirmInput)
})
