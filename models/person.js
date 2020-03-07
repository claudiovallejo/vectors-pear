const Joi = require("@hapi/joi");
const ages = require("../constants/ageOptions");
const disciplines = require("../constants/disciplineOptions");
const races = require("../constants/raceOptions");

const person = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  age: ages,
  disciplines: disciplines,
  race: races,
});

module.exports = person