const { DateTime } = require('luxon');

const DATE_FORMAT = {
  year: 'numeric',
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  timeZoneName: 'short'
};

const formatIsoDate = (isoDateString) =>
  DateTime.fromISO(isoDateString).toLocaleString(DATE_FORMAT);

const formatMillisDate = (milliDate) =>
  DateTime.fromMillis(milliDate).toLocaleString(DATE_FORMAT);

module.exports = {
  formatIsoDate,
  formatMillisDate
};
