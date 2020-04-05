const ObjectID = require('mongodb').ObjectID

class Series {
    static findAll(series) {
        return series.collection('series')
            .find({}).toArray()
    }

    static findOne(series, id) {
        return series.collection('series')
            .findOne({ _id: ObjectID(id) })
    }

    static create(series, payload) {
        return series.collection('series')
            .insertOne(payload)
    }

    static update(series, id, payload) {
        return series.collection('series')
            .findOneAndUpdate({ _id: ObjectID(id) }, { $set: payload }, { upsert: true, returnOriginal: false })
    }

    static delete(series, id) {
        return series.collection('series')
            .deleteOne({ _id: ObjectID(id) })
    }
}

module.exports = Series