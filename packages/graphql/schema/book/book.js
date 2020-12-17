module.exports = {
  Book: {
    id: ({ id }) => id,
    title: (
      { title },
      _root,
      { dataSources: { faker } },
    ) => title || faker.fake('{{random.word}} {{internet.domainWord}}'),
    description: (
      { description },
      _root,
      { dataSources: { faker } },
    ) => description || faker.hacker.phrase(),
    publishedAt: (
      _args,
      _root,
      { dataSources: { faker } },
    ) => new Date(faker.date.past()),
  },
  Query: {
    book: (_root, { id }) => ({ id }),
    books: () => Array.from('1234').map((i) => ({ id: i })),
  },
  Mutation: {
    updateBook: (_root, { id }) => {
      console.log('updateBook.id: ', { id });
      return { id };
    },
  },
};
