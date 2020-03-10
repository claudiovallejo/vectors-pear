const { getFakePersonList } = require("./controllers/person");
const { calculatePairScores } = require("./utils");

getFakePersonList()
  .then(result => {
    const list = calculatePairScores(result);
    for (let [, person] of Object.entries(list)) {
      console.log("====== PERSON ======");
      console.table(person.potentialPairScores);
      console.log("====================");
    }
  }).catch(error => console.log(error));