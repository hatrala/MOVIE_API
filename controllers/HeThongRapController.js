const HeThongRap = require("../models/HeThongRap")
const Rap = require("../models/Rap")
const CumRap = require("../models/CumRap")
const LichChieu = require("../models/LichChieu")

const LayThongTinHeThongRap = (req, res, next) =>{
    let maHeThongRap = req.body.maHeThongRap
    if(!maHeThongRap){
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
    }else{
        HeThongRap.find({maHeThongRap: maHeThongRap})
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

const ThemCumRap = (req,res,next) =>{
    let cumrap = new CumRap({
        maHeThongRap: req.body.maHeThongRap,
        maCumRap: req.body.maCumRap,
        tenCumRap: req.body.tenCumRap,
        diaChi: req.body.diaChi

    })
    cumrap.save()
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

const ThemRap = async (req,res,next) =>{
    let rap = new Rap({
        maRap: req.body.maRap,
        tenRap: req.body.tenRap,
        cumRap: req.body.cumRapID
    })
    rap.save()
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

const ThemRapVaoCum = async (req,res,next) =>{
    let CumRapID = req.body.CumRapID
    let newRap = req.body.RapID
     let result = await CumRap.findById(CumRapID);
    result.danhSachRap.push({$each: newRap});
    await result.save()
    .then(()=>{
        res.json({
            message: 'Thêm rạp thành công'
        })
     })
    .catch(error =>{
        res.json({
            message: 'An error occured!'
        })
    })
}   


const LayThongTinCumRap = (req, res, next) =>{
    CumRap.find()
    .populate('danhSachRap')
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

const LayThongTinCumRapTheoHeThong = (req, res, next) =>{
    let maHeThongRap = req.body.maHeThongRap
    if(!maHeThongRap){
        CumRap.find()
        .populate('danhSachRap')
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
    }else{
        CumRap.find({maHeThongRap: maHeThongRap})
        .populate('danhSachRap')
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
}


const LayThongTinLichChieuHeThongRap = async (req, res, next) =>{
    let maHeThongRap = req.query.maHeThongRap
    if(maHeThongRap){
    let found_cumrap = await CumRap.find({maHeThongRap: maHeThongRap})
    .populate('danhSachPhim')
    let lstCumRap = []
    for(let i = 0; i< found_cumrap.length; i++){
        let cumrap = found_cumrap[i]
        let danhSach_phim = cumrap.danhSachPhim
        let danhSachPhim =[]
        for(let j =0; j< danhSach_phim.length; j++){
            let phim = danhSach_phim[j]
            let maphim = phim.maPhim
            let lstLichChieuTheoPhim = await LichChieu.find({maPhim: maphim})
            danhSachPhim.push({
                maPhim: phim.maPhim,
              tenPhim: phim.tenPhim,
              hinhAnh: phim.hinhAnh,
              hot: phim.hot,
              dangChieu: phim.dangChieu,
              sapChieu: phim.sapChieu,
                lstLichChieuTheoPhim
            })
        }
        lstCumRap.push({
            danhSachPhim,
            cumrap
        })
    }

    // let danhSachPhim = await found_cumrap.danhSachPhim
    // .then(()=>{
        res.json({
            content:{
                lstCumRap
            }
        })
    // })
    // .catch(error =>{
    //     res.json({
    //         message: 'An error occured!'
    //     })
    // })
    }else{
        let content= []
        let found_heThongRap = await HeThongRap.find()
        for(let k = 0; k< found_heThongRap.length; k++){
            let heThong = found_heThongRap[k]
            let found_cumrap = await CumRap.find({maHeThongRap: heThong.maHeThongRap})
            .populate('danhSachPhim')
            let lstCumRap = []
            for(let i = 0; i< found_cumrap.length; i++){
                let cumrap = found_cumrap[i]
                let danhSach_phim = cumrap.danhSachPhim
                let danhSachPhim =[]
            for(let j =0; j< danhSach_phim.length; j++){
                let phim = danhSach_phim[j]
                let maphim = phim.maPhim
                let lstLichChieuTheoPhim = await LichChieu.find({maPhim: maphim})
                danhSachPhim.push({
                    maPhim: phim.maPhim,
                    tenPhim: phim.tenPhim,
                    hinhAnh: phim.hinhAnh,
                    hot: phim.hot,
                    dangChieu: phim.dangChieu,
                    sapChieu: phim.sapChieu,
                    lstLichChieuTheoPhim
            })
        }
        lstCumRap.push({
            danhSachPhim,
            cumrap
        })
    }
        content.push({
            lstCumRap,
            maHeThongRap: heThong.maHeThongRap,
            tenHeThongRap: heThong.tenHeThongRap,
            logo: heThong.logo,
            maNhom: heThong.maNhom
        })
    }
    res.json({
        content
        })
}
    
}

const UpdateThongTinCumRap =(req, res, next) =>{
    let cumRapID = req.body.cumRapID

    let updateData ={
        maHeThongRap: req.body.maHeThongRap,
        tenCumRap: req.body.tenCumRap,
        diaChi: req.body.diaChi

    }
    CumRap.findByIdAndUpdate(cumRapID, {$set: updateData})
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

const ThemPhimVaoHeThong = async (req,res,next) =>{
    let maHeThongRap = req.body.maHeThongRap
    let newPhim = req.body.phimID
     let result = await HeThongRap.findOne({maHeThongRap: maHeThongRap});
    result.danhSachPhim.push({$each: newPhim});
    await result.save()
    .then(()=>{
        res.json({
            message: 'Thêm Phim vào hệ thống thành công'
        })
     })
    .catch(error =>{
        res.json({
            message: 'An error occured!'
        })
    })
}

const ThemPhimVaoCum = async (req,res,next) =>{
    let maCum = req.body.maCum
    let newPhim = req.body.phimID
     let result = await CumRap.findOne({maCumRap: maCum})
    result.danhSachPhim.push({$each: newPhim});
    await result.save()
    .then(()=>{
        res.json({
            message: 'Thêm Phim vào hệ thống thành công'
        })
     })
    .catch(error =>{
        res.json({
            message: 'An error occured!'
        })
    })
}

module.exports = {
    LayThongTinHeThongRap, ThemHeThongRap,
    ThemCumRap, ThemRapVaoCum, LayThongTinCumRap,
    UpdateThongTinCumRap, ThemRap, LayThongTinCumRapTheoHeThong, LayThongTinLichChieuHeThongRap,
    ThemPhimVaoHeThong, ThemPhimVaoCum
}
