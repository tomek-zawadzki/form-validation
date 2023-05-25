export const validation = (element, rule) => {
  if (rule) {
    element.style.color = "yellowgreen";
  }
};

function validateInput(element, validator) {
  if (validator) {
    element.classList.add("form-alert-correct");
  } else {
    if (element.classList.contains("form-alert-correct")) {
      element.classList.remove("form-alert-correct");
    }
  }
}

const errorMsgs = document.querySelectorAll(".error-msg");

nameInput.addEventListener("keyup", () => {
  errorMsgs[0].classList.add("form-alert-correct");
  console.log(errorMsgs[0].classList);

  console.log(alertNameBox.children[0]);
  validateInput(errorMsgs[0], inputErrors.name[0].validator);
  validateInput(errorMsgs[1], inputErrors.name[1].validator);
});
