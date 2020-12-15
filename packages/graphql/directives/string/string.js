const { mapSchema, MapperKind, getDirectives } = require('@graphql-tools/utils');
const { defaultFieldResolver, GraphQLString } = require('graphql');

const changeCase = (string = '', type) => {
    if(typeof string !== 'string') return string;

    switch (type) {
        case "upperCase": return string.toUpperCase();
        case "lowerCase": return string.toLowerCase();
        default: return string;
    }
}

function transformer(name) {
    const typeDirectiveArgumentMaps = {};
    return (schema) => mapSchema(schema, {
        [MapperKind.INPUT_OBJECT_TYPE]: (type) => {
            if(type.toString() === '_STRING') {
                typeDirectiveArgumentMaps[name] = type;
            }
            return undefined;
        },
        [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
            const argType = typeDirectiveArgumentMaps[name];
            const directives = getDirectives(schema, fieldConfig);
            console.log('directives: ', directives)
            if (fieldConfig.type.toString() === GraphQLString.name || directives[name]) {
                fieldConfig.args[name] = {
                    type: argType,
                };
                const { resolve = defaultFieldResolver } = fieldConfig;
                fieldConfig.resolve = async function (source, { string = {}, ...args }, context, info) {
                    const result = await resolve(source, args, context, info);
                    console.log('result string : ', typeof result, string, result)
                    if(string.case) {
                        return changeCase(result, string.case)
                    }
                    return result
                }
                return fieldConfig;
            }
        }
    })
}


module.exports = transformer('string')
