const express = require('express')
const router = express.Router()

const CategoriesController = require('../controllers/CategoriesController')

router.post('/categories/create', CategoriesController.create)

module.exports = router