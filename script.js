const inputFields = {
  name: document.querySelector(".input-name"),
  email: document.querySelector(".input-email"),
  password: document.querySelector(".input-password"),
  confirmPassword: document.querySelector(".input-confirm-password"),
  rodo: document.querySelector(".input-rodo"),
};
const alertFieldBoxes = {
  name: document.querySelector(".form-alert-name"),
  email: document.querySelector(".form-alert-email"),
  password: document.querySelector(".form-alert-password"),
  confirmPassword: document.querySelector(".form-alert-confirm-password"),
  rodo: document.querySelector(".form-alert-rodo"),
};
const allFormInputs = document.querySelectorAll(".form__input");
const allFormAlerts = document.querySelectorAll(".form-alert");
const sendingInfo = document.querySelector(".sending-info");
const sendBtn = document.querySelector(".submit-btn");

const errorConditions = {
  name: [
    {
      text: "at least 2 signs",
      validator: () => inputFields.name.value.length >= 2,
      id: 0,
    },
    {
      text: "without numbers and special characters",
      validator: () =>
        !inputFields.name.value.match(
          /[0-9`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
        ),
      id: 1,
    },
  ],
  email: [
    {
      text: "must contain @ and domainat",
      validator: () =>
        inputFields.email.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g),
      id: 2,
    },
  ],
  password: [
    {
      text: "at least 8 characters",
      validator: () => inputFields.password.value.length >= 8,
      id: 3,
    },
    {
      text: "at least one uppercased character",
      validator: () => inputFields.password.value.match(/[A-Z]/),
      id: 4,
    },
    {
      text: "at least one digit",
      validator: () => inputFields.password.value.match(/[0-9]/),
      id: 5,
    },
    {
      text: "at least one special character",
      validator: () =>
        inputFields.password.value.match(
          /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
        ),
      id: 6,
    },
  ],
  confirmPassword: [
    {
      text: "must be the same like password",
      validator: () =>
        inputFields.confirmPassword.value === inputFields.password.value &&
        inputFields.password.value !== "",
      id: 7,
    },
  ],

  rodo: [
    {
      text: "RODO must be accepted",
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

allFormInputs.forEach((input, i) => {
  const eventHandler = (height, opacity) => {
    allFormAlerts[i].style.opacity = opacity;
    allFormAlerts[i].style.height = height;
  };
  input.addEventListener("focus", () => eventHandler("fit-content", "1"));
  input.addEventListener("blur", () => eventHandler("0", "0"));
});

function validateInputField(element, validator) {
  if (validator) {
    element.classList.add("form-alert-correct");
  } else {
    if (element.classList.contains("form-alert-correct")) {
      element.classList.remove("form-alert-correct");
    }
  }
}

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

inputFields.rodo.addEventListener("change", () => {
  alertFieldBoxes.rodo.firstElementChild.classList.toggle(
    "form-alert-correct",
    inputFields.rodo.checked
  );
});

const checkFormIsValid = (e) => {
  e.preventDefault();

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

sendBtn.addEventListener("click", checkFormIsValid);
