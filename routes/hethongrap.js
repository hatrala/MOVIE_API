const express  = require('express')
const router = express.Router()

const QuanlyPhim = require('../controllers/QuanlyPhim')
const HeThongRapController = require("../controllers/HeThongRapController")

router.get('/LayThongTinHeThongRap', HeThongRapController.LayThongTinHeThongRap)
router.post('/ThemHeThongRap', HeThongRapController.ThemHeThongRap)
router.post('/ThemCumRap', HeThongRapController.ThemCumRap)
router.post('/ThemRap', HeThongRapController.ThemRap)
router.post('/ThemRapVaoCum', HeThongRapController.ThemRapVaoCum)
router.get('/LayThongTinCumRap', HeThongRapController.LayThongTinCumRap)
router.get('/LayThongTinCumRapTheoHeThong', HeThongRapController.LayThongTinCumRapTheoHeThong)
router.post('/UpdateThongTinCumRap', HeThongRapController.UpdateThongTinCumRap)

router.post('/ThemPhimVaoHeThong', HeThongRapController.ThemPhimVaoHeThong)
router.post('/ThemPhimVaoCum', HeThongRapController.ThemPhimVaoCum)

router.get('/LayThongTinLichChieuPhim', QuanlyPhim.LayThongTinLichChieu)

router.get('/LayThongTinLichChieuTheoHeThongRap', HeThongRapController.LayThongTinLichChieuHeThongRap)

module.exports = router