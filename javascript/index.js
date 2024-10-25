const slider = document.getElementById("password-length-slider");
const currentLengthParagraph = document.getElementById(
  "password-length-user-input"
);
const passwordOutputParagrapgh = document.getElementById("password");

/* Set length output to the current 
value when loading site */
currentLengthParagraph.textContent = slider.value;
var passwordLength = slider.value;

const checkbox_letters = document.getElementById("checkbox_letters");
const checkbox_numbers = document.getElementById("checkbox_numbers");
const checkbox_special_chars = document.getElementById(
  "checkbox_special_chars"
);

/* This is a function to change the value from
a paragraph next to the slider to the current 
sliders value */
function changeValue() {
  passwordLength = slider.value;
  currentLengthParagraph.textContent = slider.value;
}

/* An event listener which constantly calls 
the changeValue() function with every change 
on the slider */
slider.addEventListener("input", changeValue);

function genPassword() {
  var chars = getChars();
  var passwordOutput = "";

  if (!chars) {
    console.log("-");
  } else {
    for (let i = 0; i < passwordLength; i++) {
      var randInt = getRandInt(chars.length);
      passwordOutput += chars[randInt];
    }
    passwordOutputParagrapgh.textContent = passwordOutput;
  }
}

function getRandInt(max) {
  return Math.floor(Math.random() * max);
}

function getChars() {
  var chars = "";

  if (checkbox_letters.checked) {
    chars += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }

  if (checkbox_numbers.checked) {
    chars += "0123456789";
  }

  if (checkbox_special_chars.checked) {
    chars += "~!@#$%^*()-_+={}[]|;:<>.?";
  }

  return chars;
}
