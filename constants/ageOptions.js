const Joi = require("@hapi/joi");

const ageOptions = Joi.string().valid(
  "0-18",
  "18-25",
  "25-30",
  "30-35",
  "35-45",
  "45+",
);

module.exports = ageOptions;