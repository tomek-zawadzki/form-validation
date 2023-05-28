export const inputFields = {
  name: document.querySelector(".input-name"),
  email: document.querySelector(".input-email"),
  password: document.querySelector(".input-password"),
  confirmPassword: document.querySelector(".input-confirm-password"),
  rodo: document.querySelector(".input-rodo"),
};
export const alertFieldBoxes = {
  name: document.querySelector(".form-alert-name"),
  email: document.querySelector(".form-alert-email"),
  password: document.querySelector(".form-alert-password"),
  confirmPassword: document.querySelector(".form-alert-confirm-password"),
  rodo: document.querySelector(".form-alert-rodo"),
};
export const allFormInputs = document.querySelectorAll(".form__input");
export const allFormAlerts = Array.from(
  document.querySelectorAll(".form-alert")
);
export const sendBtn = document.querySelector(".submit-btn");
