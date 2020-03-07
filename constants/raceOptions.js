const Joi = require("@hapi/joi");

const raceOptions = Joi.string().valid(
  "American Indian",
  "Asian",
  "Black",
  "Hispanic",
  "Pacific Islander",
  "White",
);

module.exports = raceOptions;