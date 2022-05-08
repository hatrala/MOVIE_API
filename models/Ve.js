const mongoose = require ("mongoose")
const Schema    = mongoose.Schema

const veSchema = new Schema({
    maVe:{
        type: Number,
        unique: true
    },
    ngayDat:{
        type: Date
    },
    giaVe:{
        type: Number
    },
    taiKhoanNguoiDung:{
        type: String
    },
    maLichChieu:{
        type: Number
    },
    danhSachGhe:[{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Ghe'
    }]

},{timestamps: true})

const Ve = mongoose.model('Ve', veSchema)
module.exports = Ve