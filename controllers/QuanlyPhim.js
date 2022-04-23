const { response } = require('express')
const HeThongRap = require("../models/HeThongRap")
const Rap = require("../models/Rap")
const CumRap = require("../models/CumRap")
const LichChieu = require("../models/LichChieu")
const Phim = require('../models/Phim')
const Banner = require('../models/Banner')
const multer = require('multer')
const upload = multer({dest: 'uploads/'})
const imageMimeTypes = ['image/png', 'image/jpg'];


// show list of movie
const LayDanhSachPhim = (req, res, next) =>{
    Phim.find()
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

// show single movie
const LayThongTinPhim =(req, res, next) =>{
    let phimID = req.body.phimID
    Phim.findById(phimID)
    .then(content =>{
        res.json({
            statusCode : "200",
            message: "Xử lý thành công!",
            content
        })
    })
    .catch(error =>{
        res.json({
            message: 'An error occured!',
            message: 'Cannot show the movie'
        })
    })
}

const LayThongTinPhimBangTen =(req, res, next) =>{
    let name = req.body.name.trim()
    Phim.find({tenPhim: name})
    .then(content =>{
        res.json({
            statusCode : "200",
            message: "Xử lý thành công!",
            content
        })
    })
    .catch(error =>{
        res.json({
            message: 'An error occured!',
            message: 'Cannot show the movie'
        })
    })
}

// lay thong tin phim dua tren ngay chieu
const LayThongTinPhimTheoNgay =(req, res, next) =>{
    let Ngay = req.body.Ngay
    Phim.find({ngayKhoiChieu: Ngay})
    .then(content =>{
        res.json({
            statusCode : "200",
            message: "Xử lý thành công!",
            content
        })
    })
    .catch(error =>{
        res.json({
            message: 'An error occured!',
            message: 'Cannot show the movie'
        })
    })
}

// tao movie moi
const ThemPhim =(req, res, next) =>{
    let phim = new Phim({
        maPhim: req.body.maPhim,
        tenPhim: req.body.tenPhim,
        moTa: req.body.moTa,
        trailer: req.body.trailer,
        hinhAnh: req.body.hinhAnh,
        biDanh: req.body.biDanh,
        maNhom: req.body.maNhom,
        ngayKhoiChieu: req.body.ngayKhoiChieu,
        danhGia: req.body.danhGia,
        sapChieu: req.body.sapChieu,
        dangChieu: req.body.dangChieu,
        hot: req.body.hot
    })
    // saveImage(phim, req.body.imag)
    if(req.file){
        phim.image = req.file.path
    }
    phim.save()
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

// function saveImage(movie, imgEncoded){
//     if( imgEncoded = null) return;

//     const img = JSON.parse(imgEncoded);

//     if(img != null && imageMimeTypes.includes(img.type)){
//         phim.img = new Buffer.from(img.data, 'base64')
//         phim.imgType = img.type
//     }
// }

// update toan bo thong tin phim
const update=(req, res, next) =>{
    let phimID = req.body.phimID

    let updateData ={
        maPhim: req.body.maPhim,
        tenPhim: req.body.tenPhim,
        moTa: req.body.moTa,
        trailer: req.body.trailer,
        hinhAnh: req.body.hinhAnh,
        biDanh: req.body.biDanh,
        maNhom: req.body.maNhom,
        ngayKhoiChieu: req.body.ngayKhoiChieu,
        danhGia: req.body.danhGia,
        sapChieu: req.body.sapChieu,
        dangChieu: req.body.dangChieu,
        hot: req.body.Hot
    }

    Phim.findByIdAndUpdate(phimID, {$set: updateData})
    .then(()=>{
        res.json({
            message: 'Update successful'
        })
    })
    .catch(error =>{
        res.json({
            message: 'An error occured!'
        })
    })
}

// update hinh cho phim
const updateHinh=(req, res, next) =>{
    let phimID = req.body.phimID

    let updateData ={
        hinhAnh: req.body.hinhAnh 
    }

    Phim.findByIdAndUpdate(phimID, {$set: updateData})
    .then(()=>{
        res.json({
            message: 'Update Image successful'
        })
    })
    .catch(error =>{
        res.json({
            message: 'An error occured!'
        })
    })
}

// update trailer
const updateTrailer=(req, res, next) =>{
    let phimID = req.body.phimID

    let updateData ={
        trailer: req.body.trailer
    }

    Phim.findByIdAndUpdate(phimID, {$set: updateData})
    .then(()=>{
        res.json({
            message: 'Update Trailer successful'
        })
    })
    .catch(error =>{
        res.json({
            message: 'An error occured!'
        })
    })
}

// delete employee
const destroy = (req, res, next) =>{
    let phimID = req.body.phimID
    Phim.findByIdAndRemove(phimID)
    .then(()=>{
        res.json({
            message: 'Delete successful'
        })
    })
    .catch(error =>{
        res.json({
            message: 'An error occured!'
        })
    })
}

const LayDanhSachBanner = (req, res, next) =>{
    Banner.find()
    .then(content=>{
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

const ThemBanner =(req, res, next) =>{
    let banner = new Banner({
        maBanner: req.body.maBanner,
        maPhim: req.body.maPhim,
        hinhAnh: req.body.hinhAnh
    })
    banner.save()
    .then(response =>{
        res.json({
            message: 'Store banner susccessful'
        })
    })
    .catch(error =>{
        res.json({
            message: 'An error occured!',
            message: 'Cannot store the banner'
        })
    })
}

const ThemLichChieuVaoPhim = async (req,res,next) =>{
    let MaPhim = req.body.maPhim
    // let HeThongRapID = req.body.heThongRapID
    // let CumRapID = req.body.CumRapID
    // let LichChieuID = req.body.LichChieuID
    let updateData ={
        heThongRapChieu: req.body.heThongRapID
    }
    // let newRap = req.body.RapID
    Phim.findOneAndUpdate({maPhim: MaPhim}, {$set: updateData})
    // result.heThongRapChieu.push(HeThongRapID);
    // result.heThongRapChieu.cumRapChieu.push(CumRapID);
    // result.heThongRapChieucumRapChieu.lichChieuPhim.push( LichChieuID);
    // await result.save()
    .then(()=>{
        res.json({
            message: 'Thêm lịch chiếu vào phim thành công'
        })
     })
    .catch(error =>{
        res.json({
            message: 'An error occured!'
        })
    })
}

module.exports = {
    LayDanhSachPhim, LayThongTinPhim, LayThongTinPhimBangTen, ThemPhim, update, destroy, updateHinh, updateTrailer, LayThongTinPhimTheoNgay, 
    LayDanhSachBanner, ThemBanner, ThemLichChieuVaoPhim,
    ThemLichChieu
}