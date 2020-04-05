const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'
const dbName = 'entertainme'
const client = new MongoClient(url, { useUnifiedTopology: true })

module.exports = {
    client,
    dbName
}