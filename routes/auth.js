const express  = require('express')
const router = express.Router()

const AuthController = require('../controllers/AuthController')

router.post('/DangKy', AuthController.register)
router.post('/DangNhap', AuthController.login)
router.post('/ThongTinTaiKhoan', AuthController.ThongTinTaiKhoan)
module.exports = router