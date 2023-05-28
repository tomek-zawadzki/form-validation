import sendData from "./sendData.js";
import { alertFieldBoxes, inputFields } from "./variables.js";

export const sendingInfo = document.querySelector(".sending-info");

export function validateInputField(element, validator) {
  if (validator) {
    element.classList.add("form-alert-correct");
  } else {
    if (element.classList.contains("form-alert-correct")) {
      element.classList.remove("form-alert-correct");
    }
  }
}

export const checkFormIsValid = (e) => {
  e.preventDefault();
  const errorMsgs = document.querySelectorAll(".error-msg");

  const result = [...errorMsgs].every((alert) =>
    alert.classList.contains("form-alert-correct")
  );

  [...errorMsgs].forEach((msg) => {
    if (!msg.classList.contains("form-alert-correct")) {
      msg.parentElement.style.opacity = 1;
      msg.parentElement.style.height = "fit-content";
    }
  });

  if (result) {
    sendingInfo.textContent = "Success";
    sendData();
  } else {
    sendingInfo.textContent = "All fields must be correct";
  }
};

export const validateRodo = () => {
  alertFieldBoxes.rodo.firstElementChild.classList.toggle(
    "form-alert-correct",
    inputFields.rodo.checked
  );
};
