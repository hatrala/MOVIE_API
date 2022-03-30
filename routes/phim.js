const express = require('express')
const router = express.Router()

const QuanlyPhim = require('../controllers/QuanlyPhim')
const authenticate = require('../middlewave/authenticate')

router.get('/', QuanlyPhim.LayDanhSachPhim)
router.post('/LayThongTinPhim', QuanlyPhim.LayThongTinPhim)
router.post('/LayThongTinPhimBangTen', QuanlyPhim.LayThongTinPhim)
router.post('/LayThongTinPhimTheoNgay', QuanlyPhim.LayThongTinPhimTheoNgay)
router.post('/ThemPhim', QuanlyPhim.ThemPhim)
router.post('/update', QuanlyPhim.update)
router.post('/updateHinh', QuanlyPhim.updateHinh)
router.post('/updateTrailer', QuanlyPhim.updateHinh)
router.post('/delete', QuanlyPhim.destroy)
// =========BANNER==========
router.get('/LayDanhSachBanner', QuanlyPhim.LayDanhSachBanner)
router.post('/ThemBanner', QuanlyPhim.ThemBanner)

module.exports = router