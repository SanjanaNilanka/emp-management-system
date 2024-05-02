const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    category: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    reason: { type: String, required: true },
    status: { type: String, default: 'Pending' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
});

module.exports = mongoose.model('leaves', leaveSchema);