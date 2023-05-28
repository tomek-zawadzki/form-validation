import { inputFields } from "./variables.js";

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

export default errorConditions;
