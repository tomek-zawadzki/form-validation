const formInputs = document.querySelectorAll(".form__input");
const nameInput = document.querySelector(".input-name");
const emailInput = document.querySelector(".input-email");
const passwordInput = document.querySelector(".input-password");
const confirmPasswordInput = document.querySelector(".input-confirm-password");
const alertNameBox = document.querySelector(".form-alert-name");
const alertEmailBox = document.querySelector(".form-alert-email");
const alertPasswordBox = document.querySelector(".form-alert-password");
const alertConfirmPasswordBox = document.querySelector(
  ".form-alert-confirm-password"
);
const formAlerts = document.querySelectorAll(".form-alert");
const submitBtn = document.querySelector(".submit-btn");
const elementBox = document.querySelectorAll(".element__box");
let passwordValue;

const inputErrors = {
  name: [
    {
      text: "at least 2 signs",
      validator: () => nameInput.value.length >= 2,
      id: 0,
    },
    {
      text: "not numbers and special characters",
      validator: () =>
        !nameInput.value.match(/[0-9`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/),
      id: 1,
    },
  ],
  email: [
    {
      text: "must contain @ and domainat least 2 signs",
      validator: () =>
        emailInput.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g),
      id: 2,
    },
  ],
  password: [
    {
      text: "at least 8 characters",
      validator: () => passwordInput.value.length >= 8,
      id: 3,
    },
    {
      text: "at least one uppercased character",
      validator: () => passwordInput.value.match(/[A-Z]/),
      id: 4,
    },
    {
      text: "at least one digit",
      validator: () => passwordInput.value.match(/[0-9]/),
      id: 5,
    },
    {
      text: "at least one special character",
      validator: () =>
        passwordInput.value.match(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/),
      id: 6,
    },
  ],
  confirmPassword: [
    {
      text: "must be the same like password",
      validator: () =>
        confirmPasswordInput.value === passwordInput.value &&
        passwordInput.value !== "",
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
const createErrorMsg = (element, formAlerts) => {
  element.forEach((el) => {
    const errorMsg = document.createElement("span");
    errorMsg.classList.add("error-msg");
    errorMsg.textContent = el.text;
    formAlerts.appendChild(errorMsg);
  });
};

formInputs.forEach((input, i) => {
  input.addEventListener("focus", () => {
    formAlerts[i].style.opacity = "1";
    if (formAlerts[i] === formAlerts[2]) {
      formAlerts[i].style.height = "4rem";
    } else {
      formAlerts[i].style.height = "2rem";
    }
  });
});
formInputs.forEach((input, i) => {
  input.addEventListener("blur", () => {
    formAlerts[i].style.opacity = "0";
    formAlerts[i].style.height = "0";
  });
});

function validateInput(element, validator) {
  if (validator) {
    element.classList.add("form-alert-correct");
  } else {
    if (element.classList.contains("form-alert-correct")) {
      element.classList.remove("form-alert-correct");
    }
  }
}

createErrorMsg(inputErrors.name, alertNameBox);
createErrorMsg(inputErrors.email, alertEmailBox);
createErrorMsg(inputErrors.password, alertPasswordBox);
createErrorMsg(inputErrors.confirmPassword, alertConfirmPasswordBox);

const errorMsgs = document.querySelectorAll(".error-msg");

nameInput.addEventListener("keyup", () => {
  validateInput(errorMsgs[0], inputErrors.name[0].validator());
  validateInput(errorMsgs[1], inputErrors.name[1].validator());
});

emailInput.addEventListener("keyup", () => {
  validateInput(errorMsgs[2], inputErrors.email[0].validator());
});

passwordInput.addEventListener("keyup", () => {
  validateInput(errorMsgs[3], inputErrors.password[0].validator());
  validateInput(errorMsgs[4], inputErrors.password[1].validator());
  validateInput(errorMsgs[5], inputErrors.password[2].validator());
  validateInput(errorMsgs[6], inputErrors.password[3].validator());

  return passwordInput.value;
});

confirmPasswordInput.addEventListener("keyup", () => {
  validateInput(errorMsgs[7], inputErrors.confirmPassword[0].validator());
});
