const fields = {
  name: document.querySelector(".input-name"),
  email: document.querySelector(".input-email"),
  password: document.querySelector(".input-password"),
  confirmPassword: document.querySelector(".input-confirm-password"),
  rodo: document.querySelector(".input-rodo"),
};
const alertBoxes = {
  name: document.querySelector(".form-alert-name"),
  email: document.querySelector(".form-alert-email"),
  password: document.querySelector(".form-alert-password"),
  confirmPassword: document.querySelector(".form-alert-confirm-password"),
  rodo: document.querySelector(".form-alert-rodo"),
};
const formInputs = Array.from(document.querySelectorAll(".form__input"));
const formAlerts = Array.from(document.querySelectorAll(".form-alert"));
const sendBtn = document.querySelector(".submit-btn");

const inputErrors = {
  name: [
    {
      text: "at least 2 signs",
      validator: () => fields.name.value.length >= 2,
      id: 0,
    },
    {
      text: "without numbers and special characters",
      validator: () =>
        !fields.name.value.match(/[0-9`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/),
      id: 1,
    },
  ],
  email: [
    {
      text: "must contain @ and domainat",
      validator: () =>
        fields.email.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g),
      id: 2,
    },
  ],
  password: [
    {
      text: "at least 8 characters",
      validator: () => fields.password.value.length >= 8,
      id: 3,
    },
    {
      text: "at least one uppercased character",
      validator: () => fields.password.value.match(/[A-Z]/),
      id: 4,
    },
    {
      text: "at least one digit",
      validator: () => fields.password.value.match(/[0-9]/),
      id: 5,
    },
    {
      text: "at least one special character",
      validator: () =>
        fields.password.value.match(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/),
      id: 6,
    },
  ],
  confirmPassword: [
    {
      text: "must be the same like password",
      validator: () =>
        fields.confirmPassword.value === fields.password.value &&
        fields.password.value !== "",
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

formInputs.forEach((input, i) => {
  const eventHandler = (opacity, height) => {
    formAlerts[i].style.opacity = opacity;
    formAlerts[i].style.height = height;
  };
  input.addEventListener("focus", () => eventHandler("1", "fit-content"));
  input.addEventListener("blur", () => eventHandler("0", "0"));
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

for (const fieldName in inputErrors) {
  createErrorMsg(inputErrors[fieldName], alertBoxes[fieldName]);
}

const errorMsgs = document.querySelectorAll(".error-msg");

for (const field in fields) {
  fields[field].addEventListener("keyup", () => {
    for (const errorField in inputErrors) {
      inputErrors[errorField].forEach((error) => {
        if (!error.validator) return;
        validateInput(errorMsgs[error.id], error.validator());
      });
    }
  });
}

fields.rodo.addEventListener("change", () => {
  alertBoxes.rodo.firstElementChild.classList.toggle(
    "form-alert-correct",
    fields.rodo.checked
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
    sendData();
  } else {
    console.log("blablabal");
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
    .catch((error) => console.log("error", error));
};

sendBtn.addEventListener("click", checkFormIsValid);
