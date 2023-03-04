const mongoose = require('mongoose')
const Schema = mongoose.Schema

const couponSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    slug: {
        type: String,
        required: true
    },

    code: {
        type: String,
        required: true
    },

    bank: {
        type: String,
        required: true
    },

    percent: {
        type: String,
        required: true
    }
})

const Coupon = mongoose.model('Coupon', couponSchema)
module.exports = Coupon