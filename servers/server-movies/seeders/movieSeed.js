const { client, dbName } = require('../config')

client
    .connect()
    .then(() => {
        const db = client.db(dbName)
        seedingData(db)
    })
    .catch(console.log)


const seedingData = (db) => {
    const movies = db.collection('movies')
    let payload = [
        {
            title: 'Knives Out',
            overview: 'A detective investigates the death of a patriarch of an eccentric, combative family.',
            poster_path: 'https://m.media-amazon.com/images/M/MV5BMGUwZjliMTAtNzAxZi00MWNiLWE2NzgtZGUxMGQxZjhhNDRiXkEyXkFqcGdeQXVyNjU1NzU3MzE@._V1_SY1000_SX675_AL_.jpg',
            popularity: 8.1,
            tags: ['comedy', 'crime', 'drama']
        },
        {
            title: '1917',
            overview: 'April 6th, 1917. As a regiment assembles to wage war deep in enemy territory, two soldiers are assigned to race against time and deliver a message that will stop 1,600 men from walking straight into a deadly trap.',
            poster_path: 'https://m.media-amazon.com/images/M/MV5BOTdmNTFjNDEtNzg0My00ZjkxLTg1ZDAtZTdkMDc2ZmFiNWQ1XkEyXkFqcGdeQXVyNTAzNzgwNTg@._V1_SY1000_CR0,0,631,1000_AL_.jpg',
            popularity: 8.4,
            tags: ['drama', 'war']
        },
        {
            title: 'Joker',
            overview: 'In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the Joker.',
            poster_path: 'https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SY1000_CR0,0,674,1000_AL_.jpg',
            popularity: 8.6,
            tags: ['crime', 'drama', 'thriller']
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