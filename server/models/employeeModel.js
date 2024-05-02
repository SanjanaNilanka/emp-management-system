const mongoose = require('mongoose');
const User = require('./userModel');

const employeeSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    empID: { type: String, required: true },
    nic: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String },
    phone: { type: String, required: true },
    workExperience: { type: String, required: true },
    marriageStates: { type: String, required: true },
    qualifications: [{
        qualification: { type: String },
        description: { type: String },
        achivedIn: { type: Date},
    }],
    gender: { type: String, required: true },
    startDate: { type: Date, required: true },
    dob: { type: Date },
    department: { type: String, required: true },
    position: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('employees', employeeSchema);