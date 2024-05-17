const attendenceService = require('../services/attendenceService');

const createAttendence = async (req, res) => {
  try {
    const data = await attendenceService.createAttendence(req.body);
    if (data.success) {
      res.status(200).json(data);
    } else {
      res.status(400).json(data);
    }
  } catch (error) {
    res.status(400).json(error);
  }
}

const getAttendences = async (req, res) => { 
  try {
    const data = await attendenceService.getAttendences();
    if (data.success) {
      res.status(200).json(data);
    } else {
      res.status(400).json(data);
    }
  } catch (error) {
    res.status(400).json(error);
  }
}

module.exports = {
  createAttendence,
  getAttendences
}