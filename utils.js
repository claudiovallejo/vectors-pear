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

const isPotentialMatchMatched = (mentors, menteeId) => {
  mentors.forEach(mentor => {
    if (mentor.match && mentor.match.id === menteeId) {
      return true;
    }
  });
  return false;
};

const setBestMentorMatch = (mentors, mentor) => {
  mentor.potentialMatchScores.forEach(potentialMatch => {
    if (!isPotentialMatchMatched(mentors,potentialMatch.id)) {
      mentor.match = potentialMatch;
    }
  });
};

const matchMentorsAndMentees = (mentors, mentees) => {
  mentors.forEach(mentor => setBestMentorMatch(mentors, mentor));
  // mentees.forEach(mentee => setMenteePair(mentors, mentee));
  return { mentors, mentees };
};

module.exports = {
  convertObjectToArray,
  pickRandomOption,
  calculateMatchScore,
  calculatePotentialMatchScores,
  matchMentorsAndMentees,
};