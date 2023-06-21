const { flow, map, get, flatMap, groupBy } = require('lodash/fp');

const groupByAssetClasses = (queryResults) =>
  flow(
    flatMap((queryResult) =>
      flow(
        get('entity._class'),
        map((_class) => ({ _class, ...queryResult }))
      )(queryResult)
    ),
    groupBy('_class')
  )(queryResults);

module.exports = groupByAssetClasses;
