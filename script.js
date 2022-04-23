// Assignment code here

// promptLength function
var promptLength = function() {
  // prompt user to input the desired length of the password (8 - 128)
  var length = parseInt(window.prompt("How many characters should this password have?\n\nPlease enter a number between 8 - 128."));
  // if the input is invalid alert the user and run the prompt again
  if (!length || length < 8 || length > 128) {
    window.alert("Please enter a number between 8 - 128.");
    return promptLength();
  }
  // if the input is valid return the desired password length
  return length;
}

var generatePassword = function() {
  // call each necessary function, store the returned value as a variable, and console.log the variable
  var length = promptLength();
  console.log("This password should contain", length, "characters.");
}
// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
