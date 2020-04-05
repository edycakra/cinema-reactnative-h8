const express = require('express')
const router = express.Router()
const SeriesController = require('../controllers/SeriesController')

router.get('/series', SeriesController.findAll)
router.get('/series/:id', SeriesController.findOne)
router.post('/series', SeriesController.create)
router.put('/series/:id', SeriesController.update)
router.delete('/series/:id', SeriesController.delete)

module.exports = router