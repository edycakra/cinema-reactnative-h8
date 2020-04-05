const ObjectID = require('mongodb').ObjectID

class Movies {
    static findAll(movies) {
        return movies.collection('movies')
            .find({}).toArray()
    }

    static findOne(movies, id) {
        return movies.collection('movies')
            .findOne({ _id: ObjectID(id) })
    }

    static create(movies, payload) {
        return movies.collection('movies')
            .insertOne(payload)
    }

    static update(movies, id, payload) {
        return movies.collection('movies')
            .findOneAndUpdate({ _id: ObjectID(id) }, { $set: payload }, { upsert: true, returnOriginal: false })
    }

    static delete(movies, id) {
        return movies.collection('movies')
            .deleteOne({ _id: ObjectID(id) })
    }
}

module.exports = Movies