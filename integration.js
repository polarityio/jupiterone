'use strict';
const { validateOptions, parseUserOptions } = require('./server/userOptions');
const { setLogger, getLogger } = require('./server/logging');

const {
  buildIgnoreResults,
  organizeEntities,
  parseErrorToReadableJson
} = require('./server/dataTransformations');

const searchEntities = require('./server/searchEntities');
const assembleLookupResults = require('./server/assembleLookupResults');

//TODO: Summary tags, search using, email and hostname.

// entities im currently testing with: 72.83.25.13
// 108.45.130.98
// 3.137.169.143
// CVE-2023-28266
// a username in the polarity org )

// JupiterOne Docs: https://community.askj1.com/kb/docs

const doLookup = async (entities, userOptions, cb) => {
  const Logger = getLogger();
  try {
    Logger.debug({ entities }, 'Entities');

    const { searchableEntities, nonSearchableEntities } = organizeEntities(entities);

    const options = parseUserOptions(userOptions);

    const {  } = await searchEntities(
      searchableEntities,
      options
    );

    Logger.trace({  });

    const lookupResults = assembleLookupResults(
      entities,
      options
    );

    const ignoreResults = buildIgnoreResults(nonSearchableEntities);

    Logger.trace({ lookupResults, ignoreResults }, 'Lookup Results');
    cb(null, lookupResults.concat(ignoreResults));
  } catch (error) {
    const err = parseErrorToReadableJson(error);

    Logger.error({ error, formattedError: err }, 'Get Lookup Results Failed');
    cb({ detail: error.message || 'Lookup Failed', err });
  }
};

module.exports = {
  startup: setLogger,
  validateOptions,
  doLookup
};
