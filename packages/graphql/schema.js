import { join } from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';

const get = (path) => loadFilesSync(join(__dirname, path));

const localTypes = get('./schema/**/*.graphql');
const localResolvers = get('./schema/**/*.js');
const directives = get('./directives/**/*.graphql');
const schemaTransforms = get('./directives/**/*.js');

const typeDefs = mergeTypeDefs([...localTypes, ...directives]);
const resolvers = mergeResolvers([...localResolvers]);

const schema = makeExecutableSchema({ typeDefs, resolvers, schemaTransforms });

export default schema;
