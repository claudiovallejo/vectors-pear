const { ageOptionList } = require("./constants/ageOptions");
const { disciplineOptionList } = require("./constants/disciplineOptions");
const { raceOptionList } = require("./constants/raceOptions");
const { genderOptionList } = require("./constants/genderOptions");
const { experienceOptionList } = require("./constants/experienceOptions");
const { incomeOptionList } = require("./constants/incomeOptions");
const { personalityOptionList } = require("./constants/personalityOptions");

const convertObjectToArray = (object) => {
  const array = new Array();
  for (let [id, data] of Object.entries(object)) {
    const objectWithId = data;
    data.id = id;
    array.push(objectWithId);
  }
  return array;
}

const pickRandomOption = (array) => {
  const randomIndex = Math.floor(
    Math.random() * Math.floor(array.length)
  );
  return array[randomIndex];
};

const calculateMatchScore = (person1, person2) => {
  let score = 0;
  if (person1.age !== person2.age) score++;
  if (person1.discipline !== person2.discipline) score++;
  if (person1.race !== person2.race) score++;
  if (person1.gender !== person2.gender) score++;
  if (person1.experience !== person2.experience) score++;
  if (person1.income !== person2.income) score++;
  if (person1.personality !== person2.personality) score++;
  return score;
};

const calculatePotentialMatchScores = (mentors, mentees) => {
  mentors.forEach(mentor => {
    if (mentor.potentialMatchScores === undefined) {
      mentor.potentialMatchScores = new Array();
    }
    mentees.forEach(mentee => {
      mentor.potentialMatchScores.push({
        id: mentee.id,
        score: calculateMatchScore(mentor, mentee),
      });
    });
  });
  mentors.forEach(mentor => {
    mentor.potentialMatchScores.sort((a, b) => b.score - a.score);
  })
  return { mentors, mentees };
};

const setMenteeMatch = (mentors, mentee) => {
  const matchedMentor = new Object();
  for (var i = 0; i < mentors.length; i++) {
    if (mentee.id === mentors[i].match.id) {
      matchedMentor.id = mentors[i].id;
      matchedMentor.score = mentors[i].match.score;
    }
  }
  mentee.match = matchedMentor;
};

const isPotentialMatchMatched = (mentors, menteeId) => {
  for (var i = 0; i < mentors.length; i++) {
    if (mentors[i].match && mentors[i].match.id === menteeId) {
      return true;
    }
  }
  return false;
};

const setBestMentorMatch = (mentors, mentor) => {
  for (var i = 0; i < mentor.potentialMatchScores.length; i++) {
    const potentialMatchHasMatch = isPotentialMatchMatched(
      mentors,
      mentor.potentialMatchScores[i].id
    );
    if (!potentialMatchHasMatch) {
      mentor.match = mentor.potentialMatchScores[i];
      return;
    }
  }
};

const matchMentorsAndMentees = (mentors, mentees) => {
  for (var i = 0; i < mentors.length; i++) {
    setBestMentorMatch(mentors, mentors[i]);
  }
  for (var i = 0; i < mentees.length; i++) {
    setMenteeMatch(mentors, mentees[i]);
  }
  return { mentors, mentees };
};

const getMatchScoreCount = (mentors, score, isInclusive) => {
  let count = 0;
  for (var i = 0; i < mentors.length; i++) {
    if (isInclusive) {
      if (mentors[i].match.score <= score) {
        count++;
      }
    } else {
      if (mentors[i].match.score === score) {
        count++;
      }
    }
  }
  return count;
};

const getMatchScoreDistribution = (mentors) => {
  const scoreLog = {
    "7": 0,
    "6": 0,
    "5": 0,
    "4": 0,
    "3": 0,
    "2": 0,
    "1": 0,
  };
  for (var i = 0; i < mentors.length; i++) {
    const matchScore = mentors[i].match.score;
    scoreLog[matchScore]++;
  }
  return scoreLog;
};

const createAttributeLog = (array) => {
  const log = new Object();
  for (var i = 0; i < array.length; i++) {
    log[array[i]] = 0;
  }
  return log;
};

const setTraitList = (trait) => {
  switch (trait) {
    case "age":
      return ageOptionList;    
    case "discipline":
      return disciplineOptionList;
    case "race":
        return raceOptionList;
    case "gender":
      return genderOptionList;
    case "experience":
      return experienceOptionList;
    case "income":
      return incomeOptionList;
    case "personality":
      return personalityOptionList;f
    default:
      console.log("ERROR: Please provide a valid trait name");
  }
};

const getGuestTraitAttributeDistribution = (mentors, mentees, trait) => {
  const guests = mentors.concat(mentees);
  let traitList = setTraitList(trait);
  const log = createAttributeLog(traitList);
  for (var i = 0; i < guests.length; i++) {
    if (guests[i].match.id) {
      log[guests[i][trait]]++;
    }
  }
  return log;
};

const getMatchList = (mentors, mentees) => {
  const matchList = new Array();
  for (var i = 0; i < mentors.length; i++) {
    const match = new Object();
    match.mentor = mentors[i].name;
    const mentee = mentees.find(mentee => mentee.id === mentors[i].match.id);
    match.mentee = mentee.name;
    match.score = mentors[i].match.score;
    matchList.push(match);
  }
  return matchList;
};

const logGuestListStats = (mentors, mentees) => {
  console.log("====================");
  console.log("GUEST LIST OVERVIEW:");
  console.log(`=> Total mentors: ${mentors.length}`);
  console.log(`=> Total mentees: ${mentees.length}`);
  console.log(`=> Total 7/7 pairs: ${getMatchScoreCount(mentors, 7, false)}`);
  console.log(`=> Total N/7 pairs: ${getMatchScoreCount(mentors, 6, true)}`);
  console.log(`=> Match score distribution:`);
  console.table(getMatchScoreDistribution(mentors));
  console.log(`=> Guest attribute distribution:`);
  console.log(`AGE:`)
  console.table(getGuestTraitAttributeDistribution(mentors, mentees, "age"));
  console.log(`DISCIPLINE:`)
  console.table(getGuestTraitAttributeDistribution(mentors, mentees, "discipline"));
  console.log(`GENDER:`)
  console.table(getGuestTraitAttributeDistribution(mentors, mentees, "gender"));
  console.log(`RACE:`)
  console.table(getGuestTraitAttributeDistribution(mentors, mentees, "race"));
  console.log(`EXPERIENCE:`)
  console.table(getGuestTraitAttributeDistribution(mentors, mentees, "experience"));
  console.log(`INCOME:`)
  console.table(getGuestTraitAttributeDistribution(mentors, mentees, "income"));
  console.log(`PERSONALITY:`)
  console.table(getGuestTraitAttributeDistribution(mentors, mentees, "personality"));
  console.log(`=> Match list:`)
  console.table(getMatchList(mentors, mentees));
  console.log("====================");
};

module.exports = {
  convertObjectToArray,
  pickRandomOption,
  calculateMatchScore,
  calculatePotentialMatchScores,
  matchMentorsAndMentees,
  logGuestListStats,
};