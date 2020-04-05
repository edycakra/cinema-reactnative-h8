const axios = require('axios')

const movieInstance = axios.create({
    baseURL: 'http://localhost:3001'
})

module.exports = movieInstance