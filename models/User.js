const mongoose = require ("mongoose")
const Schema    = mongoose.Schema

const userSchema = new Schema({
    taiKhoan:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    matKhau:{
        type: String,
        required: true
    },
    hoTen:{
        type: String
    },
    soDT:{
        type: String
    },
    maNhom:{
        type: String
    },
    admin:{
        type: Boolean,
        default: false
    },
    danhSachVe:[{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Ve'
    }]
}, {timestamps:true})

const User = mongoose.model('User', userSchema)
module.exports = User
