const express = require('express')
const router = express.Router()

const ProductController = require('../controllers/ProductController')

router.post('/add', ProductController.add)

module.exports = router