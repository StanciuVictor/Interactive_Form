const nameField = document.getElementById('name');
const emailField = document.getElementById('email');
const otherJobField = document.getElementById('other-job-role');
const jobRoleSelect = document.getElementById('title');
const colorSelect = document.getElementById('color');
const designSelect = document.getElementById('design');
const activitiesFieldset = document.getElementById('activities');
const activitiesCheckboxes = activitiesFieldset.querySelectorAll('input[type="checkbox"]');
const workshopCheckboxes = activitiesFieldset.querySelectorAll('[data-day-and-time]');
const activitiesCost = document.getElementById('activities-cost');
let totalCost = 0;
const paySelect = document.getElementById('payment');
const cardOpt = document.getElementById('credit-card');
const paypalOpt = document.getElementById('paypal');
const bitcoinOpt = document.getElementById('bitcoin');
const form = document.querySelector('form');
const cardNumber = document.getElementById('cc-num');
const zipCode = document.getElementById('zip');
const cvvCode = document.getElementById('cvv');


// Focus on the Name text field
nameField.focus();

// Hide the Other Job text field when the page loads
otherJobField.style.display = 'none';

// Disable the Color select
colorSelect.disabled = true;

// Select Credit Card option for payment
paySelect.children[1].selected = true;

// Hide PayPal and Bitcoin payment info
paypalOpt.style.display = 'none';
bitcoinOpt.style.display = 'none';

jobRoleSelect.addEventListener('change', () => {
  // If Other job is selected, display the text field and focus on it
  if (jobRoleSelect.value === 'other') {
    otherJobField.style.display = '';
    otherJobField.focus();
  } else {
    otherJobField.style.display = 'none';
  }
});


designSelect.addEventListener('change', () => {
  // Enable Color selection
  colorSelect.disabled = false;

  const colorOptions = colorSelect.children;  // HTMLCollection
  // Hide all options
  [...colorOptions].forEach(option => option.hidden = true);

  // If 'js puns' theme is selected, display themed T-Shirts and select first option available
  if (designSelect.value === 'js puns') {
    const jsPunsOptions = document.querySelectorAll("[data-theme='js puns']");
    jsPunsOptions.forEach(option => option.hidden = false);
    jsPunsOptions[0].selected = true;

    // If 'heart js' theme is selected, display themed T-Shirts and select first option available
  } else if (designSelect.value === 'heart js') {
    const heartJsOptions = document.querySelectorAll("[data-theme='heart js']");
    heartJsOptions.forEach(option => option.hidden = false);
    heartJsOptions[0].selected = true;
  }
});


activitiesFieldset.addEventListener('change', (e) => {
  const activity = e.target;

  // Get price for chosen activity (transform string to number)
  const activityCost = parseInt(activity.getAttribute("data-cost"), 10);

  // If activity is checked (clicked)
  if (activity.checked) {

    // Go through all activities and disable those who have the same time and date, except the activity that was checked (clicked)
    // Set class 'disabled' for those checkboxes' parent
    workshopCheckboxes.forEach(checkbox => {
      if ((activity.getAttribute('data-day-and-time') === checkbox.getAttribute('data-day-and-time')) && (activity !== checkbox)) {
        checkbox.disabled = true;
        checkbox.parentElement.classList.add('disabled');
      }
    });

    // Add activity price to total cost
    totalCost += activityCost;

    // If activity is unchecked (clicked again)
  } else if (!activity.checked) {

    // Go through all activities and enable those who have the same time and date, except the activity that was unchecked (clicked again)
    // Remove class 'disabled' for those checkboxes' parent
    workshopCheckboxes.forEach(checkbox => {
      if ((activity.getAttribute('data-day-and-time') === checkbox.getAttribute('data-day-and-time')) && (activity !== checkbox)) {
        checkbox.disabled = false;
        checkbox.parentElement.classList.remove('disabled');
      }
    });

    // Substract activity price from total cost
    totalCost -= activityCost;
  }

  // Display total cost
  activitiesCost.innerHTML = `Total: $${totalCost}`;
});


paySelect.addEventListener('change', () => {
  // When the user selects a payment method, display payment info only for that selection
  if (paySelect.value === 'credit-card') {
    cardOpt.style.display = '';
    paypalOpt.style.display = 'none';
    bitcoinOpt.style.display = 'none';
  } else if (paySelect.value === 'paypal') {
    cardOpt.style.display = 'none';
    paypalOpt.style.display = '';
    bitcoinOpt.style.display = 'none';
  } else if (paySelect.value === 'bitcoin') {
    cardOpt.style.display = 'none';
    paypalOpt.style.display = 'none';
    bitcoinOpt.style.display = '';
  }
});

// When an activity checkbox is focused on, make it more obvious (add .focus)
// When an activity checkbox is no longer focused on (is blurred), make it more obvious (remove .focus)
activitiesCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('focus', (e) => {
    e.target.parentElement.classList.add('focus');
  });

  checkbox.addEventListener('blur', (e) => {
    e.target.parentElement.classList.remove('focus');
    /* 
    * Target every .focus elemets (not necesary)
    * [...document.getElementsByClassName('focus')].forEach(element => {
    *   element.classList.remove('focus');
    * });`
    */
  });
});


/**
 * Goes through every checkbox asociated to an activity and checkes if checkbox is checked or not.
 * 
 * @returns Number of checked boxes. If zero, it will be evaluated as NOT VALID and
 * will preventDefault() in the 'submit' eventListeneer
 */
function activityIsValid() {
  let helpFlag = 0;
  activitiesCheckboxes.forEach(checkbox => {
    if (checkbox.checked) {
      helpFlag++;
    }
  });
  return helpFlag;
}

/**
 * Tests if the text inserted by user (name, email, card number, zip code, cvv code) in the <input> element matches the RegEx pattern.
 * 
 * @param {object} element - HTML <input> element
 * @param {object} regex - Regular Expression for user's info
 * @returns TRUE if input matches the RegEx, FALSE otherwise
 */
function validator(element, regex) {
  // console.log(regex.test(element.value));
  return regex.test(element.value);
}

/**
 * Emphasizes the error (makes text red), displays hint
 * 
 * @param {object} element - HTML <input> element
 */
function displayErr(element) {
  if (element === activitiesFieldset) {
    activitiesFieldset.classList.add('not-valid');
    activitiesFieldset.classList.remove('valid');
    activitiesFieldset.lastElementChild.style.display = 'inline';
  } else {
    element.parentElement.classList.add('not-valid');
    element.parentElement.classList.remove('valid');
    element.parentElement.lastElementChild.style.display = 'inline';
  }
}

/**
 * Hides error messages and displays a green check mark
 * 
 * @param {object} element - HTML <input> element
 */
function displayOk(element) {
  if (element === activitiesFieldset) {
    element.classList.add('valid');
    element.classList.remove('not-valid');
    element.lastElementChild.style.display = '';
  } else {
    element.parentElement.classList.add('valid');
    element.parentElement.classList.remove('not-valid');
    element.parentElement.lastElementChild.style.display = '';
  }
}

form.addEventListener('submit', (e) => {

  // If Name is not valid => do not Submit, emphasize the error (make text red), display hint
  // If Name is valid => Submit
  if (!validator(nameField, /^.+$/)) {
    e.preventDefault();
    displayErr(nameField);
    console.log('Prevented on name');
  } else {
    displayOk(nameField);
  }

  // If Email is not valid => do not Submit, emphasize the error (make text red), display hint
  // If Email is valid => Submit
  if (!validator(emailField, /^[^@]+@[^@.]+\.com$/i)) {
    e.preventDefault();
    displayErr(emailField);
    console.log('Prevented on email');
  } else {
    displayOk(emailField);
  }

  // If no activity is checked (is not valid), do not Submit
  // If at least one activity is checked => Submit
  if (!activityIsValid()) {
    e.preventDefault();
    displayErr(activitiesFieldset);
    console.log('Prevented on activities');
  } else {
    displayOk(activitiesFieldset);
  }

  // If Card payment is selected, check if card number, zip code and cvv code are valid
  // If not valid => do not Submit, emphasize the error (make text red), display hint
  // If valid => Submit
  if (paySelect.value === 'credit-card') {
    if (!validator(cardNumber, /^\d{13,16}$/)) {
      e.preventDefault();
      displayErr(cardNumber);
      console.log('Prevented on card number');
    } else {
      displayOk(cardNumber);
    }

    if (!validator(zipCode, /^\d{5}$/)) {
      e.preventDefault();
      displayErr(zipCode);
      console.log('Prevented on zip code');
    } else {
      displayOk(zipCode);
    }

    if (!validator(cvvCode, /^\d{3}$/)) {
      e.preventDefault();
      displayErr(cvvCode);
      console.log('Prevented on cvv');
    } else {
      displayOk(cvvCode);
    }
  }
  // console.log('#####################Submit succes!');
  // e.preventDefault();
});

/**
 * Checks if user's input is valid and displays/hides error messages accordingly
 * 
 * @param {object} element - HTML <input> element
 * @param {object} regex - Regular Expression for user's info
 */
function validatorRealTime(element, regex){
  if (!validator(element, regex)) {
    displayErr(element);
  } else {
    displayOk(element);
  }
}

nameField.addEventListener('keyup', () => {
  validatorRealTime(nameField, /^.+$/);
  // if (!validator(nameField, /^.+$/)) {
  //   displayErr(nameField);
  // } else {
  //   displayOk(nameField);
  // }
});

emailField.addEventListener('keyup', () => {
  validatorRealTime(emailField, /^[^@]+@[^@.]+\.com$/i);
  // if (!validator(emailField, /^[^@]+@[^@.]+\.com$/i)) {
  //   displayErr(emailField);
  // } else {
  //   displayOk(emailField);
  // }
});

activitiesCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    if (!activityIsValid()) {
      displayErr(activitiesFieldset);
    } else {
      displayOk(activitiesFieldset);
    }
  });
});

cardNumber.addEventListener('keyup', () => {
  validatorRealTime(cardNumber, /^\d{13,16}$/);
});

zipCode.addEventListener('keyup', () => {
  validatorRealTime(zipCode, /^\d{5}$/);
});

cvvCode.addEventListener('keyup', () => {
validatorRealTime(cvvCode, /^\d{3}$/);
});
