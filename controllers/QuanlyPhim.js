const { response } = require('express')
const Phim = require('../models/Phim')

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

// store movie
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

// update phim

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

module.exports = {
    LayDanhSachPhim, LayThongTinPhim, ThemPhim, update, destroy, updateHinh, updateTrailer, LayThongTinPhimTheoNgay
}