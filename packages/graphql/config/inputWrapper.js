const { getDirectives } = require('@graphql-tools/utils');
const { isNonNullType, isScalarType } = require('graphql');

const wrapperFn = (schema, fieldConfig, directiveName) => {
  if (!fieldConfig.args) return [];
  return Object.values(fieldConfig.args).filter((i) => {
    if (isNonNullType(i.type) || isScalarType(i.type)) {
      const directives = getDirectives(schema, i);
      return !!directives[directiveName];
    }
    return false;
  }).map(({ astNode: { name } }) => name.value);
};

module.exports = wrapperFn;
