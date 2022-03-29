const mongoose = require ("mongoose")
const Schema    = mongoose.Schema

const datVeSchema = new Schema({
    Mave:{
        type: Number
    },
    MaGhe:{
        type: Number
    },
    NgayDat:{
        type: Date
    },
    GiaVe:{
        type: Schema.Types.Decimal128
    },
    TaiKhoanNguoiDung:{
        type: String
    },
    MaLichChieu:{
        type: Number
    },
    MaLoaiGhe:{
        type: Number
    },
    ChietKhau:{
        type: Number
    }

},{timestamps: true})

const Datve = mongoose.model('datve', bannerSchema)

module.exports = Datve