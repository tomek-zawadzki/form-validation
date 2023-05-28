import { sendingInfo } from "./validation.js";

const sendData = () => {
  const form = document.querySelector(".form");
  const formData = new FormData(form);
  fetch("https://przeprogramowani.pl/projekt-walidacja", {
    method: "POST",
    body: formData,
  })
    .then((resp) => resp.json())
    .then((result) => console.log(result))
    .catch((error) => {
      console.log("error", error);
      sendingInfo.textContent = "Something went wrong. Try again.";
    });
};

export default sendData;
