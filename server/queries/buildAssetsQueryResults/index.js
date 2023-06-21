const { flow, map, isEmpty, compact, merge, reduce } = require('lodash/fp');

const getResultValuesForThisEntity = require('./getResultValuesForThisEntity');
const sortAndFormatDisplayAssetFields = require('./sortAndFormatDisplayAssetFields');
const groupByAssetClasses = require('./groupByAssetClasses');

const buildAssetsQueryResults = (entitiesWithHexValues, assetsQueryResponse) =>
  flow(
    mergeAllQueryResults,
    (queryResultObj) =>
      map(
        ({ hexValue, ...entity }) =>
          flow(
            getResultValuesForThisEntity(hexValue),
            sortAndFormatDisplayAssetFields,
            groupByAssetClasses,
            (queryResultForThisEntity) =>
              !isEmpty(queryResultForThisEntity) && {
                entity,
                result: queryResultForThisEntity
              }
          )(queryResultObj),
        entitiesWithHexValues
      ),
    compact
  )(assetsQueryResponse);

const mergeAllQueryResults = (assetsQueryResponse) =>
  reduce(merge, {}, assetsQueryResponse);

module.exports = buildAssetsQueryResults;
