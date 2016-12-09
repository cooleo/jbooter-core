'use strict';

const BINARY_OPTIONS = require('../lib/core/jbooter/binary_options'),
    UNARY_OPTIONS = require('../lib/core/jbooter/unary_options'),
    RELATIONSHIP_TYPES = require('../lib/core/jbooter/relationship_types'),
    FIELD_TYPES = require('../lib/core/jbooter/field_types'),
    VALIDATIONS = require('../lib/core/jbooter/validations'),
    DATABASE_TYPES = require('../lib/core/jbooter/database_types'),
    JDLReader = require('../lib/reader/jdl_reader'),
    JsonReader = require('../lib/reader/json_reader'),
    convertToJDL = require('../lib/parser/jdl_parser').parse,
    convertToJBooterJSON = require('../lib/parser/entity_parser').parse,
    JsonParser = require('../lib/parser/json_parser'),
    JDLObject = require('../lib/core/jdl_object'),
    JDLEntity = require('../lib/core/jdl_entity'),
    JDLField = require('../lib/core/jdl_field'),
    JDLValidation = require('../lib/core/jdl_validation'),
    JDLEnum = require('../lib/core/jdl_enum'),
    JDLRelationship = require('../lib/core/jdl_relationship'),
    JDLRelationships = require('../lib/core/jdl_relationships'),
    JDLUnaryOption = require('../lib/core/jdl_unary_option'),
    JDLBinaryOption = require('../lib/core/jdl_binary_option'),
    exportToJSON = require('../lib/export/json_exporter').exportToJSON,
    createJBooterJSONFolder = require('../lib/export/json_exporter').createJBooterJSONFolder,
    exportToJDL = require('../lib/export/jdl_exporter').exportToJDL,
    toFilePath = require('../lib/reader/json_file_reader').toFilePath,
    readEntityJSON = require('../lib/reader/json_file_reader').readEntityJSON,
    ReservedKeywords = require('../lib/core/jbooter/reserved_keywords'),
    ObjectUtils = require('../lib/utils/object_utils'),
    StringUtils = require('../lib/utils/string_utils'),
    Set = require('../lib/utils/objects/set');

module.exports = {
  /* JBooter notions */
  JBooterBinaryOptions: BINARY_OPTIONS,
  JBooterUnaryOptions: UNARY_OPTIONS,
  JBooterRelationshipTypes: RELATIONSHIP_TYPES,
  JBooterValidations: VALIDATIONS,
  JBooterFieldTypes: FIELD_TYPES,
  JBooterDatabaseTypes: DATABASE_TYPES,
  isReservedKeyword: ReservedKeywords.isReserved,
  isReservedClassName: ReservedKeywords.isReservedClassName,
  isReservedTableName: ReservedKeywords.isReservedTableName,
  isReservedFieldName: ReservedKeywords.isReservedFieldName,
  /* JDL objects */
  JDLObject: JDLObject,
  JDLEntity: JDLEntity,
  JDLField: JDLField,
  JDLValidation: JDLValidation,
  JDLEnum: JDLEnum,
  JDLRelationship: JDLRelationship,
  JDLRelationships: JDLRelationships,
  JDLUnaryOption: JDLUnaryOption,
  JDLBinaryOption: JDLBinaryOption,
  /* JDL reading */
  parse: JDLReader.parse,
  parseFromFiles: JDLReader.parseFromFiles,
  /* Json reading */
  parseJsonFromDir: JsonReader.parseFromDir,
  /* JDL conversion */
  convertToJDL: convertToJDL,
  convertToJBooterJSON: convertToJBooterJSON,
  /* Json conversion */
  convertJsonEntitiesToJDL: JsonParser.parseEntities,
  convertJsonServerOptionsToJDL: JsonParser.parseServerOptions,
  /* JSON exporting */
  exportToJSON: exportToJSON,
  /* JDL exporting */
  exportToJDL: exportToJDL,
  /* JDL utils */
  isJDLFile: JDLReader.checkFileIsJDLFile,
  /* JSON utils */
  ObjectUtils: ObjectUtils,
  createJBooterJSONFolder: createJBooterJSONFolder,
  readEntityJSON: readEntityJSON,
  toFilePath: toFilePath,
  /* Objects */
  Set: Set,
  /* Utils */
  camelCase: StringUtils.camelCase
};
