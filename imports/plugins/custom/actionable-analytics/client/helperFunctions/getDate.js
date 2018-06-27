export const getDate = (fromDate, todate) => {
  const oneDayInMilliseconds = 86400000;
  const dateDifference = new Date(todate).setHours(23) - new Date(fromDate).setHours(0);
  const dayDifference = Math.round(dateDifference / oneDayInMilliseconds);
  return dayDifference;
};

export default getDate;

