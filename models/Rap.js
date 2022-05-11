const mongoose = require('mongoose')
const Schema = mongoose.Schema

const rapSchema = new Schema({
    maRap:{
        type: String,
        required: true,
        unique: true
    },
    tenRap:{
        type: String,
        required: true
    },
    cumRap:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'CumRap'
    },
    soGhe:{
        type: Number,
        default: 160
    }
},{timestamps: true})

const Rap  = mongoose.model('Rap', rapSchema)

module.exports = Rap