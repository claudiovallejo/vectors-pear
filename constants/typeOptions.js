const Joi = require("@hapi/joi");

const typeOptionList = [
  "Mentor",
  "Mentee",
];

const validTypeValues = Joi.string().valid(
  "Mentor",
  "Mentee",
);

module.exports = {
  typeOptionList,
  validTypeValues,
};