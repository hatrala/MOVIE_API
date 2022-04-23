const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const res = require('express/lib/response')
// const { json } = require('express/lib/response')

const register = (req,res,next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if(err){
            res.json({
                error: err
            })
        }
        let user = new User ({
            email: req.body.email,
            password: hashedPass,
            admin: req.body.admin
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
    var useremail = req.body.taiKhoan
    var password = req.body.matKhau

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
                    const userid = user.id
                    let accessToken = jwt.sign({id: user.id, admin: user.admin}, 'abc', {})
                    res.json({
                        statusCode : "200",
                        message: "Login thành công!",
                        content:{
                            taiKhoan: "mrxadmin",
                            hoTen: "MRX",
                            email: "mrx112@gmail.com",
                            soDT: "0909009009",
                            maNhom: "GP00",
                            maLoaiNguoiDung: "QuanTri",
                            userid,
                            accessToken
                        }
                    })
                }else{
                    res.json({
                        message: 'Password does not match!'
                    })
                }
            })
        }else{
            res.json({
                message: 'no user found'
            })
        }
    })

    


}
module.exports = {
    register, login
}