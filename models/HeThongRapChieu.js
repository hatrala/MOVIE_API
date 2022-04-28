const mongoose = require("mongoose")
const Schema = mongoose.Schema

const heThongRapChieuSchema = new Schema({
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
            ref: 'CumRapChieu'
        }
    ]

},{timestamps: true})

const heThongRapChieu = mongoose.model('heThongRapChieu', heThongRapChieuSchema)
module.exports = heThongRapChieu