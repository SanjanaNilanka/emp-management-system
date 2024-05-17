const mongoose = require('mongoose');

const attendenceSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  empID: { type:String },
  dateTime: { 
    type: Date, 
    default: function() {
      // Get current date and time
      const currentDate = new Date();
      // Adjust time to UTC+5:30
      currentDate.setHours(currentDate.getHours() + 5);
      currentDate.setMinutes(currentDate.getMinutes() + 30);
      return currentDate;
    }
  }
});

module.exports = mongoose.model('attendences', attendenceSchema);