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
  //  if (form.elements.email.value === "" || form.elements.message.value === "") {
  //   return alert("Please fill in all the fields!");
  // }
    evt.preventDefault();
    evt.currentTarget.reset();
    console.log(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)));
    localStorage.removeItem(LOCALSTORAGE_KEY);
}

function fillInForm() {
  try {
    const savedData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
    console.log(savedData);

    if (savedData) {
      form.elements.email.value = savedData.email ?? '';
      form.elements.message.value = savedData.message ?? ''; 
    }
  } catch (error) {
          console.log(error.message);
      }
  }

// function fillInForm() {
//     const savedData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
//     console.log(savedData);

//     if (savedData) {       
//       Object.entries(savedData).forEach(([key, value]) => {
//         console.log(form[key].value = value);
//         console.log(formData[key] = value);
//     })
//   };
// }
