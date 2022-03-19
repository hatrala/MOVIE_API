const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bannerSchema = new Schema({
    MaBanner:{
        type: Number
    },
    MaPhim:{
        type: Number
    },
    HinhAnh: {
        type: String
    }
}, {timestamps: true})

const Banner = mongoose.model('banner', bannerSchema)

module.exports = Banner
