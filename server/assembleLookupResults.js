const { flow, get, size, find, eq, map, some, keys, join } = require('lodash/fp');

const assembleLookupResults = (entities, assetsQueryResults, options) =>
  map((entity) => {
    const resultsForThisEntity = getResultsForThisEntity(
      entity,
      assetsQueryResults,
      options
    );

    const resultsFound = some(size, resultsForThisEntity);

    const lookupResult = {
      entity,
      data: resultsFound
        ? {
            summary: createSummaryTags(resultsForThisEntity, options),
            details: resultsForThisEntity
          }
        : null
    };

    return lookupResult;
  }, entities);

const getResultsForThisEntity = (entity, assetsQueryResults) => {
  const assetsResults = getResultForThisEntity(entity, assetsQueryResults);
  return {
    assetsResults,
    assetsDisplayTabs: keys(assetsResults)
  };
};

const getResultForThisEntity = (entity, results) =>
  flow(find(flow(get('entity.value'), eq(entity.value))), get('result'))(results);

const makePlural = (word) =>
  endsWith('s', word)
    ? word
    : endsWith('y', word)
    ? `${slice(0, -1, word)}ies`
    : `${word}s`;

const createSummaryTags = ({ assetsResults, assetsDisplayTabs }, options) => {
  const foundResults = join(', ', assetsDisplayTabs);

  return [].concat(foundResults);
};

module.exports = assembleLookupResults;
