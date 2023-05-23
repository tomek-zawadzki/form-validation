const formInputs = document.querySelectorAll(".form__input");
const formAlerts = document.querySelectorAll(".form-alert");

// document.getElementById("name").addEventListener("focus", function () {
//   document.querySelector(".form-alert").style.visibility = "visible";
//   document.querySelector(".form-alert").style.height = "fit-content";
// });

// document.getElementById("name").addEventListener("blur", function () {
//   document.querySelector(".form-alert").style.visibility = "hidden";
//   document.querySelector(".form-alert").style.height = "0";
// });

formInputs.forEach((input, i) => {
  input.addEventListener("focus", () => {
    formAlerts[i].style.visibility = "visible";
    formAlerts[i].style.height = "fit-content";
  });
});
formInputs.forEach((input, i) => {
  input.addEventListener("blur", () => {
    formAlerts[i].style.visibility = "hidden";
    formAlerts[i].style.height = "0";
  });
});
