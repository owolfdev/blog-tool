export const formatDate = (date) => {
  const dateObj = new Date(date);
  const options = { timeZone: "Asia/Bangkok" };
  const formattedDate = dateObj.toLocaleDateString("en-US", options);
  const formattedTime = dateObj.toLocaleTimeString("en-US", options);
  //const formattedDateTime = `${formattedDate} ${formattedTime}`;
  return formattedDate;
};
