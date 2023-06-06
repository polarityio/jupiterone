const { getLogger } = require('./logger');

async function queryAssets(j1Client, entities) {
  const Logger = getLogger();

  let values = entities.map((entity) => `"${entity.value}"`);
  let query = `find Host with displayName = ${values.join(' or displayName = ')}`;

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

async function queryUserByName(j1Client, entities) {
  const Logger = getLogger();

  Logger.trace({ entities }, 'entities');

  let values = entities.map((entity) => `"${entity.value}"`);
  let query = `find User with displayName = ${values.join(' or displayName = ')}`;

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

async function queryVulnerabilities(j1Client, entities) {
  const Logger = getLogger();

  Logger.trace({ entities }, 'entities');

  let values = entities.map((entity) => `"${entity.value}"`);
  // let query = `find Vulnerability with displayName = ${values.join(
  //   ' or displayName = '
  // )}`;

  // Logger.trace({ query }, 'query');
  const response = await j1Client.queryV1('FIND (Vulnerability|Findings)');
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

module.exports = { queryAssets, queryUserByName, queryVulnerabilities };
