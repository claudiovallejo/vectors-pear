const Joi = require("@hapi/joi");

const ageOptionList = [
  "0-18",
  "18-25",
  "25-30",
  "30-35",
  "35-45",
  "45+",
];

const validAgeValues = Joi.string().valid(
  "0-18",
  "18-25",
  "25-30",
  "30-35",
  "35-45",
  "45+",
);

module.exports = {
  ageOptionList,
  validAgeValues,
};