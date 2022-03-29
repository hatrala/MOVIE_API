const Note = require('../models/Note')
const jwt = require('jsonwebtoken')

 const AddNote =(req, res, next) =>{
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'abc')
        req.user = decode
    let note = new Note({
        ownerID: req.user.id,
        title: req.body.title,
        content: req.body.content
    })
    note.save()
    .then(response =>{
        res.json({
            message: 'Store susccessful'
        })
    })
    .catch(error =>{
        res.json({
            message: 'An error occured!',
            message: 'Cannot store the movie'
        })
    })
}

const searchNoteByOwnerID =(req, res, next) =>{

        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'abc')
        req.user = decode
        
    Note.find({ownerID: req.user.id})
    .then(notes =>{
        res.json({
            notes
        })
    })
    .catch(error =>{
        res.json({
            message: 'An error occured!',
            message: 'Cannot show the movie'
        })
    })
}

const deleteNote = (req, res, next,) =>{

    let noteid = req.body.noteid
     Note.findByIdAndRemove(noteid)
     .then(()=>{
        res.json({
            message: 'Delete successful'
        })
    })
    .catch(error =>{
        res.json({
            message: 'An error occured!'
        })
    })
}


     


module.exports = {
    AddNote, searchNoteByOwnerID, deleteNote
}