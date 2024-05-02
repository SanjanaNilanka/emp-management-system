const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    sendDate: { type: Date, default: Date.now() },
    to: { type: String, required: true }, 
    regarding: { type: String, required: true },
    leave: { type: mongoose.Schema.Types.ObjectId, ref: 'Leave' },
});

module.exports = mongoose.model('notifications', notificationSchema);