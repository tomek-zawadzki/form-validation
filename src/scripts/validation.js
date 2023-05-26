const form = {
  inputs: document.querySelectorAll(".form__input"),
  nameInput: document.querySelector(".input-name"),
  emailInput: document.querySelector(".input-email"),
  passwordInput: document.querySelector(".input-password"),
  confirmPasswordInput: document.querySelector(".input-confirm-password"),
  rodoInput: document.querySelector(".input-rodo"),
  alertNameBox: document.querySelector(".form-alert-name"),
  alertEmailBox: document.querySelector(".form-alert-email"),
  alertPasswordBox: document.querySelector(".form-alert-password"),
  alertConfirmPasswordBox: document.querySelector(
    ".form-alert-confirm-password"
  ),
  alertRodoBox: document.querySelector(".form-alert-rodo"),
  formAlerts: document.querySelectorAll(".form-alert"),
  submitBtn: document.querySelector(".submit-btn"),
  elementBox: document.querySelectorAll(".element__box"),
  errorMsgs: document.querySelectorAll(".error-msg"),
};

const inputErrors = {
  name: [
    {
      text: "at least 2 signs",
      validator: () => form.nameInput.value.length >= 2,
      id: 0,
    },
    {
      text: "not numbers and special characters",
      validator: () =>
        !form.nameInput.value.match(
          /[0-9`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
        ),
      id: 1,
    },
  ],
  email: [
    {
      text: "must contain @ and domain at least 2 signs",
      validator: () =>
        form.emailInput.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g),
      id: 2,
    },
  ],
  password: [
    {
      text: "at least 8 characters",
      validator: () => form.passwordInput.value.length >= 8,
      id: 3,
    },
    {
      text: "at least one uppercased character",
      validator: () => form.passwordInput.value.match(/[A-Z]/),
      id: 4,
    },
    {
      text: "at least one digit",
      validator: () => form.passwordInput.value.match(/[0-9]/),
      id: 5,
    },
    {
      text: "at least one special character",
      validator: () =>
        form.passwordInput.value.match(
          /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
        ),
      id: 6,
    },
  ],
  confirmPassword: [
    {
      text: "must be the same as password",
      validator: () =>
        form.confirmPasswordInput.value === form.passwordInput.value &&
        form.passwordInput.value !== "",
      id: 7,
    },
  ],
  rodo: [
    {
      text: "RODO must be accepted",
      validator: () => "must be checked",
      id: 8,
    },
  ],
};

function createErrorMsg(elements, boxToPushMsg) {
  elements.forEach((element) => {
    const errorMsg = document.createElement("span");
    errorMsg.classList.add("error-msg");
    errorMsg.textContent = element.text;
    boxToPushMsg.appendChild(errorMsg);
  });
}

form.inputs.forEach((input, i) => {
  input.addEventListener("focus", () => {
    form.formAlerts[i].style.opacity = "1";
    form.formAlerts[i].style.height = i === 2 ? "4rem" : "2rem";
  });
});

form.inputs.forEach((input, i) => {
  input.addEventListener("blur", () => {
    form.formAlerts[i].style.opacity = "0";
    form.formAlerts[i].style.height = "0";
  });
});

function validateInput(element, validator) {
  if (validator) {
    element.classList.add("form-alert-correct");
  } else {
    element.classList.remove("form-alert-correct");
  }
}

function validateText(input, errorMessages) {
  for (let i = 0; i < errorMessages.length; i++) {
    validateInput(form.errorMsgs[i], errorMessages[i].validator());
  }
}

form.nameInput.addEventListener("keyup", () => {
  validateText(form.nameInput, inputErrors.name);
});

form.emailInput.addEventListener("keyup", () => {
  validateText(form.emailInput, inputErrors.email);
});

function validatePassword() {
  const passwordErrorMessages = inputErrors.password;
  for (let i = 0; i < passwordErrorMessages.length; i++) {
    validateInput(form.errorMsgs[i + 3], passwordErrorMessages[i].validator());
  }
}

form.passwordInput.addEventListener("keyup", validatePassword);

form.confirmPasswordInput.addEventListener("keyup", () => {
  validateInput(form.errorMsgs[7], inputErrors.confirmPassword[0].validator());
});

function validateRodo() {
  if (form.rodoInput === document.activeElement) {
    form.alertRodoBox.style.opacity = "1";
  } else {
    form.alertRodoBox.style.opacity = "0";
  }

  form.alertRodoBox.classList.toggle(
    "form-alert-correct",
    form.rodoInput.checked
  );
}

form.rodoInput.addEventListener("click", validateRodo);

createErrorMsg(inputErrors.name, form.alertNameBox);
createErrorMsg(inputErrors.email, form.alertEmailBox);
createErrorMsg(inputErrors.password, form.alertPasswordBox);
createErrorMsg(inputErrors.confirmPassword, form.alertConfirmPasswordBox);
createErrorMsg(inputErrors.rodo, form.alertRodoBox);

function handleRodoInput() {
  if (form.rodoInput === document.activeElement || form.rodoInput.checked) {
    form.alertRodoBox.style.opacity = "1";
  } else {
    form.alertRodoBox.style.opacity = "0";
  }
}

form.rodoInput.addEventListener("focus", handleRodoInput);
form.rodoInput.addEventListener("change", handleRodoInput);
