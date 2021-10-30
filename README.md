# Interactive Form
- [x] Basic functionality
- [x] Form Validation
- [ ] Accesibility

## Basic Functionality
1. When the page first loads, the **"Name"** text field has the focus state by default to prompt the user.

2. The **"Other job role"** text field is hidden by default. It is displayed only when users select **"Other"** in the **"Job Role"** drop down menu, and is hidden if the user selects any other option.

3. The **"Color"** drop down menu is not available until the user chooses a design from the **"Design"** drop down menu. Once the user selects a design, the **"Color"** drop down menu becomes available and contains only colors associated with the selected design.

4. The **"Total: $"** element below the **"Register for Activities"** section updates to reflect the sum of the cost of the user’s selected activities.

5. In the **"Payment Info"** section the **"Credit Card"** option is selected by default. The section updates based on the user's selection.

## Form Validation
1. The **"Name"** field cannot be blank or empty.

2. The **"Email Address"** field must contain a validly formatted email address. The email address does not need to be a real email address, just formatted like one. For example: `dave@teamtreehouse.com`. A few characters for the username, followed by "@", followed by a few more characters and a ".com" for the domain name.

3. The **"Register for Activities"** section must have at least one activity selected.

4. **If** and only **if** credit card is the selected payment method:
   - The **"Card number"** field must contain a 13 - 16 digit credit card number with no dashes or spaces. The value does not need to be a real credit card number;
   - The **"Zip code"** field must contain a 5 digit number;
   - The **"CVV"** field must contain a 3 digit number.

## Accessibility
1. Focus states in the **"Register for Activities"** section are now more obvious.

2. Form validation is now more obvious:
   - Valid fields display a green check mark;
   - Invalid fields display a red warning sign and a hint for the user.
