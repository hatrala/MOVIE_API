const User = require('../models/User')

const LayDanhSachUser = (req, res, next) =>{
    User.find()
    .then(content =>{
        res.json({
            statusCode : "200",
            message: "Xử lý thành công!",
            content
        })
    })
    .catch(error =>{
        res.json({
            message: 'An error occured!'
        })
    })
}

const deleteUser = (req, res, next) =>{
    
    User.findByIdAndRemove(req.params.id)
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
    LayDanhSachUser, deleteUser
}
