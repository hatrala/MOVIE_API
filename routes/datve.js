const express = require('express')
const { append } = require('express/lib/response')
const router = express.Router()

const DatVe = require('../controllers/DatVeController')

router.get("/LayDanhSachPhongVe", DatVe.LayDanhSachPhongve)
router.post('/ThemGhe', DatVe.ThemGhe)
router.post('/ThemGhe_test', DatVe.ThemGhe_test)
router.post('/DS_ghe', DatVe.DS_Ghe)
router.post('/ThemGheVaoRap', DatVe.ThemGheVaoRap)
router.post('/DatVe', DatVe.DatVe)

module.exports = router