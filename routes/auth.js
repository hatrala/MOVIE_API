const express  = require('express')
const router = express.Router()

const AuthController = require('../controllers/AuthController')

router.post('/register', AuthController.register)
router.post('/DangNhap', AuthController.login)

module.exports = router