const faker = require("faker");

const database = require("../database");
const person = require("../models/person");
const fakeMentorList = database.ref("fakeMentorList");
const fakeMenteeList = database.ref("fakeMenteeList");

const { ageOptionList } = require("../constants/ageOptions");
const { disciplineOptionList } = require("../constants/disciplineOptions");
const { raceOptionList } = require("../constants/raceOptions");
const { genderOptionList } = require("../constants/genderOptions");
const { experienceOptionList } = require("../constants/experienceOptions");
const { incomeOptionList } = require("../constants/incomeOptions");
const { personalityOptionList } = require("../constants/personalityOptions");
const { typeOptionList } = require("../constants/typeOptions");

const { pickRandomOption } = require("../utils");

const createFakePersonList = async (totalMentors, totalMentees) => {
  try {
    await fakeMentorList.remove();
    await fakeMenteeList.remove();
  } catch(error) {
    console.log("👎 ERROR: UNABLE TO DELETE DATABASE");
    console.log(error);
    return error;
  }

  if (totalMentors > totalMentees) {
    console.log(" ERROR: TOTAL MENTEES MUST BE GREATER THAN TOTAL MENTORS");
    return;
  }

  for (var i = 0; i < totalMentors; i++) {
    const mentor = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      type: typeOptionList[0],
      age: pickRandomOption(ageOptionList),
      discipline: pickRandomOption(disciplineOptionList),
      race: pickRandomOption(raceOptionList),
      gender: pickRandomOption(genderOptionList),
      experience: pickRandomOption(experienceOptionList),
      income: pickRandomOption(incomeOptionList),
      personality: pickRandomOption(personalityOptionList),
    }

    try {
      await person.validateAsync(mentor);
      await fakeMentorList.push(mentor);
    } catch(error) {
      console.log("👎 ERROR: UNABLE TO CREATE MENTOR");
      console.log(error);
      return error;
    }
  }

  for (var i = 0; i < totalMentees; i++) {
    const mentee = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      type: typeOptionList[1],
      age: pickRandomOption(ageOptionList),
      discipline: pickRandomOption(disciplineOptionList),
      race: pickRandomOption(raceOptionList),
      gender: pickRandomOption(genderOptionList),
      experience: pickRandomOption(experienceOptionList),
      income: pickRandomOption(incomeOptionList),
      personality: pickRandomOption(personalityOptionList),
    }

    try {
      await person.validateAsync(mentee);
      await fakeMenteeList.push(mentee);
    } catch(error) {
      console.log("👎 ERROR: UNABLE TO CREATE MENTEE");
      console.log(error);
      return error;
    }
  }

  console.log(`👍 SUCCESS: A FAKE LIST OF ${totalMentors + totalMentees} PEOPLE WAS CREATED`);
};

const getFakePersonList = async () => {
  try {
    const mentors = await fakeMentorList.once("value");
    const mentees = await fakeMenteeList.once("value");
    return {
      mentors: mentors.val(),
      mentees: mentees.val(), 
    };
  } catch(error) {
    console.log("👎 ERROR: UNABLE TO GET MENTOR/MENTEE LISTS");
    console.log(error);
    return error;
  }
};

module.exports = {
  createFakePersonList,
  getFakePersonList,
};