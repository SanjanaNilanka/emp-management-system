const mongoose = require('mongoose');
const User = require('../models/userModel');

const adminSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    empID: { type: String, required: true },
    nic: { type: String, required: true },
    personalEmail: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String },
    dob: { type: Date },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports =  mongoose.model('admins', adminSchema);