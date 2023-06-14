const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema ({

    parentID: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    brand: {
        type: String,
        required: true
    },

    quantity: {
        type: String,
        required: true
    },

    mrp: {
        type: Number,
        required: true
    },

    msp: {
        type: Number,
        required: true
    },

    color: {
        type: String,
        required: true
    },

    style: {
        type: String,
        required: true
    },

    model: {
        type: String,
        required: true
    },

    gst: {
        type: String,
        required: true
    },

    //length - breath - height
    dimension: {
        type: Number,
        required: true
    },

    weight:{
        type: Number,
        required: true
    },

    asin: {
        type: String,
        required: true
    },

    // first clear this thing
    variation: {
        type: String,
        required: true
    },

    //all this star 1* 2* 3* 4* 5*
    rating: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    rrpolicy: {
        type: String,
        required: true
    },
    
    //bullet points
    bullet: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    }
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product