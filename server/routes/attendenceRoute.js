const express = require('express');
const router = express.Router();
const attendenceController = require('../controllers/attendenceController');

router.post('/create', attendenceController.createAttendence);
router.get('/get', attendenceController.getAttendences);

module.exports = router;