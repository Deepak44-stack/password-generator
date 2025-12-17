const lengthSlider = document.querySelector(".pass-length input");
const options = document.querySelectorAll(".option input");
const copyIcon = document.querySelector(".input-box span");
const passwordInput = document.querySelector(".input-box input");
const passIndicator = document.querySelector(".pass-indicator");
const generateBtn = document.querySelector(".generate-btn");

const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "^!$%&|[](){}:;.,*+-#@<>~"
};

const generatePassword = () => {
  let staticPassword = "";
  let randomPassword = "";
  let excludeDuplicate = false;
  let length = lengthSlider.value;

  options.forEach(option => {
    if(option.checked){
      if(option.id === "spaces") staticPassword += " ";
      else if(option.id === "exc-duplicate") excludeDuplicate = true;
      else staticPassword += characters[option.id];
    }
  });

  if(!staticPassword) return;

  for(let i = 0; i < length; i++){
    let char = staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if(excludeDuplicate){
      if(!randomPassword.includes(char) || char === " ")
        randomPassword += char;
      else i--;
    } else randomPassword += char;
  }

  passwordInput.value = randomPassword;
};

const updateIndicator = () => {
  passIndicator.id =
    lengthSlider.value <= 8 ? "weak" :
    lengthSlider.value <= 16 ? "medium" : "strong";
};

const updateSlider = () => {
  document.querySelector(".pass-length span").innerText = lengthSlider.value;
  generatePassword();
  updateIndicator();
};

const copyPassword = () => {
  navigator.clipboard.writeText(passwordInput.value);
  copyIcon.innerText = "check";
  setTimeout(() => copyIcon.innerText = "copy_all", 1500);
};

updateSlider();
copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);
