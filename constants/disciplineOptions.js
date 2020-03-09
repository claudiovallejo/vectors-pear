const Joi = require("@hapi/joi");

const disciplineOptionList = [
  "Design",
  "Engineering",
  "Product",
  "Other",
];

const validDisciplineValues = Joi.string().valid(
  "Design",
  "Engineering",
  "Product",
  "Other",
);

module.exports = {
  disciplineOptionList,
  validDisciplineValues,
};