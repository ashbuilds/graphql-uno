const { mapSchema, MapperKind } = require('@graphql-tools/utils');
const { defaultFieldResolver } = require('graphql');
const hashids = require('../../config/hashids');
const wrapperFn = require('../../config/inputWrapper');

function directive(name) {
  return (schema) => mapSchema(schema, {
    [MapperKind.FIELD]: (fieldConfig) => {
      const mappedArgs = wrapperFn(schema, fieldConfig, name);
      if (!mappedArgs.length) return fieldConfig;

      const { resolve = defaultFieldResolver } = fieldConfig;
      fieldConfig.resolve = async (source, args, context, info) => {
        const ids = {};
        mappedArgs.forEach((key) => {
          const value = args[key];
          ids[key] = hashids.decode(value)[0];
        });
        return resolve(source, { ...args, ...ids }, context, info);
      };
      return fieldConfig;
    },
  });
}

module.exports = directive('unhashed');
