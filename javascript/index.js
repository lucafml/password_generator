var slider = document.getElementById("password-length-slider");
var currentLength = document.getElementById("password-length-user-input");


/* This is a function to change the value from
a paragraph next to the slider to the current 
sliders value */
function changeValue() {
  currentLength.textContent = slider.value;
}

/* An event listener which constantly calls 
the changeValue() function with every change 
on the slider */
slider.addEventListener("input", changeValue);
