const { response } = require('express')
const Product = require('../models/Product')

const add = (req, res) => {
    let product = new Product({
        parentID: req.body.parentID,
        name: req.body.name,
        brand: req.body.brand
    })
    product.save()
    .then(response => {
        res.json({
            message: 'Product addedd Succesfully'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error has Occured'
        })
    })
};

module.exports = { add }