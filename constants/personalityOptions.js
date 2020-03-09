const Joi = require("@hapi/joi");

const personalityOptionList = [
  "Introvert",
  "Extrovert",
];

const validPersonalityValues = Joi.string().valid(
  "Introvert",
  "Extrovert",
);

module.exports = {
  personalityOptionList,
  validPersonalityValues,
};