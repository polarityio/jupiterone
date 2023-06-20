const {
  flow,
  map,
  get,
  merge,
  reduce,
  values,
  flatMap,
  uniqBy,
  pick,
  groupBy,
  isEmpty,
  compact
} = require('lodash/fp');

const buildQueryResults = (entitiesWithHexValues, queryResponse) =>
  flow(
    reduce(merge, {}),
    (queryResultObj) =>
      map(
        ({ hexValue, ...entity }) =>
          flow(
            getResultValuesForThisEntity(hexValue),
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
  )(queryResponse);

const getResultValuesForThisEntity = (hexValue) =>
  flow(
    pick([`FullTextSearch_${hexValue}`, `FieldSearch_${hexValue}`]),
    values,
    flatMap(get('data')),
    uniqBy('id')
  );

const groupByAssetClasses = flow(
  flatMap((queryResult) =>
    flow(
      get('entity._class'),
      map((_class) => ({ _class, ...queryResult }))
    )(queryResult)
  ),
  groupBy('_class')
);

module.exports = buildQueryResults;
