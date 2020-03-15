// const { createFakePersonList } = require("./controllers/person");
// createFakePersonList(5,9);

const { getFakePersonList } = require("./controllers/person");
const {
  convertObjectToArray,
  calculatePotentialMatchScores,
  matchMentorsAndMentees,
} = require("./utils");

getFakePersonList()
  .then(result => {
    const listWithPotentialMatches = calculatePotentialMatchScores(
      convertObjectToArray(result.mentors),
      convertObjectToArray(result.mentees),
    );
    const listWithMatches = matchMentorsAndMentees(
      listWithPotentialMatches.mentors,
      listWithPotentialMatches.mentees,
    );
    listWithMatches.mentors.forEach(mentor => {
      console.table(mentor.match);
    });
  }).catch(error => console.log(error));