const express  = require('express')
const router = express.Router()

const NoteController = require('../controllers/NoteController')
const authenticate = require('../middlewave/authenticate')

router.post('/Add', NoteController.AddNote)
router.get('/search/', NoteController.searchNoteByOwnerID)
router.delete('/delete',authenticate.verifyDelete, NoteController.deleteNote)

module.exports = router