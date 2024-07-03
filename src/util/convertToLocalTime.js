const moment = require("moment");

export const convertToLocalTime = (unixTime) => {
  return moment.unix(unixTime).format("h:mm A");
};
