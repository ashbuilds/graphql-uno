const { mapSchema, MapperKind, getDirectives } = require('@graphql-tools/utils');
const { defaultFieldResolver } = require('graphql');
const hashids = require('../../config/hashids');

function directive(name) {
  return (schema) => mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const directives = getDirectives(schema, fieldConfig);
      if (directives[name]) {
        const { resolve = defaultFieldResolver } = fieldConfig;
        fieldConfig.resolve = async function (source, args, context, info) {
          const result = await resolve(source, args, context, info);
          console.log('result : ', result);
          return hashids.encode([result]);
        };
        return fieldConfig;
      }
    },
  });
}

module.exports = directive('hashed');
