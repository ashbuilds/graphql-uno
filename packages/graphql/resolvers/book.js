module.exports = {
    Book: {
        name: () => 'Test book',
        description: () => "Test Description",
        price: () => 12.444
    },
    Query: {
        books: () => {
            return Array.from('12')
        }
    },
}
