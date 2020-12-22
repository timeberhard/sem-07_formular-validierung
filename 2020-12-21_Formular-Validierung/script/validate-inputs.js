/* Aufgabe:
  Fügen Sie die notwendigen Selektoren für
  firstname, lastname, mobile, password2
*/

const form = document.getElementById('form');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const mobile = document.getElementById('mobile');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const checkPassword = document.getElementById('checkPassword');

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

/* Aufgabe:
    Validieren Sie die Mobile-Nummer ähnlich wie bei der Email mit einer
    Regular expression (regex). Für eine geeignete regex suchen Sie
    im Internet nach "javascript regular expression for mobile number".
*/
// Check phone is valid https://stackoverflow.com/questions/16188709/mobile-number-validation-using-regex-javascript/47260444
function checkMobile(input) {
  const re = /^\d{9,10}$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Mobile is not valid');
  }
}


// Check required fields
function checkRequired(inputArr) {
  let isRequired = false;
  inputArr.forEach(function(input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
      isRequired = true;
    } else {
      showSuccess(input);
    }
  });

  return isRequired;
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
        input,
        `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
        input,
        `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

/* Aufgabe:
    Validieren Sie, ob die beiden Passwörter übereinstimmen.
    Falls sie nicht übereinstimmen, geben Sie (ähnlich wie in den anderen Beispielen)
    eine Fehlermeldung dem Formular aus.
*/
// Check passwords match


// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function validateForm(){
  if(!checkRequired([firstname, lastname, username, email, password])){
    //Aufgabe: Validierung der Länge für Vorname (2 bis 20) und Nachname (2 bis 50)
    checkLength(firstname, 2, 20);
    checkLength(lastname, 2, 50);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    /* Aufgabe:
      Validierung der Telefonnumer ähnlich wie bei der Email mit einer
      Regular expression (regex). Für eine geeignete regex suchen Sie
      im Internet nach "javascript regular expression for mobile number"
    * */
    checkMobile(mobile);
    checkEmail(email);
    /* Aufgabe:
      Validierung Sie die beiden Passwörter, damit password
      mit checkPassword übereinstimmt.
    * */
      
  }
}


// Event listeners
form.addEventListener('submit', function(e) {
  //https://www.w3schools.com/jsref/event_preventdefault.asp
  e.preventDefault();
  //First validate form
  validateForm();
});
