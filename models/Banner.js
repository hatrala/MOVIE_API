const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bannerSchema = new Schema({
    maBanner:{
        type: Number
    },
    maPhim:{
        type: Number
    },
    hinhAnh: {
        type: String
    }
}, {timestamps: true})

const Banner = mongoose.model('banner', bannerSchema)

module.exports = Banner
