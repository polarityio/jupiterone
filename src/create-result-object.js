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
    return [
      ...this.resultObject(apiResponse.assets || []),
      ...this.resultObject(apiResponse.users || []),
      ...this.resultObject(apiResponse.vulnerabilities || [])
    ];
  }

  resultObject(response) {
    return response.map((result) => ({
      entity: result.entity,
      data: {
        summary: createSummary(result.response),
        details: result.response
      }
    }));
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
