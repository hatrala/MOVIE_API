const jwt = require('jsonwebtoken')
const router = require('../routes/auth')
const { route } = require('../routes/auth')

const authenticate = (req, res, next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'abcdefg')

        req.user = decode
        next()

    }
    catch(error){
        res.json({
            message: 'authentication fail'
        })
    }
}

module.exports = authenticate
