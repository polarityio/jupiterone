const { flow, map, entries, compact, fromPairs } = require('lodash/fp');

const orderPropertyFieldsByTypeAndValue = require('./orderPropertyFieldsByTypeAndValue');
const formatPropertyFields = require('./formatPropertyFields');

const sortAndFormatDisplayAssetFields = (assetResults) =>
  map(
    (assetResult) => ({
      ...assetResult,
      properties: flow(
        entries,
        orderPropertyFieldsByTypeAndValue,
        formatPropertyFields,
        compact,
        fromPairs
      )(assetResult.properties)
    }),
    assetResults
  );

module.exports = sortAndFormatDisplayAssetFields;
