const mongoose = require('mongoose')
const Schema = mongoose.Schema

const  cumRapSchema = new Schema({
    maHeThongRap:{
        type: String,
        required: true
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
    danhSachRap:[
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Rap'
        }
    ],
    lichChieuPhim:[
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'lichchieu'
        }
    ],
    danhSachPhim:[
        {
            
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'phim'
            
        }
    ]
},{timestamps: true})

const CumRap = mongoose.model('CumRap', cumRapSchema)

module.exports = CumRap

