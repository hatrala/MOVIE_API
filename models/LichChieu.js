const mongoose = require('mongoose')
const Schema = mongoose.Schema

const lichChieuSchema = new Schema({
    maNhom:{
        type: String
    },
    maLichChieu:{
        type: Number,
        required: true
    },
    maHeThongRap:{
        type: String
    },
    maCumRap:{
        type: Number
    },
    maRap:{
        type: Number
    },
    tenRap:{
        type: String
    },
    ngayChieuGioChieu:{
        type: Date
    },
    giaVe:{
        type: Number
    },
    thoiLuong:{
        type: Number
    },
    maphim:{
        type: Number
    }
})

const LichChieu = mongoose.model('lichchieu', lichChieuSchema)

module.exports = LichChieu