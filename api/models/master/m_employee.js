const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    code : {type: String, require: true},
    firstName : {type: String, require: true},
    lastName : {type: String, require: true},
    mCompanyId : {type: String, require:true},
    email : {type: String, require: true},
    isDelete : {type: Boolean, require: true, default: 0},
    createdBy : {type: String, require: true},
    createdDate : {type: Date, require: true, trim: true, default : Date.now() },
    updatedBy : {type: String, require: true },
    updatedDate : {type: Date, require: true, trim: true,}

});

module.exports = mongoose.model('Employee', employeeSchema, 'employees');