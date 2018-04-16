const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    username: { type: String, required: true },
    password : { type: String, required: true },
    mRoleId :{ type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true},
    mEmployeeId: { type: String, required: true },
    isDelete : { type: Boolean, required: true, default: 0 },
    createdBy : { type: String, required: false },
    updatedBy : { type: String },
},
{timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate'}}
)
module.exports = mongoose.model('User', userSchema, 'users');