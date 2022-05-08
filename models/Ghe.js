const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gheSchema = new Schema({
    maGhe:{
        type: Number,
        unique: true
    },
    tenGhe:{
        type: String,
        required: true
    },
    maRap:{
        type: Number,
        required: true
    },
    loaiGhe:{
        type: String,
        required: true
    },
    stt:{
        type: Number,
        required: true
    },
    giaVe:{
        type: Number,
        required: true
    },
    daDat:{
        default: false,
        type: Boolean,
        required: true
    },
    taiKhoanNguoiDat:{
        default: null,
        type: String
    }
},{timestamps: true})

const Ghe = mongoose.model('Ghe', gheSchema)

module.exports = Ghe