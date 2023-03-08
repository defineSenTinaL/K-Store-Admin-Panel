const { response } = require('express');

const express = require('express')
//const {default: slugify} = require('slugify')
const User = require('../models/User')

const registration = (req, res) => {
    let user = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        gender: req.body.gender
    })
    user.save()
    .then(response => {
        res.json({
            message: 'User addedd Succesfully'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error has Occured'
        })
    })
};

module.exports = { registration } 
