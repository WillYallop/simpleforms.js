export default class simpleforms {
    constructor(form, config) {
        this.methods = {
            email_sf: {
                active: true,
                regex: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                min: 5,
                max: 100
            },
            phoneUk_sf: {
                active: true,
                regex: /^(?:(?:\(?(?:0(?:0|11)\)?[\s-]?\(?|\+)44\)?[\s-]?(?:\(?0\)?[\s-]?)?)|(?:\(?0))(?:(?:\d{5}\)?[\s-]?\d{4,5})|(?:\d{4}\)?[\s-]?(?:\d{5}|\d{3}[\s-]?\d{3}))|(?:\d{3}\)?[\s-]?\d{3}[\s-]?\d{3,4})|(?:\d{2}\)?[\s-]?\d{4}[\s-]?\d{4}))(?:[\s-]?(?:x|ext\.?|#)\d{3,4})?$/,
                min: 2,
                max: 15
            },
            phoneUsa_sf: {
                active: true,
                regex: /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/,
                min: 2,
                max: 15
            },
            name_sf: {
                active: true,
                regex: /^[a-z A-Z]+(?:-[a-z A-Z]+)*$/,
                min: 2,
                max: 15
            },
            message_sf: {
                active: true,
                regex: /^[a-z A-Z!?.,]+(?:-[a-z A-Z!?.,]+)*$/,
                min: 5,
                max: 200
            },
            password_sf: {
                active: true,
                mediumRegex: "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})",
                strongRegex: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})",
                min: 4,
                max: 20
            },
            passwordRepeat_sf: {
                active: true
            },
            checkbox_sf: {
                active: true
            }
        };
        this.form = form;
        this.errorClass = "error";
        this.watchKeyup = true;
        this.escapeValues = true;
        this.useTogglePassword = false;
        this.togglePasswordBtnId = "togglePasswordBtn";
        this.activePassowrdBtnClass = "visible";
        this.useStrengthIndicator = false;
        this.strengthIndicatorId = "strengthIndicator";
        this.useMessageCount = false;
        this.messageCountId = "messageCount";
        this.messageCountErrorClass = "error";
        this.inputs = [];

        this.config(config);
        this.initialise(form);
    }
    config(config) { // Sets config values if they exists and are correct data types
        // Set config value
        config.watchKeyup != undefined ? this.checkType(config.watchKeyup, "boolean") ? this.watchKeyup = config.watchKeyup : this.error("Type of 'watchKeyup' must be a boolean!") : false;
        config.errorClass != undefined ? this.checkType(config.errorClass, "string") ? this.errorClass = config.errorClass : this.error("Type of 'errorClass' must be a string!") : false;
        config.escapeValues != undefined ? this.checkType(config.escapeValues, "boolean") ? this.escapeValues = config.escapeValues : this.error("Type of 'escapeValues' must be a boolean!") : false;
        // For password show btn
        config.useTogglePassword != undefined ? this.checkType(config.useTogglePassword, "boolean") ? this.useTogglePassword = config.useTogglePassword : this.error("Type of 'useTogglePassword' must be a boolean!") : false;
        config.togglePasswordBtnId != undefined ? this.checkType(config.togglePasswordBtnId, "string") ? this.togglePasswordBtnId = config.togglePasswordBtnId : this.error("Type of 'togglePasswordBtnId' must be a string!") : false;
        config.activePassowrdBtnClass != undefined ? this.checkType(config.activePassowrdBtnClass, "string") ? this.activePassowrdBtnClass = config.activePassowrdBtnClass : this.error("Type of 'activePassowrdBtnClass' must be a string!") : false;
        this.useTogglePassword ? this.listenToTogglePasswordBtn() : false; 
        // For message Count
        config.useMessageCount != undefined ? this.checkType(config.useMessageCount, "boolean") ? this.useMessageCount = config.useMessageCount : this.error("Type of 'useMessageCount' must be a boolean!") : false;
        config.messageCountId != undefined ? this.checkType(config.messageCountId, "string") ? this.messageCountId = config.messageCountId : this.error("Type of 'messageCountId' must be a string!") : false;
        config.messageCountErrorClass != undefined ? this.checkType(config.messageCountErrorClass, "string") ? this.messageCountErrorClass = config.messageCountErrorClass : this.error("Type of 'messageCountErrorClass' must be a string!") : false;
        // For password strength
        config.useStrengthIndicator != undefined ? this.checkType(config.useStrengthIndicator, "boolean") ? this.useStrengthIndicator = config.useStrengthIndicator : this.error("Type of 'useStrengthIndicator' must be a boolean!") : false;
        config.strengthIndicatorId != undefined ? this.checkType(config.strengthIndicatorId, "string") ? this.strengthIndicatorId = config.strengthIndicatorId : this.error("Type of 'strengthIndicatorId' must be a string!") : false;

        // Set config values for methods
        if(config.methods != undefined) {
            for (const [key] of Object.entries(config.methods)) {

                // Add custom methods 
                if(this.methods[key] === undefined) {
                    let methodObj = {
                        [key]: {
                            active: true,
                            regex: undefined,
                            min: 2,
                            max: 100
                        }
                    };
                    Object.assign(this.methods, methodObj);
                }

                // Check objects child values to verify types
                for (const [key2, value2] of Object.entries(config.methods[key])) {
                    // For max value
                    key2 === "max" ? this.checkType(value2, "number") ? this.methods[key][key2] = value2 : this.error(`Method ${key}, ${key2} type must be a number!`) : false;
                    // For min value
                    key2 === "min" ? this.checkType(value2, "number") ? this.methods[key][key2] = value2 : this.error(`Method ${key}, ${key2} type must be a number!`) : false;
                    // For regex value
                    key2 === "regex" ? this.checkType(value2, "object") ? this.methods[key][key2] = value2 : this.error(`Method ${key}, ${key2} type must be a regex/object!`) : false;
                    // For toggle checks
                    key2 === "active" ? this.checkType(value2, "boolean") ? this.methods[key][key2] = value2 : this.error(`Method ${key}, ${key2} type must be a boolean!`) : false;
                    // For password regex
                    key2 === "mediumRegex" ? this.checkType(value2, "object") ? this.methods[key][key2] = value2 : this.error(`Method ${key}, ${key2} type must be a regex/object!`) : false;
                    key2 === "strongRegex" ? this.checkType(value2, "object") ? this.methods[key][key2] = value2 : this.error(`Method ${key}, ${key2} type must be a regex/object!`) : false;
                }
            }
        }
    }
    initialise(form) { // Runs through the form and gets inputs from it
        // Add inputs if the user wants us to verify to it
        for(var i = 0; i < form.elements.length; i++) {
            if(form.elements[i].localName != "button") {
                let obj = {
                    id: form.elements[i].id,
                    value: form.elements[i].value,
                    methodType: form.elements[i].name.includes("_sf") ? form.elements[i].name : false,
                    hasError: false,
                    error: false,
                    passed: false,
                    methodStrategy: form.elements[i].name === "passwordRepeat_sf" || form.elements[i].name === "password_sf" || form.elements[i].name === "checkbox_sf" ? false : true
                };
                form.elements[i].name === "password_sf" ? obj.strength = "weak" : false;
                form.elements[i].name === "checkbox_sf" ? obj.checked = form.elements[i].checked : false;
                this.inputs.push(obj);
            }
        }

        if(this.watchKeyup) { // Only add keyupevent listener if the config says to
            // Run specific method type verification to input
            for(var n = 0; n < this.inputs.length; n++) {
                this.inputKeyupListener(this.inputs[n].id);
            }
        } else { // If users has set it to false - we still want to listen to the password field if it exists to update the strength indicator
            if(this.useStrengthIndicator) {
                let passwordInp = this.inputs.findIndex( x => x.methodType === "password_sf");
                if(passwordInp) {
                    this.inputKeyupListener(this.inputs[passwordInp].id);
                }
            }
            if(this.useMessageCount) {
                let messageInp = this.inputs.findIndex( x => x.methodType === "message_sf");
                if(messageInp) {
                    this.inputKeyupListener(this.inputs[messageInp].id);
                }
            }
        }
    }
    verifyInput(input, index) {
        if(input.methodType) { // Check if its a input the user wants to validate
            // Set variables for input
            let inpConfig = this.methods[input.methodType];
            let value = input.value;

            // For default input method stratagies
            if(input.methodStrategy) {
                // Check value against corressponding method values
                if(inpConfig.active) {
                    if(value.length >= inpConfig.min && value.length <= inpConfig.max) {
                        if(new RegExp(inpConfig.regex).test(value)) {
                            this.updateInput(index, {
                                passed: true,
                                hasError: false,
                                toggleErrorClass: false
                            });
                        } else {
                            this.updateInput(index, {
                                passed: false,
                                hasError: true,
                                error:"Please enter a valid input!",
                                toggleErrorClass: true
                            });
                        }
                    } else {
                        this.updateInput(index, {
                            passed: false,
                            hasError: true,
                            error:`Incorrect length! Please be inbetween ${inpConfig.min} and ${inpConfig.max}!`,
                            toggleErrorClass: true
                        });
    
                    }
                } else {
                    this.updateInput(index, {
                        passed: true,
                        hasError: false,
                        toggleErrorClass: false
                    });
                }
            } 
            // for cusotm complex methods
            else if (input.methodType === "passwordRepeat_sf") {
                if(inpConfig.active) {
                    let passwordInp = this.inputs.find( x => x.methodType === "password_sf");
                    if(passwordInp) {
                        if(passwordInp.value.length > 0 && passwordInp.value === value) {
                            this.updateInput(index, {
                                passed: true,
                                hasError: false,
                                toggleErrorClass: false
                            });
                        } else {
                            this.updateInput(index, {
                                passed: false,
                                hasError: true,
                                error:"Does not match passowrd input!",
                                toggleErrorClass: true
                            });
                        }
                    } else {
                        this.error("Cannot find password input!");
                    }
                } else {
                    this.updateInput(index, {
                        passed: true,
                        hasError: false,
                        toggleErrorClass: false
                    });
                }
            }
            else if (input.methodType === "password_sf") {
                if(inpConfig.active) {
                    if(value.length >= inpConfig.min && value.length <= inpConfig.max) {
                        if(new RegExp(inpConfig.strongRegex).test(value)) {
                            this.updateInput(index, {
                                passed: true,
                                toggleErrorClass: false,
                                hasError: false,
                                error: false,
                                strength: "strong"
                            });
                            this.updatePasswordStrenghtClass("strong");
                        } else if (new RegExp(inpConfig.mediumRegex).test(value)) {
                            this.updateInput(index, {
                                passed: true,
                                toggleErrorClass: false,
                                hasError: false,
                                error: false,
                                strength: "medium"
                            });
                            this.updatePasswordStrenghtClass("medium");
                        } else {
                            this.updateInput(index, {
                                passed: false,
                                hasError: true,
                                error: "Failed strength tests!",
                                toggleErrorClass: true,
                                strength: "weak"
                            });
                            this.updatePasswordStrenghtClass(false);
                        }
                    } else {
                        this.updateInput(index, {
                            passed: false,
                            hasError: true,
                            error: `Incorrect length! Please be inbetween ${inpConfig.min} and ${inpConfig.max}!`,
                            toggleErrorClass: true,
                            strength: "weak"
                        });
                        this.updatePasswordStrenghtClass(false);
                    }
                } else {
                    this.updateInput(index, {
                        passed: true,
                        hasError: false,
                        error: false,
                        toggleErrorClass: false,
                        strength: "strong"
                    });
                    this.updatePasswordStrenghtClass("strong");
                }
            }
            else if (input.methodType === "checkbox_sf") {
                if(inpConfig.active) { 
                    if(input.checked) {
                        this.updateInput(index, {
                            passed: true,
                            hasError: false,
                            toggleErrorClass: false
                        });
                    } else {
                        this.updateInput(index, {
                            passed: false,
                            hasError: true,
                            error: "Checkbox not ticked!",
                            toggleErrorClass: true
                        });
                    }
                } else {
                    this.updateInput(index, {
                        passed: true,
                        hasError: false,
                        toggleErrorClass: false
                    });
                }
            }
        }
    }
    inputKeyupListener(id) {
        let input = document.getElementById(id);
        if(input.name != "checkbox_sf") {
            // If this is an input the users wants verifying
            let inputIndex = this.inputs.findIndex( x => x.id === id);
            if(this.inputs[inputIndex].methodType) {
                input.addEventListener("keyup", () => {
                    this.inputs[inputIndex].value = input.value; // Set recent value
                    // Verify specific input
                    this.verifyInput(this.inputs[inputIndex], inputIndex);
                    // For message
                    if(this.useMessageCount) {
                        this.inputs[inputIndex].methodType === "message_sf" ? this.updateMessageCount(this.inputs[inputIndex].id) : false
                    }
                });
            }
        }
    }
    submit() {
        return new Promise((resolve, reject) => {

            // Run specific method type verification to input
            for(var n = 0; n < this.inputs.length; n++) {
                let input = document.getElementById(this.inputs[n].id);
                this.inputs[n].value = input.value;
                this.inputs[n].methodType === "checkbox_sf" ? this.inputs[n].checked = input.checked : false;
                
                this.verifyInput(this.inputs[n], n);
            }
            
            if(this.returnData().failed) {
                reject(this.returnData());
            } else {
                resolve(this.returnData());
                this.reset();
            }
        });
    }
    reset() {
        for(var i = 0; i < this.inputs.length; i++) {
            // Resets internal data
            this.updateInput(i, {
                passed: false,
                hasError: false,
                error: false,
                toggleErrorClass: false
            });
            if(this.inputs[i].methodType === "passwordRepeat_sf") {
                this.updateInput(i, {
                    strength: false
                });
                this.updatePasswordStrenghtClass(false);
            }
            // Resets input fields
            let input = document.getElementById(this.inputs[i].id);
            input.value = "";
        }

        if(this.useMessageCount) {
            let messageCountEle = document.getElementById(this.messageCountId);
            messageCountEle.classList.remove(this.messageCountErrorClass);
            messageCountEle.innerText = `0`;
        }
    }

    // Alt functions
    updateInput(index, options) {
        options.passed != undefined ? this.inputs[index].passed = options.passed : false;
        options.hasError != undefined ? this.inputs[index].hasError = options.hasError : false;
        options.error != undefined ? this.inputs[index].error = options.error : false;
        this.toggleErrorClass(this.inputs[index].id, options.toggleErrorClass);
        options.strength != undefined ? this.inputs[index].strength = options.strength : false;
    }
    toggleErrorClass(id, bool) {
        let input = document.getElementById(id);
        bool ? input.classList.add(this.errorClass) : input.classList.remove(this.errorClass);
    }
    checkType(val, type) { // simple function to return true or false based on data type and paramaters
        return typeof val === type ? true : false;
    }
    listenToTogglePasswordBtn() {
        let togglePswdBtn = document.getElementById(this.togglePasswordBtnId);
        togglePswdBtn.addEventListener("click", () => {
            let passwordInputEle = document.getElementById(this.form["password_sf"].id);
            passwordInputEle.type === "password" ? passwordInputEle.type = "text" : passwordInputEle.type === "text" ? passwordInputEle.type = "password" : false;
            passwordInputEle.type === "text" ?  togglePswdBtn.classList.add(this.activePassowrdBtnClass) : togglePswdBtn.classList.remove(this.activePassowrdBtnClass);
         
            let passwordRepeatInputEle = document.getElementById(this.form["passwordRepeat_sf"].id);
            passwordRepeatInputEle.type === "password" ? passwordRepeatInputEle.type = "text" : passwordRepeatInputEle.type === "text" ? passwordRepeatInputEle.type = "password" : false;
            
        });
    }
    error(msg) {
        console.error(msg);
    }
    returnData() {
        let array = {
            inputs: [],
            failed: false
        };
        for(var i = 0; i < this.inputs.length; i++) {
            let obj = {
                [this.inputs[i].id]: this.escapeValues ? escape(this.inputs[i].value) : this.inputs[i].value,
                error: this.inputs[i].hasError ? this.inputs[i].error : false
            };
            this.inputs[i].methodType === "password_sf" ? obj.strength = this.inputs[i].strength : false; // add strength value to password field
            array.inputs.push(obj);
            if(this.inputs[i].hasError) {
                array.failed = true;
            }
        }
        return array;
    }
    updatePasswordStrenghtClass(strength) {
        if(this.useStrengthIndicator) {
            let passwordIndicator = document.getElementById(this.strengthIndicatorId);
            if(strength === "strong") {
                passwordIndicator.classList.add("strong");
                passwordIndicator.classList.remove("medium");
            } else if (strength === "medium") {
                passwordIndicator.classList.remove("strong");
                passwordIndicator.classList.add("medium");
            } else {
                passwordIndicator.classList.remove("strong");
                passwordIndicator.classList.remove("medium");
            }
        }
    }
    updateMessageCount(inputId) {
        // Get input value legength
        let messageLength = document.getElementById(inputId).value.length;
        // Get max characters for that method type
        let max = this.methods["message_sf"].max;
        let min = this.methods["message_sf"].min;
        // Update message count div via config id
        let messageCountEle = document.getElementById(this.messageCountId);
        messageCountEle.innerText = `${messageLength}/${max}`

        messageLength < min ? messageCountEle.classList.add(this.messageCountErrorClass) : false;
        messageLength > max ? messageCountEle.classList.add(this.messageCountErrorClass) : false;
        messageLength <= max && messageLength >= min ? messageCountEle.classList.remove(this.messageCountErrorClass);
    }
}