const express  = require('express')
const router = express.Router()

const HeThongRapController = require("../controllers/HeThongRapController")

router.get('/LayThongTinHeThongRap', HeThongRapController.LayThongTinHeThongRap)
router.post('/ThemHeThongRap', HeThongRapController.ThemHeThongRap)

module.exports = router