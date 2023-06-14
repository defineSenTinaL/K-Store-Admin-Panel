const mongoose = require('mongoose')
const Schema = mongoose.Schema

const customerCareSchema = new Schema({

    userID: {
        type: String,
        required: true
    },

}, {timestamps: true})

const CustomerCare = mongoose.model('CustomerCare', customerCareSchema)
module.exports = CustomerCare