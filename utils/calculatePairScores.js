const calculatePairScore = (person1, person2) => {
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

const calculatePairScores = (personList) => {
  for (let [personId, person] of Object.entries(personList)) {
    for (let [pairId, pair] of Object.entries(personList)) {
      if (personId !== pairId) {
        let hasScoreBeenCalculated = false;
        if (pair.potentialPairScores !== null) {
          for (let k = 0; k < pair.potentialPairScores; k++) {
            if (personId === pair.potentialPairScores[k].id) {
              hasScoreBeenCalculated = true;
            }
          }
        }
        if (!hasScoreBeenCalculated) {
          person.potentialPairScores = new Array();
          person.potentialPairScores.push({
            id: pairId,
            score: calculatePairScore(person, pair),
          });
        }
      }
    }
  }
  return personList;
};

module.exports = calculatePairScores;