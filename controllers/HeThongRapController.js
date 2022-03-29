const HeThongRap = require("../models/HeThongRap")

const LayThongTinHeThongRap = (req, res, next) =>{
    HeThongRap.find()
    .then(content =>{
        res.json({
            statusCode : "200",
            message: "Xử lý thành công!",
            content
        })
    })
    .catch(error =>{
        res.json({
            message: 'An error occured!'
        })
    })
}

const ThemHeThongRap =(req, res, next) =>{
    let hethongrap = new HeThongRap({
        maHeThongRap: req.body.maHeThongRap,
        tenHeThongRap: req.body.tenHeThongRap,
        biDanh: req.body.biDanh,
        logo: req.body.logo
    })
    hethongrap.save()
    .then(response =>{
        res.json({
            message: 'Store susccessful'
        })
    })
    .catch(error =>{
        res.json({
            message: 'An error occured!',
            message: 'Cannot store the movie'
        })
    })
}

module.exports = {
    LayThongTinHeThongRap, ThemHeThongRap
}
