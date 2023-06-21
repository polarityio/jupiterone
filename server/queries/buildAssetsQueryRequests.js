const { flow, chunk, map, join, get } = require('lodash/fp');

const buildAssetsQueryRequests = (entitiesWithHexValues, options) =>
  flow(
    chunk(5), 
    map((entityChunk) => ({
      options,
      query: `{${flow(
        map((entity) => buildAliasedQueryForThisEntity(entity, options.searchAssetTypes)),
        join('\n')
      )(entityChunk)}}`
    }))
  )(entitiesWithHexValues);

const buildAliasedQueryForThisEntity = ({ hexValue, value }, searchAssetTypes) =>
  `FullTextSearch_${hexValue}: queryV1(query: "FIND UNIQUE '${value}' WITH (_class = (${flow(
    map(({ value: searchAssetType }) => `'${searchAssetType}'`),
    join(' or ')
  )(searchAssetTypes)}))") { data }
  FieldSearch_${hexValue}: queryV1(query: "FIND UNIQUE (${flow(
    map(get('value')),
    join(' | ')
  )(searchAssetTypes)}) WITH displayName~='${value}'") { data }`;

module.exports = buildAssetsQueryRequests;
