const isEmptyString = (str: string): boolean => {
  return str.trim() === '';
};

const isLongerThan = (str: string, num: number): boolean => {
  return str.length > num;
};

const isAllTrue = (obj: object): boolean => {
  return Object.values(obj).every((value) => value === true);
};

const isTimeLimit = (timeLimit: number) => {
  const currentDate = new Date();
  const currentTime = Math.floor(currentDate.getTime() / 1000);
  const differenceTime = Math.floor((timeLimit - currentTime) / 60);

  return differenceTime < 2;
};

export { isEmptyString, isLongerThan, isAllTrue, isTimeLimit };
