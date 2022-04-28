const HeThongRapChieu = require("../models/HeThongRapChieu")
const CumRapChieu = require("../models/CumRapChieu")
const LichChieu = require("../models/LichChieu")

const ThemHeThongRapChieu =(req, res, next) =>{
    let hethongrapchieu = new HeThongRapChieu({
        maHeThongRap: req.body.maHeThongRap,
        tenHeThongRap: req.body.tenHeThongRap,
        biDanh: req.body.biDanh,
        logo: req.body.logo
    })
    hethongrapchieu.save()
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

const ThemCumRapChieu = (req,res,next) =>{
    let cumrapchieu = new CumRapChieu({
        maHeThongRap: req.body.maHeThongRap,
        maCumRap: req.body.maCumRap,
        tenCumRap: req.body.tenCumRap,
        diaChi: req.body.diaChi
    })
    cumrapchieu.save()
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

const ThemLichChieu =(req, res, next) =>{
    let lichchieu = new LichChieu({
        maLichChieu: req.body.maLichChieu,
        moRap: req.body.maRap,
        tenRap: req.body.tenRap,
        ngayChieuGioChieu: req.body.ngayChieuGioChieu,
        giaVe: req.body.giaVe,
        thoiLuong: req.body.thoiLuong
    })
    // saveImage(phim, req.body.imag)
    lichchieu.save()
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

const ThemLichChieuVaoCum = async (req,res,next) =>{
    let CumRapChieuID = req.body.CumRapChieuID
    let newLichChieu = req.body.LichChieuID
     let result = await CumRapChieu.findById(CumRapChieuID);
    result.lichChieuPhim.push({$each: newLichChieu});
    await result.save()
    .then(()=>{
        res.json({
            message: 'Thêm lịch chiếu thành công'
        })
     })
    .catch(error =>{
        res.json({
            message: 'An error occured!'
        })
    })
}  

const ThemCumVaoHeThong = async (req,res,next) =>{
    let HeThongRapChieuID = req.body.HeThongRapChieuID
    let newCum = req.body.CumID
     let result = await HeThongRapChieu.findById(HeThongRapChieuID);
    result.cumRapChieu.push({$each: newCum});
    await result.save()
    .then(()=>{
        res.json({
            message: 'Thêm rạp chiếu vào hệ thống thành công'
        })
     })
    .catch(error =>{
        res.json({
            message: 'An error occured!'
        })
    })
}

module.exports = {
    ThemCumRapChieu, ThemHeThongRapChieu, ThemLichChieu, ThemLichChieuVaoCum, ThemCumVaoHeThong
}

