const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const res = require('express/lib/response')


const Rap = require("../models/Rap")
const Phim = require("../models/Phim")
const LichChieu = require("../models/LichChieu")
const Ve = require("../models/Ve")
const CumRap = require("../models/CumRap")
const HeThongRap = require('../models/HeThongRap')

// const { json } = require('express/lib/response')

const register = (req,res,next) => {
    bcrypt.hash(req.body.matKhau, 10, function(err, hashedPass){
        if(err){
            res.json({
                error: err
            })
        }
        let user = new User ({
            taiKhoan: req.body.taiKhoan,
            email: req.body.email,
            matKhau: hashedPass,
            admin: req.body.admin,
            hoTen: req.body.hoTen,
            soDT: req.body.soDT,
            maNhom: req.body.maNhom
        })
        user.save()
        .then(user =>{
            res.json({
                statusCode: 200,
                message: "Xử lý thành công!",
                content: {
                    taiKhoan: req.body.taiKhoan,
                    email: req.body.email,
                    matKhau: hashedPass,
                    admin: req.body.admin,
                    hoTen: req.body.hoTen,
                    soDT: req.body.soDT,
                    maNhom: req.body.maNhom
                }
            })
        })
        .catch(error =>{
            res.json({
                message: 'An error occured!'
            })
        })
    })
}

const login = (req,res,next)=>{
    var taiKhoan = req.body.taiKhoan
    var matKhau = req.body.matKhau

     User.findOne({taiKhoan: taiKhoan})
    .then(user =>{
        if(user){
            bcrypt.compare(matKhau, user.matKhau, function(err, result){
                if(err){
                    res.json({
                        error: err
                    })
                }
                if(result){
                    const userid = user.id
                    let accessToken = jwt.sign({id: user.id, admin: user.admin, taiKhoan: user.taiKhoan}, 'abc', {})
                    let content = user;
                    res.json({
                        statusCode : "200",
                        message: "Login thành công!",
                        content:{
                            taiKhoan: user.taiKhoan,
                            hoTen: user.hoTen,
                            email: user.email,
                            soDT: user.soDT,
                            maNhom: user.maNhom,
                            accessToken
                        }
                    })
                }else{
                    res.json({
                        message: 'Password does not match!'
                    })
                }
            })
        }else{
            res.json({
                message: 'no user found'
            })
        }
    })
}

    
const ThongTinTaiKhoan = async (req,res,next) =>{

    const token = req.headers.authorization.split(' ')[1]
    const decode = jwt.verify(token, 'abc')
    req.user = decode
    let taiKhoanNguoiDung = req.user.taiKhoan
    let found_user = await User.findOne({taiKhoan: req.user.taiKhoan})
    .populate({
        path: 'danhSachVe', 
        populate: {
          path: 'danhSachGhe'
        }
      })

    let Ve = found_user.danhSachVe
    
    let thongTinDatVe =[]
    for (let i = 0; i < Ve.length; i++) {
        let ve = Ve[i]
        let lich = await LichChieu.findOne({maLichChieu: ve.maLichChieu})
        let phim = await Phim.findOne({maPhim: lich.maphim})
        let danhSachGhe =[]
        let Ghe = ve.danhSachGhe
        for(let j = 0; j< Ghe.length; j++){
            let ghe = Ghe[j]
            let found_rap = await Rap.findOne({maRap: ghe.maRap})
            let cumrapid = found_rap.cumRap
            let found_cumRap = await CumRap.findById(cumrapid)
            let found_heThongRap = await HeThongRap.findOne({maHeThongRap: found_cumRap.maHeThongRap})
            danhSachGhe.push({
                maHeThongRap: found_heThongRap.maHeThongRap,
                tenHeThongRap: found_heThongRap.tenHeThongRap,
                maCumRap: found_cumRap.maCumRap,
                tenCumRap: found_cumRap.tenCumRap,
                maRap: found_rap.maRap,
                tenRap: found_rap.tenRap,
                maGhe: ghe.maGhe,
                tenGhe: ghe.tenGhe
            })
        }
        thongTinDatVe.push({
            danhSachGhe,
            maVe: ve.maVe,
            ngayDat: ve.ngayDat,
            giaVe: ve.giaVe,
            tenPhim: phim.tenPhim
            // lich
        })
    }
    res.json({
        statusCode: 200,
        message: "Xử lý thành công!",
        content:{
            taiKhoanNguoiDung,
            taiKhoan: found_user.taiKhoan,
            hoTen: found_user.hoTen,
            email: found_user.email,
            soDT: found_user.soDT,
            maNhom: found_user.maNhom,
            thongTinDatVe
            // Ve
            // found_user
        }
    })



}

module.exports = {
    register, login, ThongTinTaiKhoan
}