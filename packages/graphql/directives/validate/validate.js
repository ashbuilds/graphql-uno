const { mapSchema, MapperKind, getDirectives } = require('@graphql-tools/utils');
const { defaultFieldResolver } = require('graphql');
const EmailValidator = require('email-validator');
const wrapperFn = require('../../config/inputWrapper');

const validate = {
  email: () => (value) => {
    if (EmailValidator.validate(value)) {
      return true;
    }
    throw Error(`Email ${value} is not valid!`);
  },
  string: ({ maxLength, minLength }) => (value) => { // Closures
    if (value.length > maxLength) {
      throw Error(`Input ${value} should be less then ${maxLength}`);
    }
    if (value.length < minLength) {
      throw Error(`Input ${value} should be greater or equal then ${minLength}`);
    }
  },
};

function directive(name) {
  const fieldStore = {};
  return (schema) => mapSchema(schema, {
    [MapperKind.INPUT_OBJECT_FIELD]: (inputFieldConfig, fieldName) => {
      const directives = getDirectives(schema, inputFieldConfig);
      if (!directives[name]) return inputFieldConfig;

      const args = directives[name];
      const fieldType = inputFieldConfig.type.toString().toLowerCase();
      const validationType = (args.type || fieldType);
      fieldStore[fieldName] = validate[validationType](args);
      return inputFieldConfig;
    },
    [MapperKind.FIELD]: (fieldConfig) => {
      const mappedArgs = wrapperFn(schema, fieldConfig, name);
      if (!mappedArgs.length) return fieldConfig;

      const { resolve = defaultFieldResolver } = fieldConfig;
      fieldConfig.resolve = async (source, args, context, info) => {
        mappedArgs.forEach((key) => {
          const values = args[key];
          Object.keys(values).forEach((valueKey) => {
            const func = fieldStore[valueKey];
            const value = values[valueKey];
            return typeof func === 'function' && func(value);
          });
        });
        return resolve(source, args, context, info);
      };
      return fieldConfig;
    },
  });
}

module.exports = directive('validate');
