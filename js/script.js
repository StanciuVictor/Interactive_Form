const nameField = document.getElementById('name');
const emailField = document.getElementById('email');
const otherJobField = document.getElementById('other-job-role');
const jobRoleSelect = document.getElementById('title');
const colorSelect = document.getElementById('color');
const designSelect = document.getElementById('design');
const activitiesFieldset = document.getElementById('activities');
const workshopCheckboxes = activitiesFieldset.querySelectorAll('[data-day-and-time]');
const activitiesCost = document.getElementById('activities-cost');
let totalCost = 0;
const paySelect = document.getElementById('payment');
const cardOpt = document.getElementById('credit-card');
const paypalOpt = document.getElementById('paypal');
const bitcoinOpt = document.getElementById('bitcoin');


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
