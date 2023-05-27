const formInputs = document.querySelectorAll(".form__input");
const nameInput = document.querySelector(".input-name");
const emailInput = document.querySelector(".input-email");
const passwordInput = document.querySelector(".input-password");
const confirmPasswordInput = document.querySelector(".input-confirm-password");
const rodoInput = document.querySelector(".input-rodo");
const alertNameBox = document.querySelector(".form-alert-name");
const alertEmailBox = document.querySelector(".form-alert-email");
const alertPasswordBox = document.querySelector(".form-alert-password");
const alertConfirmPasswordBox = document.querySelector(
  ".form-alert-confirm-password"
);
const alertRodoBox = document.querySelector(".form-alert-rodo");
const formAlerts = document.querySelectorAll(".form-alert");
const sendBtn = document.querySelector(".submit-btn");
const elementBox = document.querySelectorAll(".element__box");

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
const createErrorMsg = (element, boxToPushMsg) => {
  element.forEach((el) => {
    const errorMsg = document.createElement("span");
    errorMsg.classList.add("error-msg");
    errorMsg.textContent = el.text;
    boxToPushMsg.appendChild(errorMsg);
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
createErrorMsg(inputErrors.rodo, alertRodoBox);

const errorMsgs = document.querySelectorAll(".error-msg");

const inputs = [nameInput, emailInput, passwordInput, confirmPasswordInput];

inputs.forEach((input) => {
  input.addEventListener("keyup", () => {
    for (const field in inputErrors) {
      inputErrors[field].forEach((error) => {
        validateInput(errorMsgs[error.id], error.validator());
      });
    }
  });
});

const validateRodo = () => {
  alertRodoBox.style.opacity = rodoInput === document.activeElement ? "1" : "0";
  alertRodoBox.style.height =
    rodoInput === document.activeElement ? "2rem" : "0rem";

  alertRodoBox.firstElementChild.classList.toggle(
    "form-alert-correct",
    rodoInput.checked
  );
};

rodoInput.addEventListener("change", validateRodo);
rodoInput.addEventListener("focus", validateRodo);
rodoInput.addEventListener("blur", validateRodo);

const checkFormIsValid = (e) => {
  e.preventDefault();

  const result = [...errorMsgs].every((alert) =>
    alert.classList.contains("form-alert-correct")
  );

  [...errorMsgs].forEach((msg) => {
    if (!msg.classList.contains("form-alert-correct")) {
      msg.parentElement.style.opacity = 1;
    }
  });

  return result;
};

sendBtn.addEventListener("click", checkFormIsValid);
