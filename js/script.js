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
    console.log('Prevented on name');
  }

  // If Email is not valid => do not Submit, emphasize the error (make text red), display hint
  if (!emailIsValid()) {
    e.preventDefault();
    console.log('Prevented on email');
  }

  // If no activity is checked (is not valid), do not Submit
  if (!activityIsValid()) {
    e.preventDefault();
    console.log('Prevented on activities');
  }

  // If Card payment is selected,
  //   check if card number, zip code and cvv code are valid
  // If not valid => do not Submit, emphasize the error (make text red), display hint
  if (paySelect.value === 'credit-card') {
    if (!cardNumberIsValid()) {
      e.preventDefault();
      console.log('Prevented on card number');
    }

    if (!zipCodeIsValid()) {
      e.preventDefault();
      console.log('Prevented on zip code');
    }

    if (!cvvIsValid()) {
      e.preventDefault();
      console.log('Prevented on cvv');
    }
  }
  console.log('#####################Submit succes!');
  e.preventDefault();
});