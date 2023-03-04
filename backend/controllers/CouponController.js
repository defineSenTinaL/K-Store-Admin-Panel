const express = require('express')
const { default: slugify } = require('slugify');
const Coupon = require('../models/coupon')

const create = (req, res) => {
    let coupon = new Coupon({
        name: req.body.name,
        slug: slugify(req.body.code),
        code: req.body.code,
        bank: req.body.bank,
        percent: req.body.bank
    })
    coupon.save()
    .then(response => {
        res.json({
            message: 'Coupon added Succesfully'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error has Occured'
        })
    })
}

module.exports = { create }