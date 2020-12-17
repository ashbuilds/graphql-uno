module.exports = {
  Author: {
    id: ({ id }) => id,
    name: (
      { name },
      _root,
      { dataSources: { faker } },
    ) => name || faker.name.findName(),
    email: (
      { email },
      _root,
      { dataSources: { faker } },
    ) => email || faker.internet.email(),
    books: ({ id }) => Array.from(Array(Number(id)).keys()).map((i) => ({ id: i })),
  },
  Query: {
    author: ({ id }) => ({ id }),
    authors: () => Array.from('123').map((i) => ({ id: i })),
  },
  Mutation: {
    addAuthor: (_root, { input }) => {
      console.log('addAuthor.input: ', input);
      return {
        id: '4',
        ...input,
      };
    },
  },
};
