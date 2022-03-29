const mongoose = require('mongoose')
const Schema = mongoose.Schema

const noteSchema = new Schema({
    ownerID: {
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    }
})

const Note =  mongoose.model('note', noteSchema)

module.exports = Note