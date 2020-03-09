const Joi = require("@hapi/joi");

const incomeOptionList = [
  "Unemployed",
  "$0 - $50k",
  "$50k - $100k",
  "$100k - $150k",
  "$150k+",
];

const validIncomeValues = Joi.string().valid(
  "Unemployed",
  "$0 - $50k",
  "$50k - $100k",
  "$100k - $150k",
  "$150k+",
);

module.exports = {
  incomeOptionList,
  validIncomeValues,
};