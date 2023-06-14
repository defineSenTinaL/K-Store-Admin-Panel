const express = require('express')
const CustomerCare = require('../models/CustomerCare')

const create = (req, res) => {

    let Care = new CustomerCare({
        userID: req.body.userID
    })
    Care.save()
    .then(response => {
        res.json({
            message: 'Customer Query added Succesfully'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error has Occured'
        })
    })
}

module.exports = { create }