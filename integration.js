'use strict';

const { JupiterOneClient } = require('@jupiterone/jupiterone-client-nodejs');
const { parseErrorToReadableJSON } = require('./src/errors');
const { getLogger, setLogger } = require('./src/logger');
const PolarityResult = require('./src/create-result-object');
const { queryEntities } = require('./src/query-api');

let Logger = null;

//TODO: Summary tags, search using, email and hostname.

// entities im currently testing with: 72.83.25.13
// 108.45.130.98
// 3.137.169.143
// CVE-2023-28266
// a username in the polarity org )

// JupiterOne Docs: https://community.askj1.com/kb/docs

const startup = (logger) => {
  Logger = logger;
  setLogger(Logger);
};

async function doLookup(entities, options, cb) {
  const Logger = getLogger();

  const j1Client = new JupiterOneClient({
    account: options.accountId,
    accessToken: options.accessToken
  });

  try {
    const initializedClient = await j1Client.init();

    const assets = await queryEntities(initializedClient, entities, 'Host');
    const users = await queryEntities(initializedClient, entities, 'User');
    const vulnerabilities = await queryEntities(initializedClient, entities, 'Finding');

    const apiData = {
      assets,
      users,
      vulnerabilities
    };

    const lookupResults = PolarityResult.createResultsObject(apiData);
    Logger.trace({ lookupResults }, 'lookupResults');
    cb(null, lookupResults);
  } catch (error) {
    const errorAsPojo = parseErrorToReadableJSON(error);
    Logger.error({ error: errorAsPojo }, 'Error in doLookup');
    cb(errorAsPojo);
  }
}

module.exports = {
  startup,
  doLookup
};
