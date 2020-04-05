const Movies = require('../models/Movies')

class MovieController {
    static findAll(req, res) {
        let movies = req.db
        Movies.findAll(movies)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(console.log)
    }

    static findOne(req, res) {
        let movies = req.db
        let id = req.params.id
        Movies.findOne(movies, id)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(console.log)
    }

    static create(req, res) {
        let movies = req.db
        let { title, overview, poster_path, popularity, tags } = req.body
        let payload = { title, overview, poster_path, popularity, tags }

        Movies.create(movies, payload)
            .then(data => {
                res.status(201).json({
                    data: data.ops[0]
                })
            })
            .catch(console.log)
    }

    static update(req, res) {
        let movies = req.db
        let id = req.params.id
        let { title, overview, poster_path, popularity, tags } = req.body
        let payload = { title, overview, poster_path, popularity, tags }

        Movies.update(movies, id, payload)
            .then(({ value }) => {
                res.status(200).json({
                    data: value
                })
            })
            .catch(console.log)
    }

    static delete(req, res) {
        let movies = req.db
        let id = req.params.id

        Movies.delete(movies, id)
            .then(data => {
                res.status(200).json({ data })
            })
            .catch(console.log)
    }
}

module.exports = MovieController