const HeThongRap = require("../models/HeThongRap")
const Rap = require("../models/Rap")
const CumRap = require("../models/CumRap")

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

module.exports = {
    LayThongTinHeThongRap, ThemHeThongRap,
    ThemCumRap, ThemRapVaoCum, LayThongTinCumRap,
    UpdateThongTinCumRap, ThemRap, LayThongTinCumRapTheoHeThong
}
