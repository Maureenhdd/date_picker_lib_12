export const getYears = () => {
  let arrayDate = [];

  for (let i = 2022; i >= 1822; i--) {
    arrayDate.push(i);
  }
  for (let i = 2023; i <= 2222; i++) {
    arrayDate.push(i);
  }

  arrayDate.sort();

  return arrayDate;
};

export const getMonths = () => {
  const months = [
    "Janvier",
    "Fevrier",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Aout",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  return months;
};
