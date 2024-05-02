const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');
const userRoleMiddleware = require('../middleware/userRoleMiddleware');

router.post('/create', leaveController.createLeave);
router.get('/get', leaveController.getLeaves);
router.get('/get/:id', leaveController.getLeaveById);
router.get('/get/my/:id', leaveController.getMyLeaves);
router.put('/update-status/:id', leaveController.updateLeaveStatus);
router.delete('/delete/:id', leaveController.deleteLeave);

module.exports = router;