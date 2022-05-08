const express = require('express')
const router = express.Router()

const QuanlyPhim = require('../controllers/QuanlyPhim')
const authenticate = require('../middlewave/authenticate')
const upload = require('../middlewave/upload')

router.get('/', QuanlyPhim.LayDanhSachPhim)
router.post('/LayThongTinPhim', QuanlyPhim.LayThongTinPhim)
router.get('/LayThongTinLichChieuPhim', QuanlyPhim.LayThongTinLichChieu)
router.post('/LayThongTinPhimBangTen', QuanlyPhim.LayThongTinPhim)
router.post('/LayThongTinPhimTheoNgay', QuanlyPhim.LayThongTinPhimTheoNgay)
router.post('/ThemPhim', upload.single('image') ,QuanlyPhim.ThemPhim)
// router.post('/ThemBanner', upload.single('image') ,QuanlyPhim.ThemBanner)
router.post('/ThemLichChieuVaoPhim',QuanlyPhim.ThemLichChieuVaoPhim)
router.post('/ThemLichChieu',QuanlyPhim.ThemLichChieu)
router.post('/update', QuanlyPhim.update)
router.post('/updateHinh', QuanlyPhim.updateHinh)
router.post('/updateTrailer', QuanlyPhim.updateHinh)
router.post('/delete', QuanlyPhim.destroy)

// =========BANNER========== //
router.get('/LayDanhSachBanner', QuanlyPhim.LayDanhSachBanner)
router.post('/ThemBanner', QuanlyPhim.ThemBanner)

module.exports = router