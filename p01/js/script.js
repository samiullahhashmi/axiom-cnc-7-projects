const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');


// functions

// Error Function

function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

//Success Function

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// function valid email

function validEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value)) {
        showSuccess(input);
    } else {
        showError(input, `Please write a valid email`)
    }
}

function getFieldId(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
// function fields data

function checkData(inputArray) {
    inputArray.forEach(function(input) {
        if ( input.value === '' ) {
            console.log(input.id);
            showError(input,`${getFieldId(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
}

// function checking input length

function checkLength(input, min, max) {
    if ( input.value.length < min ) {
        showError(input, `${getFieldId(input)} needs to be at least ${min} characters`);
    } else if (input.value.length > max) {
        showError(input, `${getFieldId(input)} needs to be less than  ${max} characters`);
    } else {
        showSuccess(input);
    }
}

// function password matches password2

function checkPassword(input, input2) {
    if ( input.vale !== input2.value ) {
        showError(input2, "Password 2 dosen't matches password 1")
    } 
}

// function input proper case

// function properCase(input) {
//     return input.id.charAt(0).toUpperCase() + input.id.slice(1);
// }


// Event Listener 

form.addEventListener('submit', function(e) {
     e.preventDefault();
    checkData([username,email,password,password2]); 
    checkLength(username, 3, 10);
    validEmail(email);
    checkLength(password, 6, 30);
    checkPassword(password,password2);
});