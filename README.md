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
| email_sf          | `active: true`<br> `min: 5`<br> `max: 100`<br> `regex: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/` |
| phoneUk_sf        | `active: true`<br> `min: 2`<br> `max: 15`<br> `regex: /^(?:(?:\(?(?:0(?:0|11)\)?[\s-]?\(?|\+)44\)?[\s-]?(?:\(?0\)?[\s-]?)?)|(?:\(?0))(?:(?:\d{5}\)?[\s-]?\d{4,5})|(?:\d{4}\)?[\s-]?(?:\d{5}|\d{3}[\s-]?\d{3}))|(?:\d{3}\)?[\s-]?\d{3}[\s-]?\d{3,4})|(?:\d{2}\)?[\s-]?\d{4}[\s-]?\d{4}))(?:[\s-]?(?:x|ext\.?|#)\d{3,4})?$/` |
| phoneUsa_sf       | `active: true`<br> `min: 2`<br> `max: 15`<br> `regex: /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/` |
| name_sf           | `active: true`<br> `min: 2`<br> `max: 15`<br> `regex: /^[a-z A-Z]+(?:-[a-z A-Z]+)*$/` |
| message_sf        | `active: true`<br> `min: 5`<br> `max: 200`<br> `regex: /^[a-z A-Z!?.,]+(?:-[a-z A-Z!?.,]+)*$/` |
| password_sf       | `active: true`<br> `min: 4`<br> `max: 20`<br> `mediumRegex: ^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})`<br> `strongRegex: ^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})` |
| passwordRepeat_sf | `active: true` |

