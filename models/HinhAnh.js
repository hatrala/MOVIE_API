const mongoose = require('mongoose')
const Schema = mongoose.Schema

const hinhAnhSchema = new Schema({
    maPhim:{
        type: Number
    },
    link: {
        type: String
    }
}, {timestamps: true})

const HinhAnh = mongoose.model('HinhAnh', hinhAnhSchema)

module.exports = HinhAnh
