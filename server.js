const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const phimRoute = require('./routes/phim')
const EmployeeRoute = require('./routes/employee')
const AuthRoute = require('./routes/auth')
mongoose.connect('mongodb+srv://hatrala:08072001@cluster0.n0kyj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.on('error', function(err){
    console.log('conection error',err);
})

db.once('open',()=>{
    console.log('Database Connection Established!')
})
const app = express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000

app.listen(PORT, () =>{
    console.log('Sever is running on port', {PORT})
})

app.use('/api/Quanlyphim', phimRoute)
app.use('/api/employee', EmployeeRoute)
app.use('/api', AuthRoute)
