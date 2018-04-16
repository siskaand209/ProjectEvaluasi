const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    code : { type: String, required: true },
    name : { type: String, required: true },
    description : { type: String, required: true },
    isDelete : { type: Boolean, required: true, default: 0 },
    createdBy : { type: String, required: false, trim: true },
    updatedBy : { type: String, required: false, trim: true}
    },
    {timestamps : {createdAt : "createdDate", updatedAt : "updatedDate"}}
);

module.exports = mongoose.model('Role', roleSchema, 'roles');