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

Depedning on the verification you want on your form inputs you will want to add one of the corresponding methods as the name of the input. 

Find out more about the [method types here](#input-verification-methods).

```html
<form id="myForm">
    <label for="firstNameInp">First Name</label>
    <input id="firstNameInp" type="text" name="name_sf">

    <label for="emailInp">Email Address</label>
    <input id="emailInp" type="text" name="email_sf">
</form>
```

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

