var slider = document.getElementById("password-length-slider");
var currentLength = document.getElementById("password-length-user-input");

function changeValue() {
  currentLength.textContent = slider.value;
}

slider.addEventListener("input", changeValue);
