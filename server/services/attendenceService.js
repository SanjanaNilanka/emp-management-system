const Attendence = require('../models/attendenceModel')

const createAttendence = async(attendence) => {
  const newAttendence = new Attendence({
    employee: attendence.employee,
    empID: attendence.empID,
  });
  try {
    const createdAttendence = await newAttendence.save();
    return { success: true, message: "Attendence is created successfully.", attendence: createdAttendence };
      
  } catch (err) { 
    return {success: false, message: "Failed to create the attendence."};
  }
}

const getAttendences = async () => {
  try {
    const attendences = await Attendence.find();
    if (attendences) {
      return {success: true, message: "Attendences are retrieved successfully.", attendences: attendences};
    } else {
      return {success: false, message: "Failed to retrieve attendences."};
    }
  } catch (error) {
    return {success: false, message: "Failed to retrieve attendences."};
  }
}

module.exports = {
  createAttendence,
  getAttendences
}