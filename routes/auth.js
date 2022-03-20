const express  = require('express')
const Router = express.Router()

const AuthController = require('../controllers/AuthController')
const router = require('./employee')

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)

module.exports = router