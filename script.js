const { getFakePersonList } = require("./controllers/person");
const {
  calculatePairScores,
  setPairs,
  personStats,
} = require("./utils");

getFakePersonList()
  .then(result => {
    const list = calculatePairScores(result.mentors, result.mentees);
    // const scores = setPairs(list.mentors, list.mentees);
    console.log(list.mentors);
    // console.log(scores.mentors);
    // for (let [, mentor] of Object.entries(scores.mentors)) {
    //   console.table(mentor.pair);
    // }
  }).catch(error => console.log(error));