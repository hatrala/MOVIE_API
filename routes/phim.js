const express = require('express')
const router = express.Router()

const QuanlyPhim = require('../controllers/QuanlyPhim')
const authenticate = require('../middlewave/authenticate')

router.get('/',authenticate, QuanlyPhim.LayDanhSachPhim)
router.post('/LayThongTinPhim',authenticate, QuanlyPhim.LayThongTinPhim)
router.post('/LayThongTinPhimBangTen',authenticate, QuanlyPhim.LayThongTinPhim)
router.post('/LayThongTinPhimTheoNgay',authenticate, QuanlyPhim.LayThongTinPhimTheoNgay)
router.post('/ThemPhim',authenticate, QuanlyPhim.ThemPhim)
router.post('/update',authenticate, QuanlyPhim.update)
router.post('/updateHinh',authenticate, QuanlyPhim.updateHinh)
router.post('/updateTrailer',authenticate, QuanlyPhim.updateHinh)
router.post('/delete',authenticate, QuanlyPhim.destroy)
// =========BANNER==========
router.get('/LayDanhSachBanner',authenticate, QuanlyPhim.LayDanhSachBanner)
router.post('/ThemBanner',authenticate, QuanlyPhim.ThemBanner)

module.exports = router
