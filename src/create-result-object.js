const { getLogger } = require('./logger');
/**
 * Return a Result Object or a Result Miss Object based on the REST API response.
 * @param null || {entity, result}
 * if I pass nothing in, I want it to return a result object with no data
 * if i pass in a single object, I want it to return a result object with data
 * either pass in a single object or an array of objects, being
 * @returns {{data: null, entity}|{data: {summary: [string], details}, entity}}
 */
class PolarityResult {
  createEmptyBlock(entity) {
    return {
      entity: entity,
      data: {
        summary: ['Select a Category'],
        details: []
      }
    };
  }

  createResultsObject(apiResponse) {
    const Logger = getLogger();

    Logger.trace({ apiResponse }, 'apiResponse');

    return [
      ...(apiResponse.assets || []).map((asset) => ({
        entity: asset.entity,
        data: {
          summary: [],
          details: asset.response
        }
      })),
      ...(apiResponse.users || []).map((user) => ({
        entity: user.entity,
        data: {
          summary: [],
          details: user.response
        }
      }))
    ];
  }

  createNoResultsObject(apiResponse) {
    return [
      {
        entity: apiResponse.entity,
        data: null
      }
    ];
  }
}

function createSummary(apiResponse) {
  const tags = [];
}

module.exports = new PolarityResult();
