const pickRandomOption = (array) => {
  const randomIndex = Math.floor(
    Math.random() * Math.floor(array.length)
  );

  return array[randomIndex];
};

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

const calculatePairScores = (mentors, mentees) => {
  for (let [mentorId, mentor] of Object.entries(mentors)) {
    if (mentor.potentialPairScores === undefined) {
      mentor.potentialPairScores = new Array();
    }
    for (let [menteeId, mentee] of Object.entries(mentees)) {
      if (mentorId !== menteeId) {
        mentor.potentialPairScores.push({
          id: menteeId,
          score: calculatePairScore(mentor, mentee),
        });
      }
    }
  }
  return { mentors, mentees };
};

const setPair = (personList, personId, personPair) => {
  for (let [id, person] of Object.entries(personList)) {
    if (id === personId) {
      person.pair = personPair;
      return person;
    }
  }
}

const setPairs = (mentors, mentees) => {
  console.log(mentors);
  // for (let [, mentor] of Object.entries(mentors)) {
  //   if (mentor.pair === undefined) {
  //     console.log(mentor);
  //     let bestPair = { id: "", score: 0 };
  //     for (let i = 0; i < mentor.potentialPairScores.length; i++) {
  //       const potentialPair = potentialPairScores[i];
  //       if (potentialPair.score > bestPair.score) {
  //         bestPair.id = potentialPair.id;
  //         bestPair.score = potentialPair.score;
  //       }
  //     }
  //     if (bestPair.id !== "" && bestPair.score !== 0) {
  //       mentor.pair = bestPair;
  //       setPair(menteeList, bestPair.id, bestPair);
  //     }
  //   }
  // }
};

module.exports = {
  pickRandomOption,
  calculatePairScore,
  calculatePairScores,
  setPairs,
};