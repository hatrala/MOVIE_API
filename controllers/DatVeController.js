const User = require("../models/User")
const PhongVe = require("../models/PhongVe")
const Ghe = require("../models/Ghe")
const Rap = require("../models/Rap")
const Phim = require("../models/Phim")
const LichChieu = require("../models/LichChieu")
const Ve = require("../models/Ve")
const CumRap = require("../models/CumRap")
const jwt = require('jsonwebtoken')
const { populate } = require("../models/CumRap")
const { response } = require("express")

const TaoLichChieu = async (req, res, next) =>{
     let   maLichChieu = req.body.maLichChieu
      let  maphim = req.body.maPhim
      let  ngayChieuGioChieu =  req.body.ngayChieuGioChieu
       let maRap =  req.body.maRap
      let  giaVe = req.body.giaVe
      const rap = await Rap.findOne({maRap: maRap})
      let tenRap = rap.tenRap
      const cumrap = await CumRap.findById(rap.cumRap)
      let maCumRap = cumrap.maCumRap
    //   const phim = await Phim.findOne({maPhim: maPhim})
    let lichchieu = new LichChieu({
        maLichChieu: maLichChieu,
        maphim: maphim,
        ngayChieuGioChieu: ngayChieuGioChieu,
        giaVe: giaVe,
        tenRap: tenRap,
        maCumRap: maCumRap,
    })
}

const LayDanhSachPhongve = async (req, res, next) =>{
    let maLichChieu = req.query.maLichChieu
     const lichchieu = await LichChieu.findOne({maLichChieu: maLichChieu})
    // .populate({
    //     path: '', 
    //     populate: {
    //       path: 'cumRapChieu',
    //       populate: {
    //           path: 'lichChieuPhim'
    //       }
    //     }
    //   })
    let tenRap = lichchieu.tenRap
    let maphim = lichchieu.maphim
    const phim = await Phim.findOne({maPhim: maphim})
    let tenPhim = phim.tenPhim
    let hinhAnh = phim.hinhAnh
    const marap = lichchieu.maRap
    const rap = await Rap.findOne({maRap: marap}).populate("danhSachGhe")
    let danhSachGhe = rap.danhSachGhe
    
    const cumrap = await CumRap.findById(rap.cumRap)
     let tenCumRap = cumrap.tenCumRap
     let diaChi = cumrap.diaChi
    //  .then(content =>{
        res.json({
            statusCode : "200",
            message: "Xử lý thành công!",
            content:{
                thongTinPhim:{
                    maLichChieu,
                    tenCumRap,
                    tenRap,
                    diaChi,
                    tenPhim,
                    hinhAnh,
                    // maphim
                },
                danhSachGhe
            }
        })
    //  })
    // .catch(error =>{
    //     res.json({
    //         message: 'An error occured!'
    //     })
    // })
}

const ThemGhe = async (req,res, next) =>{
    let ghe = new Ghe({
        maGhe: req.body.maGhe,
        tenGhe: req.body.tenGhe,
        maRap: req.body.maRap,
        loaiGhe: req.body.loaiGhe,
        stt: req.body.stt,
        giaVe: req.body.giaVe,
    })
    ghe.save()
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

const ThemGhe_test = async (req,res, next) =>{
    let ghe = req.body.ghe
    Ghe.insertMany(ghe)
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

const DS_Ghe = async (req,res,next) =>{
    let ghe = await Ghe.find()
    let ids = await ghe.map(function(ghe){ return ghe._id })
    // .then(response =>{
        res.json({
            message: 'Store susccessful',
            ids
        })
    // })
    .catch(error =>{
        res.json({
            message: 'An error occured!',
            message: 'Cannot store the movie'
        })
    })
}

const ThemGheVaoRap = async (req,res,next) =>{
    let rapid = req.body.rapid
    let newghe = req.body.gheID
    let result = await Rap.findById(rapid);
    result.danhSachGhe.push({$each: newghe});
    await result.save()
    .then(()=>{
        res.json({
            message: 'Thêm Ghế Thành Công'
        })
     })
    .catch(error =>{
        res.json({
            message: 'An error occured!'
        })
    })
}

const DatVe = async (req,res,next) =>{
    let maGhe_sum = 0
    let ghe_array=[]
    let giaVe = 0
    check = 0;
    check_token = 1;
    check_3 = 0
    let maLichChieu =  req.body.maLichChieu
    let danhSachVe  = req.body.danhSachVe 
    const token = req.headers.authorization.split(' ')[1]
    if(!token){
        res.json({
            message: "You are not Authorization"
        })
        check_token = 0
    }
    if(check_token){
    const decode = jwt.verify(token, 'abc')
    // let ghe = danhSachVe[0]
    // let maGhe = ghe.maGhe
    // let giaVe = ghe.giaVe
    req.user = decode
    if(!req.user){
        res.json({
            message: "You are not Authorization"
        })
    }else{
        // const lichchieu = await LichChieu.findOne({maLichChieu: maLichChieu})

        // let taiKhoanNguoiDung = req.user.taiKhoan
        // let updateGhe = {
        //     daDat: true,
        //     taiKhoanNguoiDat:  taiKhoanNguoiDung
        // }
        // const found_ghe = await Ghe.findOne({maGhe: maGhe}) 
        // let gheid = found_ghe._id
        // await Ghe.findByIdAndUpdate(gheid, {$set: updateGhe})
        // let date_ob = new Date();
        // let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        // let date = ("0" + date_ob.getDate()).slice(-2);
        // let year = date_ob.getFullYear();
        // let Ngay = month + "-" + date + "-" + year

        // let newVe = new Ve({
        //     maVe: maGhe,
        //     maGhe: maGhe,
        //     ngayDat: Ngay,
        //     giaVe: giaVe,
        //     taiKhoanNguoiDung: taiKhoanNguoiDung,
        //     maLichChieu: maLichChieu,
        //     maLoaiGhe: found_ghe.loaiGhe
        // })
        // await newVe.save()
        // const now_ve = await Ve.findOne({maVe: maGhe})
        // let ve_id = now_ve._id
        // let found_user = await User.findOne({taiKhoanNguoiDung: taiKhoanNguoiDung});
        // found_user.danhSachVe.push(ve_id)
        // await found_user.save()

        for (let i = 0; i < danhSachVe.length; i++) {
            let ghe = danhSachVe[i]
            let maGhe = ghe.maGhe
            maGhe_sum += ghe.maGhe
             giaVe =+ ghe.giaVe
            const lichchieu = await LichChieu.findOne({maLichChieu: maLichChieu})
        
                let taiKhoanNguoiDung = req.user.taiKhoan
                let updateGhe = {
                    daDat: true,
                    taiKhoanNguoiDat:  taiKhoanNguoiDung
                }
                const found_ghe = await Ghe.findOne({maGhe: maGhe})
                if(found_ghe.daDat){
                    check = 1;
                    break;
                }
                let gheid = found_ghe._id
                await Ghe.findByIdAndUpdate(gheid, {$set: updateGhe})
                ghe_array.push(gheid)   
        }
            let date_ob = new Date();
            let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            let date = ("0" + date_ob.getDate()).slice(-2);
            let year = date_ob.getFullYear();
            let Ngay = month + "-" + date + "-" + year
        let newVe = new Ve({
            maVe: maGhe_sum,
            ngayDat: Ngay,
            giaVe: giaVe,
            taiKhoanNguoiDung: req.user.taiKhoan,
            maLichChieu: maLichChieu,
            danhSachGhe: ghe_array
        })
        await newVe.save()
        const now_ve = await Ve.findOne({maVe: maGhe_sum})
                let ve_id = now_ve._id
                let found_user = await User.findOne({taiKhoan: req.user.taiKhoan});
                found_user.danhSachVe.push(ve_id)
                await found_user.save()
        if(check){
            res.json({
                message: 'Ghế sau đã có người đặt: '
            })
            check_3 = 1
        }
        if(!check){
        // then(response =>{
            res.json({
                statusCode: 200,
                message: "Xử lý thành công!",
                content: "Đặt vé thành công!"
            })
        // })
        }else{
        // .catch(error =>{
            if(!check_3)
            res.json({
                message: 'An error occured!',
                message: 'Cannot store the movie'
            })
        // })
        }
    }
    }
}





module.exports = {
    LayDanhSachPhongve, ThemGhe, ThemGhe_test, DS_Ghe, ThemGheVaoRap, DatVe
}