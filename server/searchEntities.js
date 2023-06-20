const { map } = require('lodash/fp');
const { encodeHex } = require('./dataTransformations');
const { getLogger } = require('./logging');
const { requestsInParallel } = require('./request');
const { buildQueryRequests, buildQueryResults } = require('./queries');

const searchEntities = async (entities, options) => {
  const entitiesWithHexValues = map(
    (entity) => ({ ...entity, hexValue: encodeHex(entity.value) }),
    entities
  );

  const queryRequests = buildQueryRequests(entitiesWithHexValues, options);

  const queryResponse = await requestsInParallel(queryRequests);

  const queryResults = buildQueryResults(entitiesWithHexValues, queryResponse);

  getLogger().trace({ test: 111111111, queryResults }, 'queryResults');
  return { queryResults };
};

module.exports = searchEntities;
