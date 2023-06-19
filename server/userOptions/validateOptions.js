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
    accessToken: '* Required',
    searchAssetTypes: '* Required'
  };

  const stringValidationErrors = validateStringOptions(
    stringOptionsErrorMessages,
    options
  );

  const parsedOptions = flow(flattenOptions, parseUserOptions)(options);

  const invalidSearchAssetTypeErrors = getInvalidSearchAssetTypeErrors(parsedOptions);

  const authenticationError = !(
    size(stringValidationErrors) || size(invalidSearchAssetTypeErrors)
  )
    ? await validateAuthentication(parsedOptions)
    : [];

  let errors = stringValidationErrors
    .concat(authenticationError)
    .concat(invalidSearchAssetTypeErrors);

  callback(null, errors);
};

const getInvalidSearchAssetTypeErrors = flow(
  get('parsedSearchAssetTypes'),
  map((searchAssetType) =>
    !POSSIBLE_SEARCH_ASSET_TYPES.includes(searchAssetType) ? `"${searchAssetType}"` : ''
  ),
  compact,
  join(', '),
  (searchAssetTypeErrorMessage) =>
    searchAssetTypeErrorMessage
      ? [
          {
            key: 'searchAssetTypes',
            message:
              `${searchAssetTypeErrorMessage} are invalid Types.\n` +
              'Go to the Assets Inventory page to find a list of valid ones.'
          }
        ]
      : []
);

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
