module.exports = {
  Author: {
    id: ({ id }) => id,
    name: ({ name = 'Bob marley' }) => name,
    email: ({ email = 'marley@example.com' }) => email,
    books: ({ id }) => Array.from(Array(Number(id)).keys()).map((i) => ({ id: i })),
  },
  Query: {
    author: () => ({ id: '1' }),
    authors: () => Array.from('123').map((i) => ({ id: i })),
  },
  Mutation: {
    addAuthor: (_root, { input }) => {
      console.log('args : ', input);
      return {
        id: '12',
        ...input,
      };
    },
  },
};
