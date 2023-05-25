const formInputs = document.querySelectorAll(".form__input");
const nameInput = document.querySelector(".input-name");
const emailInput = document.querySelector(".input-email");
const passwordInput = document.querySelector(".input-password");
const confirmPasswordInput = document.querySelector(".input-confirm-password");
const formAlerts = document.querySelectorAll(".form-alert");
const submitBtn = document.querySelector(".submit-btn");
const elementBox = document.querySelectorAll(".element__box");

let passwordValue;

const inputErrors = {
  name: {
    errorOne: "at least 2 signs",
    errorTwo: "not numbers and special characters",
  },

  email: {
    errorOne: "must contain @ and domainat least 2 signs",
  },

  password: {
    errorOne: "at least 2 signs",
    errorTwo: "at least 8 characters",
    errorThree: "at least one digit",
    errorFour: "at least one special character",
  },

  confirmPassword: {
    errorOne: "must be the same like password",
  },

  rodo: {
    errorOne: "RODO must be accepted",
  },
};

const createErrorMsg = (element, formAlerts) => {
  for (const [key, value] of Object.entries(element)) {
    const errorMsg = document.createElement("span");
    errorMsg.textContent = value;
    console.log(errorMsg.textContent);
    formAlerts.appendChild(errorMsg);
  }
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

let isFirstKeyup = true;

nameInput.addEventListener("keyup", () => {
  if (isFirstKeyup) {
    createErrorMsg(inputErrors.name, formAlerts[0]);
    isFirstKeyup = false;
  }

  if (nameInput.value.length >= 2) {
    formAlerts[0].firstElementChild.style.color = "greenyellow";
  } else {
    formAlerts[0].firstElementChild.style.color = "tomato";
  }
  if (nameInput.value.includes("@")) {
    formAlerts[0].lastElementChild.style.color = "tomato";
  } else {
    formAlerts[0].lastElementChild.style.color = "greenyellow";
  }
});

emailInput.addEventListener("keyup", () => {
  if (isFirstKeyup) {
    createErrorMsg(inputErrors.email, formAlerts[1]);
    isFirstKeyup = false;
  }
  if (emailInput.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
    formAlerts[1].style.color = "greenyellow";
  } else {
    formAlerts[1].style.color = "tomato";
  }
});

passwordInput.addEventListener("keyup", () => {
  if (isFirstKeyup) {
    createErrorMsg(inputErrors.password, formAlerts[2]);
    isFirstKeyup = false;
  }
  if (passwordInput.value.length >= 8) {
    formAlerts[2].firstElementChild.style.color = "greenyellow";
  } else {
    formAlerts[2].firstElementChild.style.color = "tomato";
  }
  if (passwordInput.value.match(/[A-Z]/)) {
    formAlerts[2].firstElementChild.nextElementSibling.style.color =
      "greenyellow";
  } else {
    formAlerts[2].firstElementChild.nextElementSibling.style.color = "tomato";
  }
  if (passwordInput.value.match(/[0-9]/)) {
    formAlerts[2].lastElementChild.previousElementSibling.style.color =
      "greenyellow";
  } else {
    formAlerts[2].lastElementChild.previousElementSibling.style.color =
      "tomato";
  }
  if (passwordInput.value.match(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
    formAlerts[2].lastElementChild.style.color = "greenyellow";
  } else {
    formAlerts[2].lastElementChild.style.color = "tomato";
  }
  return passwordInput.value;
});

confirmPasswordInput.addEventListener("keyup", () => {
  if (isFirstKeyup) {
    createErrorMsg(inputErrors.confirmPassword, formAlerts[3]);
    isFirstKeyup = false;
  }
  if (
    confirmPasswordInput.value === passwordInput.value &&
    passwordInput.value !== ""
  ) {
    formAlerts[3].style.color = "greenyellow";
  } else {
    formAlerts[3].style.color = "tomato";
  }
});
