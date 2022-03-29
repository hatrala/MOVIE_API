const express = require('express')
const mongoose = require('mongoose')
const cors=require("cors");
const morgan = require('morgan')
const bodyParser = require('body-parser')
const phimRoute = require('./routes/phim')
const EmployeeRoute = require('./routes/employee')
const AuthRoute = require('./routes/auth')
const UserRoute = require('./routes/user')
const NoteRoute = require('./routes/note')
const HeThongRapRoute = require('./routes/hethongrap')
mongoose.connect('mongodb+srv://hatrala:08072001@cluster0.n0kyj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.on('error', function(err){
    console.log('conection error',err);
})

db.once('open',()=>{
    console.log('Database Connection Established!')
})
const app = express()

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}


app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000

app.listen(PORT, () =>{
    console.log('Sever is running on port', {PORT})
})


app.use(cors(corsOptions)) // Use this after the variable declaration
app.use('/api/Quanlyphim', phimRoute)
app.use('/api/QuanLyRap', HeThongRapRoute)
app.use('/api/employee', EmployeeRoute)
app.use('/api', AuthRoute)
app.use('/user', UserRoute)
app.use('/note', NoteRoute)
