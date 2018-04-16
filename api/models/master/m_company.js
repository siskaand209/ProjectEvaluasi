const mongoose = require ('mongoose');

const companySchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    code : {type : String, required : true},
    name : {type : String, required : true},
    adress : {type : String, required : true},
    phone : {type : String, required : true},
    email : {type : String, required : true},
    isDelete : {type : Boolean, required : true, default : 0},
    createdBy : {type : String, required : false, trim : true},
    createdDate : {type : Date, required : true, trim : true, default : Date.now()},
    updatedBy : {type : String, required : true},
    updatedDate : {type : Date, required : true, trim : true } 
});

module.exports = mongoose.model('Company', companySchema, 'companies');