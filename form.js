//Explains what data should look like
const schema = {
  name: Joi.string().alphanum().min(3).required(),
  email: Joi.string().email().required(),
  contact: Joi.number().required(),
  house: Joi.number().min(1).required(),
  street: Joi.string().min(5).required(),
  town: Joi.string().alphanum().min(5).required(),
  postcode: Joi.string().min(7).required(),
  quantity: Joi.number().min(1).required(),
  stripes: Joi.required(),
  size: Joi.required(),
  colour: Joi.required(),
};
const ref = document.getElementById("myForm");

//Data that user is giving
const inputObj = {};

ref.addEventListener("input", (e) => {
  inputObj[e.target.name] = e.target.value;

  //Gives user data and schema to joi - either returns a list of errors or no errors
  Joi.validate(inputObj, schema, { abortEarly: false }, (errors, results) => {
    console.log(errors, results);
    const errorsObj = {};

    //Looping over errors and turning them into an object
    if (errors) {
      errors.details.forEach((error) => {
        errorsObj[error.context.key] = error.message;
      });
    }

    //Turning off old errors in the DOM
    const allErrors = document.getElementsByTagName("div");
    Array.from(allErrors).forEach((error) => {
      error.innerHTML = "";
    });

    //Turning on errors in the DOM
    for (const error in errorsObj) {
      document.getElementById(`${error}Error`).innerHTML = errorsObj[error];
    }
  });
});
