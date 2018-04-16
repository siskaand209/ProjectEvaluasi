const mongoose = require('mongoose');

const menuAccessSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    mRoleId: { type: String, required: true },
    mMenuId: { type: String, required: true },
    isDelete: { type: Boolean, required: true, default: false },
    createdBy: { type: String, required: true, trim: true, },
    updatedBy: { type: String, required: false, trim: true },
},
{timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' }}
)

module.exports = mongoose.model('MenuAccess', menuAccessSchema, 'menuaccesses');
