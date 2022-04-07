const mongoose = require('mongoose')
const Schema = mongoose.Schema

const phimSchema = new Schema({
    maPhim:{
        type: Number
    },
    tenPhim:{
        type: String
    },
    biDanh:{
        type: String
    },
    moTa: {
        type: String
    },
    maNhom:{
        type: String
    },
    trailer: {
        type: String
    },
    hinhAnh: {
        type: String
    },
    maNhom:{
        type: String
    },
    ngayKhoiChieu:{
        type: Date
    },
    danhGia:{
        type: Number
    },
    sapChieu:{
        type: Boolean
    },
    dangChieu:{
        type: Boolean
    },
    hot:{
        type: Boolean
    },
    image:{
        type: String
    }
}, {timestamps: true})

const Phim = mongoose.model('phim', phimSchema)

module.exports = Phim
