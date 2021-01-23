export const convertShortDateToISO = (shortDate) => {
  const reversed = shortDate.split("/").reverse();
  reversed.splice(1, 0, "-");
  const formatted = reversed.join("");
  return formatted;
};

export const convertDateToYear = (shortDate) => {
  const year = shortDate.split("/")[1];
  return year;
}