const database = require("../database");
const person = require("../models/person");
const faker = require("faker");

const { ageOptionList } = require("../constants/ageOptions");
const { disciplineOptionList } = require("../constants/disciplineOptions");
const { raceOptionList } = require("../constants/raceOptions");
const { genderOptionList } = require("../constants/genderOptions");
const { experienceOptionList } = require("../constants/experienceOptions");
const { incomeOptionList } = require("../constants/incomeOptions");
const { personalityOptionList } = require("../constants/personalityOptions");

const pickRandomOption = require("./pickRandomOption");

const collection = database.ref("fakePersonList");

const createFakePersonList = async (size) => {
  try {
    await collection.remove();
  } catch(error) {
    console.log("ERROR: UNABLE TO DELETE DATABASE");
    console.log(error);
    return error;
  }

  for (var i = 0; i < size; i++) {
    const guest = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      age: pickRandomOption(ageOptionList),
      discipline: pickRandomOption(disciplineOptionList),
      race: pickRandomOption(raceOptionList),
      gender: pickRandomOption(genderOptionList),
      experience: pickRandomOption(experienceOptionList),
      income: pickRandomOption(incomeOptionList),
      personality: pickRandomOption(personalityOptionList),
    }

    try {
      await person.validateAsync(guest);
      await collection.push(guest);
    } catch(error) {
      console.log("ERROR: UNABLE TO CREATE PERSON");
      console.log(error);
      return error;
    }
  }
  console.log("PERSON LIST CREATED!");
};

module.exports = createFakePersonList;