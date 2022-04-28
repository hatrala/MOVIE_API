const express = require('express')
const router = express.Router()

const LichChieuController = require("../controllers/LichChieuController")

router.post('/ThemLichChieu',LichChieuController.ThemLichChieu)
router.post('/ThemHeThongRapChieu',LichChieuController.ThemHeThongRapChieu)
router.post('/ThemCumRapChieu',LichChieuController.ThemCumRapChieu)
router.post('/ThemLichChieuVaoCum',LichChieuController.ThemLichChieuVaoCum)
router.post('/ThemCumVaoHeThong',LichChieuController.ThemCumVaoHeThong)


module.exports = router

