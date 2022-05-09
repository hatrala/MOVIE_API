const mongoose = require("mongoose")
const Schema = mongoose.Schema

const heThongRapSchema = new Schema({
    maHeThongRap:{
        type: String
    },
    tenHeThongRap:{
        type: String
    },
    biDanh:{
        type: String
    },
    logo:{
        type: String
    },
    cumRapChieu:[
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'CumRap'
        }
    ],
    danhSachPhim:
        [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'phim'
    }]
},{timestamps: true})

const HeThongRap = mongoose.model('hethongrap', heThongRapSchema)
module.exports = HeThongRap