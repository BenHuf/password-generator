// Assignment code here

// promptLength function -- determines desired length of password
var promptLength = function() {
  // prompt user to input the desired length of the password (8 - 128) parse float and int values from the response
  var userEntry = window.prompt("How many characters should this password have?\n\nPlease enter a whole number between 8 - 128.");
  var floatLength = parseFloat(userEntry)
  var length = parseInt(userEntry);
 
  // define function to determine if a number is not a whole number (weird edge case with entering an empty string and logging this variable caused me to add the (!x) expression)
  var isFloat = function(x) {
    if (!x) {
      return false;
    }
    else {
      return x % 1 !==0;
    }
  }

  var floatCheck = isFloat(floatLength);
  console.log("floatcheck:", floatCheck);

  // if the input is invalid alert the user and run the prompt again
  if (!length || length < 8 || floatLength > 128) {
    window.alert("Please enter a number between 8 - 128.");
    return promptLength();
  }

  // if the input is not a whole number alert the user and run the prompt again
  else if (floatCheck) {
    window.alert("Please enter a WHOLE number.");
    return promptLength();
  }

  // create variable for length confirmation
  var confirmLength = window.confirm("Your password will contain " + userEntry + " characters.\n\nIs this okay?");
  if (!confirmLength) {
    window.alert("Then why did you enter that number?\n\nLet's try this again.");
    return promptLength();
  }

  // if the input is valid return the desired password length
  return length;
}

// confirmCharacterTypes function -- determines desired character types to be used in password
var confirmCharacterTypes = function() {
  // ask if the password should contain the corresponding character types
  var confirmLower = window.confirm("Should this password contain LOWERCASE characters?\n\nExample:  l o w e r");
  var confirmUpper = window.confirm("Should this password contain UPPERCASE characters?\n\nExample:  U P P E R");
  var confirmNumeric = window.confirm("Should this password contain NUMERIC characters?\n\nExample:  1 2 3 4 5");
  var confirmSpecial = window.confirm("Should this password contain SPECIAL characters?\n\nExample:  ! @ # $ %");
  
  // if all 4 values are false notify user at least one character type must be used and run through prompts again
  if (!confirmLower && !confirmUpper && !confirmNumeric && !confirmSpecial) {
    window.alert("So you want your password to be blank?\n\nBrilliant..\n\nYour password must have at least one of these types of characters.\nPlease select at least one of the 4 character types.");
    return confirmCharacterTypes();
  }

  // create string variable to be added to
  var passwordCriteria = "Your password will be generated from the following chracter types:\n";
  // adds character types to the string if the corresponding variable is true
  if (confirmLower) {
    passwordCriteria += "\nLowercase characters (l o w e r)";
  }
  if (confirmUpper) {
    passwordCriteria += "\nUppercase characters (U P P E R)";
  }
  if (confirmNumeric) {
    passwordCriteria += "\nNumeric characters (1 2 3 4 5)";
  }
  if (confirmSpecial) {
    passwordCriteria += "\nSpecial characters (! @ # $ %)";
  }
  passwordCriteria += "\n\nIs this ok?";
  
  // confirm user's choices 
  var confirmCriteria = window.confirm(passwordCriteria);
  // if user is not satisfied with their choices go through the options again
  if (!confirmCriteria) {
    window.alert("Then why did... \n\nPlease answer the prompts correctly to ensure your password has ONLY character types that you specify.");
    return confirmCharacterTypes();
  }

  // if at least one value is true and the user is satisfied with their choices return the following values as an array
  return [confirmLower, confirmUpper, confirmNumeric, confirmSpecial];
}

// possibleCharacters function -- creates a string of all possible desired characters to be used in password
var possibleCharacters = function(array) {
  // assign an empty string to characterPool to be added to
  var characterPool = "";

  // if the [n] entry in the array is true add the appropriate characters to characterPool
  if (array[0]) {
    characterPool += "abcdefghijklmnopqrstuvwxyz";
  }

  if (array[1]) {
    characterPool += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
  
  if (array[2]) {
    characterPool += "0123456789";
  }
  
  if (array[3]) {
    characterPool += "!\"#$%&'()*+,-./:;<=>?@[]\^_`{}|~";
  }

  // return the created characterPool string
  return characterPool;
}

// generatePassword function -- calls all necessary functions to determine password criteria and returns the created password
var generatePassword = function() {
  // call each function, store the returned value as a variable, and console.log the variable and a message
  var passwordLength = promptLength();
  console.log("This password should contain", passwordLength, "characters.");
  var characterTypes = confirmCharacterTypes();
  console.log("This password should contain:\nLowercase characters:", characterTypes[0], "\nUppercase characters:", characterTypes[1], "\nNumeric characters:", characterTypes[2], "\nSpecial characters:", characterTypes[3]);
  var characterPool = possibleCharacters(characterTypes);
  console.log("This password should contain a combination of the following characters:", characterPool);

  // create an array of characters contained in characterPool and stores it as a variable
  var characterArray = characterPool.split("");
  // defines password as an empty string to be added to
  var password = "";

  // creates password by adding one random character each loop. Determines random character by selecting a random index in characterArray. Loops until the password is at the desired length.
  for (var i = 0; i < passwordLength; i++) {
    var randomCharacter = characterArray[Math.floor(Math.random() * characterArray.length)];
    password += randomCharacter;
  }
  
  // log and return the created password
  console.log("Your password is:", password);
  return password;
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
