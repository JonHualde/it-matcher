export const getDate = (ISODateFormat: string | Date) => {
  let date = new Date(ISODateFormat);
  let year = date.getFullYear();
  let month: any = date.getMonth() + 1;
  let day: any = date.getDate();

  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }

  return day + "-" + month + "-" + year;
};
