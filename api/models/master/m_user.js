const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    username: { type: String, required: true },
    password : { type: String, required: true },
    m_role_id : { type: String, required: true },
    m_employee_id: { type: String, required: true },
    is_delete : { type: Boolean, required: true, default: 0 },
    created_by : { type: String, required: true },
    created_date : { type: Date, required: true, trim: true, default: Date.now() },
    updated_by : { type: String, required: true },
    update_date : { type: Date, required: true, trim: true, default: Date.now() }
});

module.exports = mongoose.model('User', userSchema, 'users');