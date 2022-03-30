const jwt = require('jsonwebtoken')
const router = require('../routes/auth')
const { route } = require('../routes/auth')

const authenticate = (req, res, next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'abc')
        req.user = decode
        next()

    }
    catch(error){
        res.json({
            message: 'authentication fail'
        })
    }
}

const verifyTokenAndAdminAuth = (req, res, next) =>{
    authenticate(req, res, next, ()=>{
        if(req.user.id == req.user.params.id || req.user.admin){
            next();
        }
        else{
            res.json({
                message: "You are not Authorization"
            })
        }
    })
}

const verifyDelete = (req, res, next,) =>{
    const token = req.headers.authorization.split(' ')[1]
    const decode = jwt.verify(token, 'abc')
    req.user = decode
    let noteid = req.body.noteid
     Note.findById(noteid)
     .then(foundNote =>{
    if(foundNote.ownerID === req.user.id|| req.user.admin){
          next();
     }else{
        res.json({
            message: 'Bạn không có quyền xoá note này!'
        })
    }
   
})
}

module.exports = {authenticate, verifyTokenAndAdminAuth, verifyDelete}