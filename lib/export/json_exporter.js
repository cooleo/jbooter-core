'use strict';

const fs = require('fs'),
    readEntityJSON = require('../reader/json_file_reader').readEntityJSON,
    toFilePath = require('../reader/json_file_reader').toFilePath,
    doesfileExist = require('../reader/json_file_reader').doesfileExist,
    areJBooterEntitiesEqual = require('../utils/object_utils').areEntitiesEqual,
    buildException = require('../exceptions/exception_factory').buildException,
    exceptions = require('../exceptions/exception_factory').exceptions;

module.exports = {
  exportToJSON: exportToJSON,
  createJBooterJSONFolder: createJBooterJSONFolder
};

function exportToJSON(entities, forceNoFiltering) {
  if (!entities) {
    throw new buildException(
        exceptions.NullPointer,
        'Entities have to be passed to be exported.');
  }
  createJBooterJSONFolder();
  if (!forceNoFiltering) {
    entities = filterOutUnchangedEntities(entities);
  }
  for (let i = 0, entityNames = Object.keys(entities); i < entityNames.length; i++) {
    let filePath = toFilePath(entityNames[i]);
    let entity = updateChangelogDate(filePath, entities[entityNames[i]]);
    fs.writeFileSync(filePath, JSON.stringify(entity, null, 4));
  }
}

function createJBooterJSONFolder() {
  try {
    if (!fs.statSync('./.jbooter').isDirectory()) {
      fs.mkdirSync('.jbooter');
    }
  } catch (error) {
    fs.mkdirSync('.jbooter');
  }
}

function updateChangelogDate(filePath, entity) {
  if (doesfileExist(filePath)) {
    let fileOnDisk = readEntityJSON(filePath);
    if (fileOnDisk && fileOnDisk.changelogDate) {
      entity.changelogDate = fileOnDisk.changelogDate;
    }
  }
  return entity;
}

function filterOutUnchangedEntities(entities) {
  var filtered = {};
  for (let i = 0, entityNames = Object.keys(entities); i < entityNames.length; i++) {
    let entityName = entityNames[i];
    let filePath = toFilePath(entityName);
    if (!(doesfileExist(filePath) && areJBooterEntitiesEqual(readEntityJSON(filePath), entities[entityName]))) {
      filtered[entityName] = (entities[entityName]);
    }
  }
  return filtered;
}
