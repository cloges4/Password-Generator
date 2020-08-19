import '../scss/app.scss';

// DOM element

const password = document.querySelector('#password');
const lengthElement = document.querySelector('#slider-length');
const uppercaseElement = document.querySelector('#uppercase');
const lowercaseElement = document.querySelector('#lowercase');
const numbersElement = document.querySelector('#numbers');
const symbolsElement = document.querySelector('#symbols');
const generate = document.querySelector('#generate');
const clipboard = document.querySelector('#clipboard');
const copyMessage = document.querySelector('#copy-message');
const strengthIcon = document.querySelector('#strength-icon');
const strengthMessage = document.querySelector('#strength-message');
// Generate password

function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = '';

  const typesCount = lower + upper + number + symbol;

  const typesArray = [{ lower }, { upper }, { number }, { symbol }].filter((item) => Object.values(item)[0]);

  if (typesCount === 0) {
    return '';
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArray.forEach((type) => {
      const funcName = Object.keys(type)[0];

      generatedPassword += randomFunc[funcName]();
    });
  }
  const finalPassword = generatedPassword.slice(0, length);

  return finalPassword;
}

// Generate event listener
// strength message

generate.addEventListener('click', () => {
  const length = +lengthElement.value;
  const hasLower = lowercaseElement.checked;
  const hasUpper = uppercaseElement.checked;
  const hasNumber = numbersElement.checked;
  const hasSymbol = symbolsElement.checked;

  // if (hasUpper === true) {
  //   console.log('hello');
  // } else {
  //   console.log('Nope');
  // }
  password.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

// Page Load Event
window.addEventListener('load', () => {
  const length = +lengthElement.value;
  const hasLower = lowercaseElement.checked;
  const hasUpper = uppercaseElement.checked;
  const hasNumber = numbersElement.checked;
  const hasSymbol = symbolsElement.checked;

  password.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
  password.classList.add('strong');
  strengthIcon.src = '';
  strengthMessage.innerText = 'Strong Password';
});

// copy to clipboard

function hideMessage() {
  copyMessage.classList.remove('show-message');
}

function showMessage() {
  copyMessage.classList.add('show-message');
  setTimeout(hideMessage, 1500);
}
clipboard.addEventListener('click', () => {
  const textarea = document.createElement('textarea');
  showMessage();
  if (!password.innerText) {
    return;
  }
  textarea.value = password.innerText;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
});

// Range update

function UpdateRangeValue() {
  const updatedValue = lengthElement.value;
  const rangeValue = document.querySelector('#range-value');
  rangeValue.innerText = updatedValue;
}

lengthElement.addEventListener('input', UpdateRangeValue);

// function generators

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = '!@#$%^&*(){}<>?';
  return symbols[Math.floor(Math.random() * symbols.length)];
}

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};
