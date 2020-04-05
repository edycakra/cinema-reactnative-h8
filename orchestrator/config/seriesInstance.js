const axios = require('axios')

const seriesInstance = axios.create({
    baseURL: 'http://localhost:3002'
})

module.exports = seriesInstance