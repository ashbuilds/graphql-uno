module.exports = {
  Book: {
    id: ({ id }) => id,
    title: ({ title = 'The life.' }) => title,
    description: ({ description = 'Its all about Bob' }) => description,
    publishedAt: ({ id }) => new Date(id),
  },
  Query: {
    book: () => ({ id: '1' }),
    books: () => Array.from('1234').map((i) => ({ id: i })),
  },
  Mutation: {
    updateBook: (_root, { id }) => id,
  },
};
