const HeThongRap = require("../models/HeThongRap")
const CumRap = require("../models/CumRap")
const LichChieu = require("../models/LichChieu")

// const ThemHeThongRapChieu =(req, res, next) =>{
//     let hethongrapchieu = new HeThongRapChieu({
//         maHeThongRap: req.body.maHeThongRap,
//         tenHeThongRap: req.body.tenHeThongRap,
//         biDanh: req.body.biDanh,
//         logo: req.body.logo
//     })
//     hethongrapchieu.save()
//     .then(response =>{
//         res.json({
//             message: 'Store susccessful'
//         })
//     })
//     .catch(error =>{
//         res.json({
//             message: 'An error occured!',
//             message: 'Cannot store the movie'
//         })
//     })
// }

// const ThemCumRapChieu = (req,res,next) =>{
//     let cumrapchieu = new CumRapChieu({
//         maHeThongRap: req.body.maHeThongRap,
//         maCumRap: req.body.maCumRap,
//         tenCumRap: req.body.tenCumRap,
//         diaChi: req.body.diaChi
//     })
//     cumrapchieu.save()
//     .then(response =>{
//         res.json({
//             message: 'Store susccessful'
//         })
//     })
//     .catch(error =>{
//         res.json({
//             message: 'An error occured!',
//             message: 'Cannot store the movie'
//         })
//     })
// }

const ThemLichChieu =(req, res, next) =>{
    let lichchieu = new LichChieu({
        maLichChieu: req.body.maLichChieu,
        maRap: req.body.maRap,
        tenRap: req.body.tenRap,
        ngayChieuGioChieu: req.body.ngayChieuGioChieu,
        giaVe: req.body.giaVe,
        thoiLuong: req.body.thoiLuong,
        maphim: req.body.maPhim,
        maHeThongRap: req.body.maHeThongRap,
        maCumRap: req.body.maCumRap
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
    let CumRapID = req.body.CumRapID
    let newLichChieu = req.body.LichChieuID
     let result = await CumRap.findById(CumRapID);
    result.lichChieuPhim.push({$each: newLichChieu});
    await result.save()
    .then(()=>{
        res.json({
            message: 'Th??m l???ch chi???u th??nh c??ng'
        })
     })
    .catch(error =>{
        res.json({
            message: 'An error occured!'
        })
    })
}  

const ThemCumVaoHeThong = async (req,res,next) =>{
    let HeThongRapID = req.body.HeThongRapID
    let newCum = req.body.CumID
     let result = await HeThongRap.findById(HeThongRapID);
    result.cumRapChieu.push({$each: newCum});
    await result.save()
    .then(()=>{
        res.json({
            message: 'Th??m r???p chi???u v??o h??? th???ng th??nh c??ng'
        })
     })
    .catch(error =>{
        res.json({
            message: 'An error occured!'
        })
    })
}

module.exports = {
    // ThemCumRapChieu, ThemHeThongRapChieu,
     ThemLichChieu, ThemLichChieuVaoCum, ThemCumVaoHeThong
}

