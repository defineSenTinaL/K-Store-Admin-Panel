const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categoriesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    parentId: {
        type: String,
        required: true
    }
})

const Categories = mongoose.model('Categories', categoriesSchema)
module.exports = Categories
