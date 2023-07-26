const { flow, get, values, flatMap, uniqBy, pick } = require('lodash/fp');

const getResultValuesForThisEntity = (hexValue) => (queryResults) =>
  flow(
    pick([`FullTextSearch_${hexValue}`, `FieldSearch_${hexValue}`]),
    values,
    flatMap(get('data')),
    uniqBy('id')
  )(queryResults);

module.exports = getResultValuesForThisEntity;
