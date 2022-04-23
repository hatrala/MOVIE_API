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
    }
},{timestamps: true})

const HeThongRap = mongoose.model('hethongrap', heThongRapSchema)
module.exports = HeThongRap