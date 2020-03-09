// DELETE EXISTING FAKE PERSON LIST & CREATE NEW FAKE PERSON LIST
// const createFakePersonList = require("./utils/createFakePersonList");
// createFakePersonList(4);

// PULL EXISTING FAKE PERSON LIST
// CONVERT LIST INTO AN ARRAY
// CALCULATE PAIR_SCORES FOR EACH PERSON & UPDATE RECORD IN DATABASE
const database = require("./database");
const calculatePairScores = require("./utils/calculatePairScores");
const collection = database.ref("fakePersonList");

const getFakePersonList = async () => {
  try {
    const fakePersonList = await collection.once("value");
    const listWithScores = calculatePairScores(fakePersonList.val());
    for (let [id, person] of Object.entries(listWithScores)) {
      console.log(person.potentialPairScores);
    }
  } catch(error) {
    console.log("ERROR GETTING FAKE LIST");
    console.log(error);
  }
};

getFakePersonList();