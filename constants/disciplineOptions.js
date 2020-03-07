const Joi = require("@hapi/joi");

const disciplineOptions = Joi.string().valid(
  "Design",
  "Engineering",
  "Product",
  "Other",
);

module.exports = disciplineOptions;