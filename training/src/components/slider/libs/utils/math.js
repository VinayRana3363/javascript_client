const getRandomNumber = (maxNumber) => (Math.floor(Math.random() * maxNumber));

const getNextRoundRobin = (totalImage, currentImage) => {
  if (totalImage > 1) {
    if ((currentImage + 1) === totalImage) return 0;
    return currentImage + 1;
  }
  return 0;
};

export { getRandomNumber, getNextRoundRobin };
