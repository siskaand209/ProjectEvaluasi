const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    code: { type: String, required: true },
    name: { type: String, required: true },
    controller: { type: String, required: true},
    parentId: { type: String },
    isDelete:  { type: Boolean, required: true, default: 0 },
    createdBy : { type: String, required: false },
    updatedBy : { type: String},    
},
{timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate'}}
)

module.exports = mongoose.model('Menu', menuSchema, 'menus');
