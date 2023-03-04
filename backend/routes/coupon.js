const express = require('express')
const router = express.Router()

const CouponController = require('../controllers/CouponController')

router.post('/create', CouponController.create)

module.exports = router