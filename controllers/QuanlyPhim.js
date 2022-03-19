const { response } = require('express')
const Phim = require('../models/Phim')
const Banner = require('../models/Banner')

// show list of movie
const LayDanhSachPhim = (req, res, next) =>{
    Phim.find()
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

const LayThongTinPhimBangTen =(req, res, next) =>{
    let name = req.body.name
    Phim.find({TenPhim: name})
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

// lay thong tin phim dua tren ngay chieu
const LayThongTinPhimTheoNgay =(req, res, next) =>{
    let Ngay = req.body.Ngay
    Phim.find(Ngay)
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
        TenPhim: req.body.TenPhim,
        Mota: req.body.Mota,
        Trailer: req.body.Trailer,
        HinhAnh: req.body.HinhAnh,
        BiDanh: req.body.BiDanh,
        MaNhom: req.body.MaNhom,
        NgayKhoiChieu: req.body.NgayKhoiChieu,
        SapChieu: req.body.SapChieu,
        DangChieu: req.body.DangChieu,
        Hot: req.body.Hot
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
        TenPhim: req.body.TenPhim,
        Mota: req.body.Mota,
        Trailer: req.body.Trailer,
        HinhAnh: req.body.HinhAnh,
        BiDanh: req.body.BiDanh,
        MaNhom: req.body.MaNhom,
        NgayKhoiChieu: req.body.NgayKhoiChieu,
        SapChieu: req.body.SapChieu,
        DangChieu: req.body.DangChieu,
        Hot: req.body.Hot
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
        HinhAnh: req.body.HinhAnh 
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
        Trailer: req.body.Trailer
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
        MaBanner: req.body.MaBanner,
        MaPhim: req.body.MaPhim,
        HinhAnh: req.body.HinhAnh
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
