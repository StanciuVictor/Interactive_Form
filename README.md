# Interactive Form
- [x] Basic functionality
- [x] Form Validation
- [x] Accesibility
- [x] Real-time error message
- [x] Conditional error message

## Basic Functionality
1. When the page first loads, the **"Name"** text field has the focus state by default to prompt the user.

2. The **"Other job role"** text field is hidden by default. It is displayed only when users select **"Other"** in the **"Job Role"** drop down menu, and is hidden if the user selects any other option.

3. The **"Color"** drop down menu is not available until the user chooses a design from the **"Design"** drop down menu. Once the user selects a design, the **"Color"** drop down menu becomes available and contains only colors associated with the selected design.

4. The **"Total: $"** element below the **"Register for Activities"** section updates to reflect the sum of the cost of the user’s selected activities.

5. In the **"Payment Info"** section the **"Credit Card"** option is selected by default. The section updates based on the user's selection.

## Form Validation
1. The **"Name"** field cannot be blank or empty.

2. The **"Email Address"** field must contain a validly formatted email address. The email address does not need to be a real email address, just formatted like one. For example: `dave@teamtreehouse.com`. A few characters for the username, followed by "@", followed by a few more characters and a ".com" for the domain name.

3. The **"Register for Activities"** section must have at least one activity selected. Users cannot register for activities that occur at the same time.

4. **If** and only **if** credit card is the selected payment method:
   - The **"Card number"** field must contain a 13 - 16 digit credit card number with no dashes or spaces. The value does not need to be a real credit card number;
   - The **"Zip code"** field must contain a 5 digit number;
   - The **"CVV"** field must contain a 3 digit number.

## Accessibility
1. Focus states in the **"Register for Activities"** section are now more obvious.

2. Form validation is now more obvious:
   - Valid fields display a green check mark;
   - Invalid fields display a red warning sign and a hint for the user.

## Real-time error message
For every input field, there is an event listener for keyup event. Every time the event listener is fired, the user's input is verified using the associated RegEx pattern. If the user's input does not match the RegEx pattern, the error messages are displayed according to [Accessibility](#accessibility). If the user's input does match the RegEx pattern, the error messages are hidden and a green check appears, signaling that the input is valid.

For every activity checkbox, there is an event listener for change event. Every time the event listener is fired, the number of selected activities is compared to 0. If it is equal to 0, meaning no activity is selected, the error messages are displayed according to [Accessibility](#accessibility). If at least one activity is selected, the error messages are hidden and a green check appears.


## Conditional error message
After the user begins to type:
- If the **"Email Address"** field becomes empty (the user deletes the address) the error message "Please write your email address" will be displayed;
- If the email address writen by the user does not match the RegEx pattern (see [Form Validation](#form-validation)), the error message "Email address must match the format: `example@example.com`" will be displayed;
- If the email address writen by the user is valid, the error message is hidden and the green check mark is displayed, meaning the form can be submitted.