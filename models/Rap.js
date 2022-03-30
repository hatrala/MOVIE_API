const mongoose = require('mongoose')
const Schema = mongoose.Schema

const rapSchema = new Schema({
    maRap:{
        type: String
    },
    tenRap:{
        type: String
    },
    cumRap:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CumRap'
    }
},{timestamps: true})

const Rap  = mongoose.model('Rap', rapSchema)

module.exports = Rap