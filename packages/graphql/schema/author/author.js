module.exports = {
    Author: {
        id: (id) => id,
        name: () => 'Test book',
        email: () => 'email@example.com',
        books: (id) => Array.from(Array(Number(id)).keys()),
    },
    Query: {
        author: () => {
            return '1'
        },
        authors: () => {
            return Array.from('123')
        }
    },
}
