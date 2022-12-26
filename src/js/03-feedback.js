import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const LOCALSTORAGE_KEY = "feedback-form-state";
let formData = {};

form.addEventListener('input', throttle(saveData, 500));
form.addEventListener('submit', onFormSubmit);

fillInForm();

function saveData(evt) {
    formData[evt.target.name] = evt.target.value;
 
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
  }

function onFormSubmit(evt) {
    evt.preventDefault();
    evt.currentTarget.reset();
    console.log(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)));
    localStorage.removeItem(LOCALSTORAGE_KEY);
}

function fillInForm() {
      try {
        const savedData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
    
        if (savedData) {
            form.elements.email.value = savedData.email;
            form.elements.message.value = savedData.message;
         }
    } catch (error) {
        console.log(error.message);
    }
    }
    