const { response } = require('express')
const HeThongRap = require("../models/HeThongRap")
const Rap = require("../models/Rap")
const CumRap = require("../models/CumRap")
const LichChieu = require("../models/LichChieu")
const Phim = require('../models/Phim')
const Banner = require('../models/Banner')
const multer = require('multer')
const heThongRapChieu = require('../models/HeThongRapChieu')
const CumRapChieu = require('../models/CumRapChieu')
const upload = multer({dest: 'uploads/'})
const imageMimeTypes = ['image/png', 'image/jpg'];

// function arrayRemove(arr, value) { 
    
//     return arr.filter(function(ele){ 
//         return ele != value; 
//     });
// }


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
    .populate({
        path: 'heThongRapChieu', 
        populate: {
          path: 'cumRapChieu',
          populate: {
              path: 'lichChieuPhim'
          }
        }
      })
    // .heThongRapChieu.populate('cumRapChieu')
    // .CumRapChieu.populate('lichChieuPhim')
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
    let HeThongRapID = req.body.heThongRapID
    // let CumRapID = req.body.CumRapID
    // let LichChieuID = req.body.LichChieuID
    // let heThongRapChieu = req.body.heThongRapID
    // let newRap = req.body.RapID
    let result = await Phim.findOne({maPhim: MaPhim});
    result.heThongRapChieu.push({$each: HeThongRapID});
    // result.heThongRapChieu.cumRapChieu.push(CumRapID);
    // result.heThongRapChieucumRapChieu.lichChieuPhim.push( LichChieuID);
     await result.save()
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

const LayThongTinLichChieu = async (req, res, next) =>{
    let phimID = req.query.maPhim
    let lc = null
    let c = 0
    let check = 0;
    if(1){
        let found_phim = await  Phim.findOne({maPhim: phimID})
    // .populate({
    //     path: 'heThongRapChieu', 
    //     populate: {
    //       path: 'cumRapChieu',
    //       populate: {
    //           path: 'lichChieuPhim'
    //       }
    //     }
        // })
        let heThongRapChieu =[]
        let found_heThongRap = await HeThongRap.find()
        for(let i = 0; i< found_heThongRap.length;i++){
            let hethong = found_heThongRap[i]
            let found_cumRap = await CumRap.find({$and:[{danhSachPhim:  found_phim._id},{maHeThongRap: hethong.maHeThongRap}]}).populate('lichChieuPhim')
            if(found_cumRap){
                for( let j  = 0; j< found_cumRap.length; j++){
                    let cum = found_cumRap[j]
                    let lich = found_cumRap[j].lichChieuPhim
                    for( let k =0; k< found_cumRap[j].lichChieuPhim.length; k++ ){
                         lc = lich[k];
                         let ma = lc.maphim
                        if(ma != found_phim.maPhim ){
                            found_cumRap[j].lichChieuPhim.splice(k, 1);
                            // delete found_cumRap[j].lichChieuPhim[k];
                            k--
                            // found_cumRap[j].lichChieuPhim.length = arrayRemove(found_cumRap[j].lichChieuPhim.length, k)
                        }
                    }
                    // found_cumRap[j].lichChieuPhim = lich
                     c = 1
                }
                if(c==1){
                heThongRapChieu.push({
                    maHeThongRap: hethong.maHeThongRap,
                    tenHeThongRap: hethong.tenHeThongRap,
                    logo: hethong.logo,
                    cumRapChieu: found_cumRap,
                })
            }
                
            }
            
        }
        // let cumRapChieu = []
        // let lichchieu = []
        // let found_lichChieu = await LichChieu.find({maPhim: found_phim.maPhim})
        
        // let maphim = found_phim.maPhim
        // let heThongRapChieu = found_phim.heThongRapChieu
        // let cumRapChieu = heThongRapChieu.cumRapChieu
        
        // for(let i=1; i< lichChieuPhim.length;i++){
        //     let lichChieuPhim = cumRapChieu.lichChieuPhim
        //     let found_lichChieu = lichChieuPhim[i]
        //     if(found_lichChieu.maPhim != maphim ){
        //         lichChieuPhim.splice(i, 1);
        //     }
        // }
        //  found_phim.heThongRapChieu.cumRapChieu.lichChieuPhim = lichChieuPhim
        //  for( let j = 1; j< cumRapChieu.length;j++){
        //      let found_cumRap = cumRapChieu[j]
        //      let ds = found_cumRap.danhSachPhim
        //      for(let k = 1; k< ds.length;k++){
        //          if(ds[i] = found_phim._id){
        //              check = 1
        //          }
        //      }
        //      if(!check){
        //         cumRapChieu.splice(j, 1);
        //     }
        //  }
    
      
    // .heThongRapChieu.populate('cumRapChieu')
    // .CumRapChieu.populate('lichChieuPhim')
    // .then(content =>{
        // let heThongRapChieu = result.heThongRapChieu
        res.json({
            statusCode : "200",
            message: "Xử lý thành công!",
            content:{
                maPhim: found_phim.maPhim,
                tenPhim: found_phim.tenPhim,
                biDanh: found_phim.biDanh,
                trailer: found_phim.trailer,
                hinhAnh: found_phim.hinhAnh,
                moTa: found_phim.moTa,
                hot: found_phim.hot,
                dangChieu: found_phim.dangChieu,
                sapChieu: found_phim.sapChieu,
                ngayKhoiChieu: found_phim.ngayKhoiChieu,
                danhGia: found_phim.danhGia,
                heThongRapChieu
            }
        })
    // })
    // .catch(error =>{
    //     res.json({
    //         phimID,
    //         message: 'An error occured!',
    //         message: 'Cannot show the movie'
    //     })
    // })
}else{
    let result = await  
    Phim.find()
    .populate({
        path: 'heThongRapChieu', 
        populate: {
          path: 'cumRapChieu',
          populate: {
              path: 'lichChieuPhim'
          }
        }
      })
      
    // .heThongRapChieu.populate('cumRapChieu')
    // .CumRapChieu.populate('lichChieuPhim')
    .then(result =>{
        let heThongRapChieu = result.heThongRapChieu
        res.json({
            statusCode : "200",
            message: "Xử lý thành công!",
            content :{
                heThongRapChieu
            }
        })
    })
    .catch(error =>{
        res.json({
            message: 'An error occured!',
            message: 'Cannot show the movie'
        })
    })
}
    }
    

module.exports = {
    LayDanhSachPhim, LayThongTinPhim, LayThongTinPhimBangTen, ThemPhim, update, destroy, updateHinh, updateTrailer, LayThongTinPhimTheoNgay, 
    LayDanhSachBanner, ThemBanner, ThemLichChieuVaoPhim,
    ThemLichChieu, LayThongTinLichChieu
}