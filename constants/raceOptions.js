const Joi = require("@hapi/joi");

const raceOptionList = [
  "American Indian",
  "Asian",
  "Black",
  "Hispanic",
  "Pacific Islander",
  "White",
];

const validRaceValues = Joi.string().valid(
  "American Indian",
  "Asian",
  "Black",
  "Hispanic",
  "Pacific Islander",
  "White",
);

module.exports = {
  raceOptionList,
  validRaceValues,
};