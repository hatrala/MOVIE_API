const mongoose = require('mongoose')
const Schema = mongoose.Schema

const lichChieuSchema = new Schema({
    maLichChieu:{
        type: Number,
        required: true
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
    }
})

const LichChieu = mongoose.model('lichchieu', lichChieuSchema)

module.exports = LichChieu