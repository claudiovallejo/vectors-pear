const Joi = require("@hapi/joi");
const { validAgeValues } = require("../constants/ageOptions");
const { validDisciplineValues } = require("../constants/disciplineOptions");
const { validRaceValues } = require("../constants/raceOptions");
const { validGenderValues } = require("../constants/genderOptions");
const { validExperienceValues } = require("../constants/experienceOptions");
const { validIncomeValues } = require("../constants/incomeOptions");
const { validPersonalityValues } = require("../constants/personalityOptions");

const person = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  pair: Joi.object({
    id: Joi.string().required(),
    score: Joi.number().required(),
  }).allow(null),
  age: validAgeValues,
  discipline: validDisciplineValues,
  race: validRaceValues,
  gender: validGenderValues,
  experience: validExperienceValues,
  income: validIncomeValues,
  personality: validPersonalityValues,
});

module.exports = person;