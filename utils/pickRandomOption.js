const pickRandomOption = (array) => {
  const randomIndex = Math.floor(
    Math.random() * Math.floor(array.length)
  );

  return array[randomIndex];
};

module.exports = pickRandomOption;