const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const res = require('express/lib/response')
const { json } = require('express/lib/response')

const register = (req,res,next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if(err){
            res.json({
                error: err
            })
        }
        let user = new User ({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPass
        })
        user.save()
        .then(user =>{
            res.json({
                message: 'User added successful'
            })
        })
        .catch(error =>{
            res.json({
                message: 'An error occured!'
            })
        })
    })
}

const login = (req,res,next)=>{
    var useremail = req.body.useremail
    var password = req.body.password

    User.findOne({email: useremail})
    .then(user =>{
        if(user){
            bcrypt.compare(password, user.password, function(err, result){
                if(err){
                    res.json({
                        error: err
                    })
                }
                if(result){
                    let token = jwt.sign({email: useremail}, 'abcdefg', {})
                    res.json({
                        message: 'login successful',
                        token
                    })
                }else{
                    res.json({
                        message: 'Password does not match!'
                    })
                }
            })
        }else{
            res,json({
                message: 'no user found'
            })
        }
    })

    


}
module.exports = {
    register, login
}
