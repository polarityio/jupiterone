const { map } = require('lodash/fp');
const { encodeHex } = require('./dataTransformations');
const { getLogger } = require('./logging');
const { requestsInParallel } = require('./request');
const { buildAssetsQueryRequests, buildAssetsQueryResults } = require('./queries');

const searchEntities = async (entities, options) => {
  const entitiesWithHexValues = map(
    (entity) => ({ ...entity, hexValue: encodeHex(entity.value) }),
    entities
  );

  const assetsQueryRequests = buildAssetsQueryRequests(entitiesWithHexValues, options);

  const assetsQueryResponse = await requestsInParallel(assetsQueryRequests);

  const assetsQueryResults = buildAssetsQueryResults(entitiesWithHexValues, assetsQueryResponse);

  return { assetsQueryResults };
};

module.exports = searchEntities;
