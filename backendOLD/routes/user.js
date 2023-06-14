const express = require('express')
const router = express.Router()

const UserController = require('../controllers/UserController')

router.post('/registration', UserController.registration)

module.exports = router
