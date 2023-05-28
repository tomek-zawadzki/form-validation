const createErrorMsg = (element, boxToPushMsg) => {
  element.forEach((el) => {
    const errorMsg = document.createElement("span");
    errorMsg.classList.add("error-msg");
    errorMsg.textContent = el.text;
    boxToPushMsg.appendChild(errorMsg);
  });
};

export default createErrorMsg;
