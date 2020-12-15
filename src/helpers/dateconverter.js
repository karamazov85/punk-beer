export const convertShortDateToISO = (shortDate) => {
  const reversed = shortDate.split("/").reverse();
  reversed.splice(1, 0, "-");
  const formatted = reversed.join("");
  return formatted;
};
