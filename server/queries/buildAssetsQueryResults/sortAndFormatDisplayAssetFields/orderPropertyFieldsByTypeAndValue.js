const { orderBy, isBoolean, isNumber } = require('lodash/fp');

const { formatIsoDate } = require('./dateFormatters');

const orderPropertyFieldsByTypeAndValue = (propertiesEntries) =>
  orderBy(
    ([fieldKey, fieldValue]) =>
      (
        getFieldOrderByFieldKey(fieldKey) || getFieldOrderByFieldValueType(fieldValue)
      ).concat(fieldValue),
    [('asc', 'asc', 'asc')],
    propertiesEntries
  );

const getFieldOrderByFieldKey = (fieldKey) => {
  const fieldIndex = EXPLICIT_FIELD_ORDER.indexOf(fieldKey);
  return fieldIndex !== -1 && [1, fieldIndex];
};

const EXPLICIT_FIELD_ORDER = [
  'description',
  'severity',
  'exprtRating',
  'status',
  'state',
  'userName',
  'email',
  'lastlogin',
  'type'
];

const getFieldOrderByFieldValueType = (fieldValue) =>
  isBoolean(fieldValue)
    ? [2, 1]
    : formatIsoDate(fieldValue) !== 'Invalid DateTime'
    ? [2, 2]
    : isNumber(fieldValue)
    ? [2, 3]
    : [9, 9];

module.exports = orderPropertyFieldsByTypeAndValue;
