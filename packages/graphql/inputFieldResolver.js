/* eslint-disable no-param-reassign */
import {
  GraphQLScalarType,
  isWrappingType,
  isNamedType,
  GraphQLNonNull,
  GraphQLList,
} from 'graphql';

/**
 * A validation type is injected from a validation directive and serves the purpose of
 * applying the passed constraint to the type.
 *
 * Unfortunately input types don't currently have a "resolve" mechanism from directives
 * so this is a workaround
 */
export default class InputFieldResolver extends GraphQLScalarType {
  /**
     * Create the wrapper type and validation handler for the constraint on the type
     */
  static create(field, constraint, schema) {
    if (field.type instanceof GraphQLScalarType) {
      field.type = new this(field.type, constraint);
    } else if (field.type instanceof GraphQLNonNull
            && field.type.ofType instanceof GraphQLScalarType) {
      field.type = new GraphQLNonNull(new this(field.type.ofType, constraint));
    } else if (isWrappingType(field.type) && field.type instanceof GraphQLList) {
      field.type = new GraphQLList(new this(field.type, constraint));
    } else {
      throw new Error(`Type ${field.type} cannot be validated. Only scalars are accepted`);
    }

    const typeMap = schema.getTypeMap();
    let { type } = field;
    if (isWrappingType(type)) {
      type = type.ofType;
    }

    if (isNamedType(type) && !typeMap[type.name]) {
      typeMap[type.name] = type;
    }
  }

  constructor(type, constraint) {
    super({
      name: `Is${constraint.getName()}`,
      description: 'Scalar type wrapper for input decodeHex',

      /**
             * Server -> Client
             */
      serialize(value) {
        return type.serialize(value);
      },
      /**
             * Client (Variable) -> Server
             */
      parseValue(value) {
        const val = type.parseValue(value);
        if (typeof constraint.run === 'function') {
          return constraint.run(val);
        }
        return val;
      },
      /**
             * Client (Param) -> Server
             */
      parseLiteral(valueNode, variables) {
        const value = type.parseLiteral(valueNode, variables);
        if (typeof constraint.run === 'function') {
          return constraint.run(value);
        }
        return value;
      },
    });
  }
}
