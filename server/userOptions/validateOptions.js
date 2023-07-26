const { size, flow, map, get, join, compact } = require('lodash/fp');
const { parseErrorToReadableJson } = require('../dataTransformations');
const { getLogger } = require('../logging');
const { requestWithDefaults } = require('../request');
const parseUserOptions = require('./parseUserOptions');
const { validateStringOptions, flattenOptions } = require('./utils');
const { POSSIBLE_SEARCH_ASSET_TYPES } = require('../constants');

const validateOptions = async (options, callback) => {
  const stringOptionsErrorMessages = {
    instanceId: '* Required',
    accountId: '* Required',
    accessToken: '* Required'
  };

  const stringValidationErrors = validateStringOptions(
    stringOptionsErrorMessages,
    options
  );

  const searchAssetTypesEmptyError = !size(options.searchAssetTypes.value)
    ? [{ key: 'searchAssetTypes', message: '* Required' }]
    : [];

  const parsedOptions = flow(flattenOptions, parseUserOptions)(options);

  const authenticationError = !(
    size(stringValidationErrors) || size(searchAssetTypesEmptyError)
  )
    ? await validateAuthentication(parsedOptions)
    : [];

  let errors = stringValidationErrors
    .concat(searchAssetTypesEmptyError)
    .concat(authenticationError);

  callback(null, errors);
};

const buildTestQuery = (assetTypes) => `{
  queryV1(query: "FIND (${join(' | ', assetTypes)}) WITH createdOn > date.now - 1 hour") {
    data
  }
}`;
const validateAuthentication = async (options) => {
  try {
    await requestWithDefaults({
      query: buildTestQuery(options.parsedSearchAssetTypes),
      options
    });
    return [];
  } catch (error) {
    getLogger().error(
      { error, formattedError: parseErrorToReadableJson(error) },
      'Authentication Failed'
    );
    const message = `Authentication Failed: ${error.description}`;
    return [
      { key: 'instanceId', message },
      { key: 'accountId', message },
      { key: 'accessToken', message }
    ];
  }
};

module.exports = validateOptions;
