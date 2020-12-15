module.exports = {
    Book: {
        id: (id) => id,
        title: () => 'Test book',
        description: () => "Test Description",
        publishedAt: (id) => new Date(id),
    },
    Query: {
        book: () => {
            return '1'
        },
        books: () => {
            return Array.from('1234')
        }
    },
}
