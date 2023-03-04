const { response } = require('express')
const Employee = require('../models/Employee')

// Show the list of Employees
const index = (req, res, next) => {
    Employee.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occurred!'
        })
    })
}

//show single Employee
const show = (req, res, next) => {
    let employeeID = req.body.employeeID
    Employee.findById(employeeID)
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured'
        })
    })
}

// adding new employee
const store = (req, res, next) => {
    let employee = new Employee({
        name: req.body.name,
        email: req.body.email
    })
    employee.save()
    .then(response => {
        res.json({
            message: 'Employee addedd Succesfully'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error has Occured'
        })
    })
}

// update employee
const update = (req, res, next) => {
    let employeeID = req.body.employeeID

    let updateData = {
        name: req.body.name,
        email: req.body.email
    }
    Employee.findByIdAndUpdate(employeeID, {$set: updateData})
    .then(() => {
        res.json({
            message: 'Employee updated succesfully'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error has Occurred'
        })
    })
}

// delete an employee
const destroy = (req, res, next) => {
    let employeeID = req.body.employeeID
    Employee.findByIdAndRemove(employeeID)
    .then(() => {
        res.json({
            message: 'Employee Deleted Succefully'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error has Occurred'
        })
    })
}

module.exports = {
    index, show, store, update, destroy
}