const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    code : {type: String, required: true, trim: true},
    name : {type: String, required: true, trim: true},
    description: {type: String, required: false, trim: true},
    isDelete: {type: Boolean, required: true, default: false},
    createdBy: {type: String, required: true, trim: true},
    createdDate: {type: Date, required: true, default: Date.now()},
    updatedBy: {type: String, required: false, trim: true},
    updatedDate: {type: Date, required: false}
})

module.exports = mongoose.model('Product', productSchema, 'products');