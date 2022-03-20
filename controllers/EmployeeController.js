const { response } = require('express')
const Employee = require('../models/Employee')

// show list of Employees

const index = (req, res, next) =>{
    Employee.find()
    .then(response=>{
        res.json({
            response
        })
    })
    .catch(error =>{
        res.json({
            message: 'An error occured!'
        })
    })
}

// show single employee
const show =(req, res, next) =>{
    let employeeID = req.body.employeeID
    Employee.findById(employeeID)
    .then(response =>{
        res.json({
            response
        })
    })
    .catch(error =>{
        res.json({
            message: 'An error occured!'
        })
    })
}

// store employee
const store =(req, res, next) =>{
    let employee = new Employee({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    })
    employee.save()
    .then(response =>{
        res.json({
            message: 'Store susccessful'
        })
    })
    .catch(error =>{
        res.json({
            message: 'An error occured!'
        })
    })
}

// update employee

const update =(req, res, next) =>{
    let employeeID = req.body.employeeID

    let updateData ={
        name: req.body.name,
        email: req.body.emil,
        phone: req.body.phone,
        age: req.body.age
    }

    Employee.findByIDAndUpdate(employeeID, {$set: updateData})
    .then(()=>{
        res.json({
            message: 'Update successful'
        })
    })
    .catch(error =>{
        res.json({
            message: 'An error occured!'
        })
    })
}

// delete employee

const destroy = (req, res, next) =>{
    let employeeID = req.body.employeeID
    employeeID.findByIDAndRemove(employeeID)
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
    index, show, store, update, destroy
}