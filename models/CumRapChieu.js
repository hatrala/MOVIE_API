const mongoose = require('mongoose')
const Schema = mongoose.Schema

const  cumRapChieuSchema = new Schema({
    maHeThongRap:{
        type: String,
        // required: true
    },
    maCumRap:{
        type: String,
        required: true,
        unique: true
    },
    tenCumRap:{
        type: String,
        required: true
    },
    diaChi:{
        type: String,
        required: true
    },
    lichChieuPhim:[
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'lichchieu'
        }
    ]
},{timestamps: true})

const CumRapChieu = mongoose.model('CumRapChieu', cumRapChieuSchema)

module.exports = CumRapChieu
