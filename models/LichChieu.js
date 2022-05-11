const mongoose = require('mongoose')
const Schema = mongoose.Schema

const lichChieuSchema = new Schema({
    // maNhom:{
    //     type: String
    // },
    maLichChieu:{
        type: Number,
        required: true,
        unique: true
    },
    maHeThongRap:{
        type: String
    },
    maCumRap:{
        type: String
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
    },
    danhSachGhe:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ghe'
    }]
})

const LichChieu = mongoose.model('lichchieu', lichChieuSchema)

module.exports = LichChieu