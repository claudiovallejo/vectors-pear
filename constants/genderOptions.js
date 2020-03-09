const Joi = require("@hapi/joi");

const genderOptionList = [
  "Female",
  "Male",
  "Non-Binary",
];

const validGenderValues = Joi.string().valid(
  "Female",
  "Male",
  "Non-Binary",
);

module.exports = {
  genderOptionList,
  validGenderValues,
};