const Series = require('../models/Series')

class SeriesController {
    static findAll(req, res) {
        let series = req.db
        Series.findAll(series)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(console.log)
    }

    static findOne(req, res) {
        let series = req.db
        let id = req.params.id
        Series.findOne(series, id)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(console.log)
    }

    static create(req, res) {
        let series = req.db
        let { title, overview, poster_path, popularity, tags } = req.body
        let payload = { title, overview, poster_path, popularity, tags }

        Series.create(series, payload)
            .then(data => {
                res.status(201).json({
                    data: data.ops[0]
                })
            })
            .catch(console.log)
    }

    static update(req, res) {
        let series = req.db
        let id = req.params.id
        let { title, overview, poster_path, popularity, tags } = req.body
        let payload = { title, overview, poster_path, popularity, tags }

        Series.update(series, id, payload)
            .then(({ value }) => {
                res.status(200).json({
                    data: value
                })
            })
            .catch(console.log)
    }

    static delete(req, res) {
        let series = req.db
        let id = req.params.id

        Series.delete(series, id)
            .then(data => {
                res.status(200).json({ data })
            })
            .catch(console.log)
    }
}

module.exports = SeriesController