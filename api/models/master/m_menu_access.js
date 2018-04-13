const mongoose = require('mongoose');

const menuAccessSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    mRoleId: { type: String, required: true },
    mMenuId: { type: String, required: true },
    isDelete : { type: Boolean, required: true, default: 0 },
    createdBy : { type: String, required: true },
    createdDate : { type: Date, required: true, trim: true, default: Date.now() },
    updatedBy : { type: String, required: false },
    updatedDate : { type: Date, required: false, trim: true }
})
module.exports = mongoose.model('MenuAccess', menuAccessSchema, 'menuaccesses');
