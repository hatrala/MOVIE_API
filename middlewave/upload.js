const path = require('path') 
const multer = require('multer')
const fs = require("fs");

// const buffer = Buffer.from(hinhAnh, "hinhAnh");
//    file =   fs.writeFileSync("image", buffer);

var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, 'uploads/')
    },
    filename: function(req,file,cb) {
        let ext = path.extname(file.originalname)
        cb(null, Date.now() +ext)
    }
})

var upload = multer({

    storage: storage,
    fileFilter: function(req, file, callback) {
        if(
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ){
            callback(null,true)
        } else{
            console.log('Unsopported file type')
            callback(null, false)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 10
    }
})

module.exports = upload