const express  = require('express')
const router = express.Router()

const HeThongRapController = require("../controllers/HeThongRapController")

router.get('/LayThongTinHeThongRap', HeThongRapController.LayThongTinHeThongRap)
router.post('/ThemHeThongRap', HeThongRapController.ThemHeThongRap)
router.post('/ThemCumRap', HeThongRapController.ThemCumRap)
router.post('/ThemRapVaoCum', HeThongRapController.ThemRapVaoCum)
router.get('/LayThongTinCumRap', HeThongRapController.LayThongTinCumRap)
module.exports = router