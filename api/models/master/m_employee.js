const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    code : {type: String, require: true},
    firstName : {type: String, require: true},
    lastName : {type: String, require: true},
    mCompanyId : {type: mongoose.Schema.Types.ObjectId, ref: 'companys', require: true},
    email : {type: String, require: true},
    isDelete : {type: Boolean, require: true, default: 0},
    createdBy : {type: String, require: false, trim: true},
    updatedBy : {type: String, require: true },
},
{timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' }}
);

module.exports = mongoose.model('Employee', employeeSchema, 'employees');