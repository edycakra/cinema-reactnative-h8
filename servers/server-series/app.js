const express = require('express')
const app = express()
const PORT = 3002
const routes = require('./routes')
const morgan = require('morgan')
const { client, dbName } = require('./config')

app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

client.connect()
    .then(() => {
        console.log('connected to mongodb')
        const db = client.db(dbName)


        app.use((req, res, next) => {
            req.db = db
            next()
        })

        app.use(routes)

        app.listen(PORT, () => {
            console.log('app is connected on PORT:', PORT)
        })
    })
    .catch(console.log)
