const mongoose = require('mongoose')
const Schema = mongoose.Schema

const  cumRapSchema = new Schema({
    maHeThongRap:{
        type: String
    },
    tenCumRap:{
        type: String
    },
    diaChi:{
        type: String
    },
    danhSachRap:[
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Rap'
        }
    ]
},{timestamps: true})

const CumRap = mongoose.model('CumRap', cumRapSchema)

module.exports = CumRap

