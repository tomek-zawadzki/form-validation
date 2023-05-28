import errorConditions from "./src/scripts/errorConditions.js";
import createErrorMsg from "./src/scripts/createErrorMsg.js";
import {
  validateInputField,
  checkFormIsValid,
  validateRodo,
} from "./src/scripts/validation.js";
import {
  inputFields,
  alertFieldBoxes,
  allFormInputs,
  allFormAlerts,
  sendBtn,
} from "./src/scripts/variables.js";

for (const fieldName in errorConditions) {
  createErrorMsg(errorConditions[fieldName], alertFieldBoxes[fieldName]);
}

const errorMsgs = document.querySelectorAll(".error-msg");

for (const field in inputFields) {
  inputFields[field].addEventListener("keyup", () => {
    for (const errorField in errorConditions) {
      errorConditions[errorField].forEach((error) => {
        if (!error.validator) return;
        validateInputField(errorMsgs[error.id], error.validator());
      });
    }
  });
}

allFormInputs.forEach((input, i) => {
  const eventHandler = (height, opacity) => {
    allFormAlerts[i].style.opacity = opacity;
    allFormAlerts[i].style.height = height;
  };
  if (allFormAlerts[i] === allFormAlerts[2]) {
    input.addEventListener("focus", () => eventHandler("3.8rem", "1"));
  } else {
    input.addEventListener("focus", () => eventHandler("2rem", "1"));
  }
  input.addEventListener("blur", () => eventHandler("0", "0", "block"));
});

inputFields.rodo.addEventListener("change", validateRodo);
sendBtn.addEventListener("click", checkFormIsValid);
