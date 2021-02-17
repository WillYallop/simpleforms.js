<p align="center"><img align="center" style="height:100px" src="images/simpleFormsLogo.png"/></p><br/>

> Build your next form with confidence using Simpleforms.js: a lightweight, powerful and easy to use form validation and sanitization tool!

Simpleforms.js is a lightweight client side library for validation and sanitising your forms inputs. 

## Links

- 📱 Demo: [https://simpleforms.williamyallop.com](https://simpleforms.williamyallop.com)
- 🔗 NPM: [https://www.npmjs.com/package/simpleforms](https://www.npmjs.com/package/simpleforms)
- 👱 Author: [https://williamyallop.com](https://williamyallop.com)

## Features

- 7 Existing input validation methods
- Add custom input validation methods
- Real time validation
- Extensive config
- Toggle password visibility
- Password strength indicator

## Installation and Usage

### Instal via NPM

```sh
npm install simpleforms
```

### Import the library

```javascript
import simpleForms from "simpleforms";
```

After importing Simpleforms.js you have to initialise the library by passing it the form element. For example:

```javascript
let myForm = document.getElementById("myForm");

simpleForms.initialise(myForm);
```
### Client side setup

Depending on the verification you want on your form inputs you will want to add one of the corresponding methods as the name of the input. 

Find out more about the [method types here](#input-verification-methods).

```html
<form id="myForm">
    <!-- Name Verification-->
    <label for="firstNameInp">First Name</label>
    <input id="firstNameInp" type="text" name="name_sf">
    <!-- Email Address Verification -->
    <label for="emailInp">Email Address</label>
    <input id="emailInp" type="text" name="email_sf">
    <!-- Submit Button -->
    <button type="submit">Submit</button>
</form>
```

### Listen to the form

Now that the form is setup, to do the final check on the inputs data you will want to call the verify function.

```javascript
myForm.addEventListener( "submit", function(event) {
    event.preventDefault();
    
    simpleForms.verify()
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.log("Verification Failed!");
        console.log(error);
    });

});
```

This will return an object as a promise containing the forms data, with error messages (if they apply), and whether it failed as a whole or not. The reject promise will contain the same data as the resolove promise!

**The promise will look something like this:**

```javascript
{
    data: {
        { firstNameInp: "John", error: false },
        { emailInp: "johndoe@gmail", error: "Please enter a valid input!" }
    },
    failed: true
}
```

> Keep in mind the key for each input will be its id, and will contain the inputs value.

### Input Verification Methods

| Methods           | Defualt Validation                                                       |
|-------------------|--------------------------------------------------------------------------|
| email_sf          |  `Min Characters: 5`<br> `Max Characters: 100`<br> Must match email regex. |
| phoneUk_sf        | `Min Characters: 2`<br> `Max Characters: 15`<br> Must match UK phone numbers regex. |
| phoneUsa_sf       | `Min Characters: 2`<br> `Max Characters: 15`<br> Must match USA phone numbers regex. |
| name_sf           | `Min Characters: 2`<br> `Max Characters: 15`<br> Can only include `a-z A-Z`. |
| message_sf        | `Min Characters: 5`<br> `Max Characters: 200`<br> Can only include `a-z A-Z!?.,`. |
| password_sf       | `Min Characters: 4`<br> `Max Characters: 20`<br> Medium strength password must include 8 characters one of which being a number or capital. <br> Strong strength passowrd must include 8 characters one being a capital, number and special character `(!@#$%^&*)`. |
| passwordRepeat_sf | Must match password input. |

### Simpleforms.js Config

Simpleforms.js has a variety of config options you can edit to get the library setup how you like. To apply your custom config you should add the following before you run simpleForms.initialise(myForm) function.

```javascript
simpleForms.config({
    methods: {
        message_sf: {
            active: false,
            max: 500
        },
        custom_sf: {
            active: true,
            regex: /^[a-z A-Z]+(?:-[a-z A-Z]+)*$/,
            min: 5,
            max: 100
        }
    },
    errorClass: "inpError",
    escapeValues: false,
    showPasswordBtn: true,
    showStrengthIndicator: true
});
```

#### Here are the defult values and the breakdown.

| Config Option          | Type    | Default             | Breakdown                                                                                                       |
|------------------------|---------|---------------------|-----------------------------------------------------------------------------------------------------------------|
| errorClass             | String  | "error"             | This is the class that is added to inputs that fail validation.                                                 |
| watchKeyup             | Boolean | true                | This adds an event listener of "keyup" to each field with a method as the name, to verify the data as you type. |
| escapeValues           | Boolean | true                | This will escape the values of each input for the promise data.                                                 |
| showPasswordBtn        | Boolean | false               | This being true enables the logic of toggling the passwords type from password to text.                         |
| togglePasswordBtnId    | String  | "togglePasswordBtn" | This is the id of the toggle password button.                                                                   |
| activePasswordBtnClass | String  | "visible"           | This is the class that is added when the password input type is set to text.                                    |
| showStrengthIndicator  | Boolean | false               | This being true enables the logic to displayling the current passwords strength value.                          |
| strengthIndicatorId    | String  | "strengthIndicator" | This is the id of the strength indicator element.                                                               |