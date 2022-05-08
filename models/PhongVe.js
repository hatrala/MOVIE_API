const mongoose = require('mongoose')
const Schema = mongoose.Schema

const phongVeSchema = new Schema({
    thongTinPhim:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'lichchieu'
    },
    danhSachGhe:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Ghe'
    }
},{timestamps: true})

const phongVe = mongoose.model('PhongVe', phongVeSchema)

module.exports = phongVe