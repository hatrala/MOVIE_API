const mongoose = require('mongoose')
const Schema = mongoose.Schema

const phimSchema = new Schema({
    TenPhim:{
        type: String
    },
    BiDanh:{
        type: String
    },
    MoTa: {
        type: String
    },
    Trailer: {
        type: String
    },
    HinhAnh: {
        type: String
    },
    MaNhom:{
        type: String
    },
    NgayKhoiChieu:{
        type: Date
    },
    SapChieu:{
        type: Boolean
    },
    DangChieu:{
        type: Boolean
    },
    Hot:{
        type: Boolean
    }
}, {timestamps: true})

const Phim = mongoose.model('phim', phimSchema)

module.exports = Phim
