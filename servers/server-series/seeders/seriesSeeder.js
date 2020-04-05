const { client, dbName } = require('../config')

client
    .connect()
    .then(() => {
        const db = client.db(dbName)
        seedingData(db)
    })
    .catch(console.log)


const seedingData = (db) => {
    const movies = db.collection('series')
    let payload = [
        {
            title: 'Altered Carbon',
            overview: 'Set in a future where consciousness is digitized and stored, a prisoner returns to life in a new body and must solve a mind-bending murder to win his freedom.',
            poster_path: 'https://m.media-amazon.com/images/M/MV5BNjIxMWMzMzctYmZkYy00OTkzLWFlMWUtMjc3ZDFmYzQ3YmVkXkEyXkFqcGdeQXVyNjU2ODM5MjU@._V1_SY1000_CR0,0,675,1000_AL_.jpg',
            popularity: 8.1,
            tags: ['action', 'sci-fi', 'drama']
        },
        {
            title: 'Black Mirror',
            overview: `An anthology series exploring a twisted, high-tech multiverse where humanity's greatest innovations and darkest instincts collide.`,
            poster_path: 'https://m.media-amazon.com/images/M/MV5BYTM3YWVhMDMtNjczMy00NGEyLWJhZDctYjNhMTRkNDE0ZTI1XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
            popularity: 8.8,
            tags: ['drama', 'sci-fi', 'thriller']
        },
        {
            title: 'The Mandalorian ',
            overview: 'The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.',
            poster_path: 'https://m.media-amazon.com/images/M/MV5BMWI0OTJlYTItNzMwZi00YzRiLWJhMjItMWRlMDNhZjNiMzJkXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SY1000_CR0,0,675,1000_AL_.jpg',
            popularity: 8.7,
            tags: ['action', 'adventure', 'sci-fi']
        }
    ]

    movies
        .insertMany(payload)
        .then(() => {
            console.log(`=== seeding success`)
        })
        .catch(console.log)
        .finally(() => {
            client.close()
        })
}