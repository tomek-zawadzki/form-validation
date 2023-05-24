const formInputs = document.querySelectorAll(".form__input");
const formAlerts = document.querySelectorAll(".form-alert");
const submitBtn = document.querySelector(".submit-btn");
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

const validateName = (e) => {
  e.preventDefault();
  console.log(formInputs[0].value);
  console.log(formInputs[0].value.length >= 2);
  if (formInputs[0].value.length >= 2) {
    console.log("error");
  }
};

submitBtn.addEventListener("click", validateName);
formInputs[0].addEventListener("keyup", () => {
  console.log(formAlerts[0].firstElementChild);
  if (formInputs[0].value.length >= 2) {
    formAlerts[0].firstElementChild.style.color = "greenyellow";
    formAlerts[0].firstElementChild.textContent += " ✅";
  }
  if (formInputs[0].value.includes("@")) {
    formAlerts[0].lastElementChild.style.color = "tomato";
    console.log("ok");
  } else {
    console.log("not ok");
    formAlerts[0].lastElementChild.style.color = "greenyellow";
  }
});
