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
  const scoreLog = new Array(7);
  let distributionMessage = "";
  for (var i = 0; i < mentors.length; i++) {
    const matchScore = mentors[i].match.score;
    const totalAtIndex = scoreLog[matchScore - 1];
    scoreLog.splice(matchScore - 1, 1, totalAtIndex > 0 ? totalAtIndex + 1 : 1);
  }
  for (var i = 0; i < scoreLog.length; i++) {
    const percentage = scoreLog[i] !== undefined
      ? `(${Math.floor(scoreLog[i]/mentors.length * 100)}%)`
      : "";
    const scoreValue = scoreLog[i] !== undefined
      ? scoreLog[i]
      : 0;
    const score = `     Score ${i + 1}: ${scoreValue} ${percentage}`;
    distributionMessage += score;
    if (i !== scoreLog.length - 1) {
      distributionMessage += "\n";
    }
  }
  return distributionMessage;
};

const logGuestListStats = (mentors, mentees) => {
  console.log("====================");
  console.log("GUEST LIST OVERVIEW:");
  console.log(`=> Total mentors: ${mentors.length}`);
  console.log(`=> Total mentees: ${mentees.length}`);
  console.log(`=> Total 7/7 pairs: ${getMatchScoreCount(mentors, 7, false)}`);
  console.log(`=> Total N/7 pairs: ${getMatchScoreCount(mentors, 6, true)}`);
  console.log(`=> Match score distribution:`);
  console.log(getMatchScoreDistribution(mentors));
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