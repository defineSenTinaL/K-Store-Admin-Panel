const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    fname: {
        type: String, 
        required: true
    },

    lname: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    phone: {
        type: Number,
        required: true,
    },

    profilePhoto: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },
    
    orderDetail: {
        type: String,
        required: true
    },

    paymentMethod: {
        type: String,
        required: true
    },

    wishlist: {
        type: String,
        required: true,
    },

    cartValue: {
        type: String,
        required: true
    },

    language: {
        type: String,
        required: true
    },

    notification: {
        type: String,
        required: true
    },

    reviews: {
        type: String,
        required: true
    },

    coupon: {
        type: String,
        required: true
    },

    qA: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User