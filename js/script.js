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


// POATE FAC O FUNCTIE DE VALIDARE PENTRU TOATE CAZURILE FOLOSIND REGEX

function nameIsValid() {
  const regex = /^.+$/;   // must not be blank or empty (matches any character)
  return regex.test(nameField.value);
}

function emailIsValid() {
  const regex = /^[^@]+@[^@.]+\.com$/i;
  return regex.test(emailField.value);
}

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

function cardNumberIsValid() {
  const regex = /^\d{13,16}$/;    // matches any number 13 to 16 chars long
  return regex.test(cardNumber.value);
}

function zipCodeIsValid() {
  const regex = /^\d{5}$/;  // matches any number 5 chars long
  return regex.test(zipCode.value);
}

function cvvIsValid() {
  const regex = /^\d{3}$/;  // matches any number 3 chars long
  return regex.test(cvvCode.value);
}

form.addEventListener('submit', (e) => {

  // If Name is not valid => do not Submit, emphasize the error (make text red), display hint
  if (!nameIsValid()) {
    e.preventDefault();
    nameField.parentElement.classList.add('not-valid');
    nameField.parentElement.classList.remove('valid');
    nameField.parentElement.lastElementChild.style.display = 'inline';
    console.log('Prevented on name');
  } else {
    nameField.parentElement.classList.add('valid');
    nameField.parentElement.classList.remove('not-valid');
    nameField.parentElement.lastElementChild.style.display = '';
  }

  // If Email is not valid => do not Submit, emphasize the error (make text red), display hint
  if (!emailIsValid()) {
    e.preventDefault();
    emailField.parentElement.classList.add('not-valid');
    emailField.parentElement.classList.remove('valid');
    emailField.parentElement.lastElementChild.style.display = 'inline';
    console.log('Prevented on email');
  } else {
    emailField.parentElement.classList.add('valid');
    emailField.parentElement.classList.remove('not-valid');
    emailField.parentElement.lastElementChild.style.display = '';
  }

  // If no activity is checked (is not valid), do not Submit
  if (!activityIsValid()) {
    e.preventDefault();
    activitiesFieldset.classList.add('not-valid');
    activitiesFieldset.classList.remove('valid');
    activitiesFieldset.lastElementChild.style.display = 'inline';
    console.log('Prevented on activities');
  } else {
    activitiesFieldset.classList.add('valid');
    activitiesFieldset.classList.remove('not-valid');
    activitiesFieldset.lastElementChild.style.display = '';
  }

  // If Card payment is selected,
  //   check if card number, zip code and cvv code are valid
  // If not valid => do not Submit, emphasize the error (make text red), display hint
  if (paySelect.value === 'credit-card') {
    if (!cardNumberIsValid()) {
      e.preventDefault();
      cardNumber.parentElement.classList.add('not-valid');
      cardNumber.parentElement.classList.remove('valid');
      cardNumber.parentElement.lastElementChild.style.display = 'inline';
      console.log('Prevented on card number');
    } else {
      cardNumber.parentElement.classList.add('valid');
      cardNumber.parentElement.classList.remove('not-valid');
      cardNumber.parentElement.lastElementChild.style.display = '';
    }

    if (!zipCodeIsValid()) {
      e.preventDefault();
      zipCode.parentElement.classList.add('not-valid');
      zipCode.parentElement.classList.remove('valid');
      zipCode.parentElement.lastElementChild.style.display = 'inline';
      console.log('Prevented on zip code');
    } else {
      zipCode.parentElement.classList.add('valid');
      zipCode.parentElement.classList.remove('not-valid');
      zipCode.parentElement.lastElementChild.style.display = '';
    }

    if (!cvvIsValid()) {
      e.preventDefault();
      cvvCode.parentElement.classList.add('not-valid');
      cvvCode.parentElement.classList.remove('valid');
      cvvCode.parentElement.lastElementChild.style.display = 'inline';
      console.log('Prevented on cvv');
    } else {
      cvvCode.parentElement.classList.add('valid');
      cvvCode.parentElement.classList.remove('not-valid');
      cvvCode.parentElement.lastElementChild.style.display = '';
    }
  }
  console.log('#####################Submit succes!');
  e.preventDefault();
});