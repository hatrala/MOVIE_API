const { response } = require('express')
const Phim = require('../models/Phim')
const Banner = require('../models/Banner')

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
    .then(response =>{
        res.json({
            response
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
    .then(response =>{
        res.json({
            response
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
    .then(response =>{
        res.json({
            response
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
    .then(response=>{
        res.json({
            response
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

module.exports = {
    LayDanhSachPhim, LayThongTinPhim, LayThongTinPhimBangTen, ThemPhim, update, destroy, updateHinh, updateTrailer, LayThongTinPhimTheoNgay, 
    LayDanhSachBanner, ThemBanner
}