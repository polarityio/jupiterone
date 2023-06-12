const { getLogger } = require('./logger');

async function queryEntities(j1Client, entities, entityType) {
  const Logger = getLogger();

  let values = entities.map((entity) => `"${entity.value}"`);
  let query = `find ${entityType} with displayName = ${values.join(
    ' or displayName = '
  )}`;

  const response = await j1Client.queryV1(query);
  Logger.trace({ response }, 'response');

  let result = entities
    .map((entity) => {
      let associatedResponse = response.find(
        (resEntity) => resEntity.entity.displayName === entity.value
      );

      return associatedResponse
        ? {
            entity: entity,
            response: associatedResponse
          }
        : null;
    })
    .filter((item) => item !== null);

  return result;
}

module.exports = { queryEntities };
