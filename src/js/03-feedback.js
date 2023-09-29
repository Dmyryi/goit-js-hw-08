import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),

};

const FORM_STORAGE_KEY = 'feedback-form-state';
let formData = {};

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

fillForm();

function fillForm() {
try {
  const savedData = localStorage.getItem(FORM_STORAGE_KEY, 500);
  if (!savedData) return;
  formData = JSON.parse(savedData)
  Object.entries(formData).forEach(([key, val]) => {
    refs.form.elements[key].value = val;
  })
} catch ({message}) {
  console.log(message)
}

}

function onFormInput(e) {
  formData[e.target.name] = e.target.value.trim();
  localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();

 

    localStorage.removeItem(FORM_STORAGE_KEY);
  console.log(formData);
  formData = {}
  e.target.reset()




    delete formData.email;
    delete formData.message;
    
  
}