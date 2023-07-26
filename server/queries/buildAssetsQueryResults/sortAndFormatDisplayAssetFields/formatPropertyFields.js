const { map } = require('lodash/fp');
const { formatIsoDate, formatMillisDate } = require('./dateFormatters');

const formatPropertyFields = (orderedPropertyEntries) =>
  map(([fieldKey, fieldValue]) => {
    const dateFieldValue = formatIsoDate(fieldValue);

    return fieldValue === ''
      ? false
      : [
          PROPERTY_FIELD_KEY_CONVERSIONS[fieldKey] || fieldKey,
          dateFieldValue !== 'Invalid DateTime'
            ? dateFieldValue
            : fieldKey === 'lastlogin'
            ? formatMillisDate(fieldValue)
            : fieldValue
        ];
  }, orderedPropertyEntries);

const PROPERTY_FIELD_KEY_CONVERSIONS = {
  'tag.AccountName': 'tagAccountName',
  lastlogin: 'lastLogin'
};

module.exports = formatPropertyFields;
