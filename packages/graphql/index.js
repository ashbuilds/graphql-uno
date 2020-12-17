import { ApolloServer } from 'apollo-server';
import faker from 'faker';
import schema from './schema';

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ schema, dataSources: () => ({ faker }) });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
