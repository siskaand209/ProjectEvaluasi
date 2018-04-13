const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    username: { type: String, required: true },
    password : { type: String, required: true },
    mRoleId : { type: String, required: true },
    mEmployeeId: { type: String, required: true },
    isDelete : { type: Boolean, required: true, default: 0 },
    createdBy : { type: String, required: false },
    createdDate : { type: Date, required: true, trim: true, default: Date.now() },
    updatedBy : { type: String },
    updateDate : { type: Date }
});

module.exports = mongoose.model('User', userSchema, 'users');