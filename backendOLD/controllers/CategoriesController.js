const express = require('express');
const { default: slugify } = require('slugify');
const Categories = require('../models/categories')


const create = (req, res) => {
    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name)
    }

    if(req.body.parentId){
        categoryObj.parentId = req.body.parentId;
    }

    const cat = new Categories(categoryObj);
    cat.save((error, Categories) => {
        if(error) return res.status(400).json({error});
        if(Categories){
            return res.status(201).json({Categories});
        }
    });
};

module.exports = { create }