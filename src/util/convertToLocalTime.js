const moment = require("moment");

export const convertToLocalTime = (unixTime, timezoneOffset) => {
  const timezoneInMinutes = timezoneOffset / 60;
  return moment.unix(unixTime).utcOffset(timezoneInMinutes).format("h:mm A");
};
