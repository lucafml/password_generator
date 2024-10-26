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
const checkbox_generateList = document.getElementById("generateList");
const generateListRange = document.getElementById("generateListRange");
const generateListRangeDiv = document.getElementById("generateListRangeDiv");
const generateListRangeWarning = document.getElementById(
  "generateListRangeWarning"
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

// Generate Password and output it
function genPassword() {
  var chars = getChars();
  var passwordOutput = "";

  if (!checkbox_generateList.checked) {
    if (!chars) {
      passwordOutputParagrapgh.textContent = "-";
    } else {
      for (let i = 0; i < passwordLength; i++) {
        var randInt = getRandInt(chars.length);
        passwordOutput += chars[randInt];
      }
      passwordOutputParagrapgh.textContent = passwordOutput;
    }
  } else {
    if (generateListRange.value < 1) {
      generateListRangeWarning.style.display = "block";
      return;
    }
    var arr = generatePasswordArray();
    downloadPasswordAsTXT(arr);
  }
}

function getRandInt(max) {
  return Math.floor(Math.random() * max);
}

/* Check what checkboxes the user checked
and add the chars to the pool of possible chars
the password can contain
 */

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

/* If the user decides to generate a .txt
file with a chosen number of passwords */

checkbox_generateList.addEventListener("change", showInputNumber);

function showInputNumber() {
  if (checkbox_generateList.checked) {
    generateListRangeDiv.style.display = "block";
  } else if (!checkbox_generateList.checked) {
    generateListRangeDiv.style.display = "none";
  }
}

function generatePasswordArray() {
  var chars = getChars();
  var numberOfPasswords = generateListRange.value;
  var arr = [];

  if (!chars) {
    window.alert(
      "Bitte klicke an, woraus deine Passwörter bestehen dürfen / sollen"
    );
  } else {
    for (let i = 0; i < numberOfPasswords; i++) {
      var passwordOutput = "";
      for (let i = 0; i < passwordLength; i++) {
        var randInt = getRandInt(chars.length);
        passwordOutput += chars[randInt];
      }
      arr.push(passwordOutput);
    }
    return arr;
  }
}

/* A function that creates a .txt file,
fills it with passwords and automatically
downloads it */

function downloadPasswordAsTXT(passwords) {
  var arr = passwords;
  var arrAsString = arr.join("\n \n");

  const blob = new Blob([arrAsString], { type: "text/plain" });
  const downloadLink = document.createElement("a");

  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = "passwords.txt";

  downloadLink.click();

  URL.revokeObjectURL(downloadLink.href);
}

/* Uncheck checkbox when site is
loaded or reloaded */

document.addEventListener("DOMContentLoaded", function () {
  checkbox_generateList.checked = false;
});
