const mongoose = require("mongoose")
const Schema = mongoose.Schema

const heThongRapSchema = new Schema({
    maHeThongRap:{
        type: String,
        required:true,
        unique: true
    },
    tenHeThongRap:{
        type: String,
        required:true
    },
    biDanh:{
        type: String
    },
    logo:{
        type: String,
        required:true
    },
    cumRapChieu:[
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'CumRap'
        }
    ]
    // ,
    // danhSachPhim:
    //     [{
    //         type: mongoose.SchemaTypes.ObjectId,
    //         ref: 'phim'
    // }]
},{timestamps: true})

const HeThongRap = mongoose.model('hethongrap', heThongRapSchema)
module.exports = HeThongRap