const express = require('express')
const router = express.Router()

const QuanlyPhim = require('../controllers/QuanlyPhim')

router.get('/', QuanlyPhim.LayDanhSachPhim)
router.post('/LayThongTinPhim', QuanlyPhim.LayThongTinPhim)
router.post('/LayThongTinPhimTheoNgay', QuanlyPhim.LayThongTinPhimTheoNgay)
router.post('/ThemPhim', QuanlyPhim.ThemPhim)
router.post('/update', QuanlyPhim.update)
router.post('/updateHinh', QuanlyPhim.updateHinh)
router.post('/updateTrailer', QuanlyPhim.updateHinh)
router.post('/delete', QuanlyPhim.destroy)

module.exports = router