const express  = require('express')
const router = express.Router()

const UserController = require('../controllers/UserController')
const authenticate = require('../middlewave/authenticate')

router.get('/', authenticate.authenticate, UserController.LayDanhSachUser)
router.delete('/:id', authenticate.verifyTokenAndAdminAuth, UserController.deleteUser)

module.exports = router