const { map, replace } = require('lodash/fp');
const { splitCommaSeparatedUserOption } = require('./utils');

const parseUserOptions = (options) => ({
  ...options,
  parsedSearchAssetTypes: splitCommaSeparatedUserOption(
    'searchAssetTypes',
    options
  )
});

module.exports = parseUserOptions;
