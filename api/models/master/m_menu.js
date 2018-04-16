const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    code: { type: String, required: true },
    name: { type: String, required: true },
    controller: { type: String, required: true},
    parentId: { type: String },
    isDelete:  { type: Boolean, required: true, default: 0 },
    createdBy : { type: String, required: true },
    createdDate : { type: Date, required: true, trim: true, default: Date.now() },
    updatedBy : { type: String},
    updateDate : { type: Date, trim: true }
    
});

module.exports = mongoose.model('Menu', menuSchema, 'menus');
