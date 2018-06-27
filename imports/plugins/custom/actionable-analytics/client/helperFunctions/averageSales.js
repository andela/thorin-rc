import { getDate } from "./getDate";

export const averageSales = (totalSales, fromDate, toDate) => {
  const difference = getDate(fromDate, toDate);
  const salesPerDay = difference === 0 ? totalSales : totalSales / difference;
  return salesPerDay;
};

export default averageSales;
