const Joi = require("@hapi/joi");

const experienceOptionList = [
  "Student",
  "Junior",
  "Mid-level",
  "Senior",
];

const validExperienceValues = Joi.string().valid(
  "Student",
  "Junior",
  "Mid-level",
  "Senior",
);

module.exports = {
  experienceOptionList,
  validExperienceValues,
};