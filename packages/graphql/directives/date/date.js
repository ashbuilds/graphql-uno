const { mapSchema, MapperKind, getDirectives } = require('@graphql-tools/utils');
const { defaultFieldResolver } = require('graphql');
const moment = require('../../config/moment');
require('moment/min/locales.min');

function directive(name) {
  const typeDirectiveArgumentMaps = {};
  return (schema) => mapSchema(schema, {
    [MapperKind.INPUT_OBJECT_TYPE]: (type) => {
      if (type.toString() === '_DATE') {
        typeDirectiveArgumentMaps[name] = type;
      }
      return undefined;
    },
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const argType = typeDirectiveArgumentMaps[name];
      const directives = getDirectives(schema, fieldConfig);
      if (directives[name]) {
        fieldConfig.args[name] = {
          type: argType,
        };
        const { resolve = defaultFieldResolver } = fieldConfig;
        fieldConfig.resolve = async function (source, { date = {}, ...args }, context, info) {
          const result = await resolve(source, args, context, info);
          if (date.locale) {
            moment.locale(date.locale);
          } else {
            moment.locale('en');
          }
          if (date.format) {
            return moment(result).format(date.format);
          }
          return result;
        };
        return fieldConfig;
      }
      return fieldConfig;
    },
  });
}

module.exports = directive('date');
