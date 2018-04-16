const mongoose = require ('mongoose');

const companySchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    code : {type : String, required : true},
    name : {type : String, required : true},
    adress : {type : String, required : true},
    phone : {type : String, required : true},
    email : {type : String, required : true},
    isDelete : {type : Boolean, required : true, default : 0},
    createdBy : {type : String, required : true, trim : true},
    createdDate : {type : Date, required : true, default : Date.now()},
    updatedBy : {type : String, required : false },
    updatedDate : {type : Date, required : false } 
},
{timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' }}
);

module.exports = mongoose.model('Company', companySchema, 'companies');