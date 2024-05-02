const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const userRoleMiddleware = require('../middleware/userRoleMiddleware');

router.post('/create', notificationController.sendNotification);
router.get('/get', notificationController.getNotification);
router.get('/get/:id', notificationController.getNotificationById);
router.put('/update/:id', notificationController.updateNotification);
router.delete('/delete/:id', notificationController.deleteNotification);

module.exports = router;