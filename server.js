const express = require('express')
const mongoose = require('mongoose')
const cors=require("cors");
const morgan = require('morgan')
const bodyParser = require('body-parser')
const phimRoute = require('./routes/phim')
const EmployeeRoute = require('./routes/employee')
const AuthRoute = require('./routes/auth')
const UserRoute = require('./routes/user')
const HeThongRapRoute = require('./routes/hethongrap')
const LichChieuRoute = require('./routes/lichchieu')
mongoose.connect('mongodb+srv://hatrala:08072001@cluster0.n0kyj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

// const GridFsStrorage = require('multer-gridfs-storage')
// const Grid = require('gridfs-stream')

db.on('error', function(err){
    console.log('conection error',err);
})

db.once('open',()=>{
    console.log('Database Connection Established!')
})

// conn.once('open',() =>{
//     let gfs = Grid(conn.db, mongoose.mongo)
//     gfs.collection('images')
// })

// const storage = new GridFsStorage({
//     url: 'mongodb+srv://hatrala:08072001@cluster0.n0kyj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
//     file: (req, file) => {
//       return new Promise((resolve, reject) => {
//           const filename = file.originalname;
//           const fileInfo = {
//             filename: filename,
//             bucketName: 'uploads'
//           };
//           resolve(fileInfo);
//       });
//     }
//   });

// const upload = multer({ storage})

const app = express()

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}


app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const PORT = process.env.PORT || 3001

app.listen(PORT, () =>{
    console.log('Sever is running on port', {PORT})
})


app.use(cors(corsOptions)) // Use this after the variable declaration
app.use('/api/Quanlyphim', phimRoute)
app.use('/uploads', express.static('uploads'))
app.use('/api/QuanLyRap', HeThongRapRoute)
app.use('/api/employee', EmployeeRoute)
app.use('/api/QuanLyNguoiDung', AuthRoute)
app.use('/user', UserRoute)
app.use('/QuanLyLichChieu', LichChieuRoute)
