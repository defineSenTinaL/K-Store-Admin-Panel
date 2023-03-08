const express = require('express')
const router = express.Router()

const CustomerCareController = require('../controllers/CustomerCareController')

router.post('/create', CustomerCareController.create)

module.exports = router