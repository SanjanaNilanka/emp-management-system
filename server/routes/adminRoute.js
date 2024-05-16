const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const userRoleMiddleware = require('../middleware/userRoleMiddleware');

router.post('/create', userRoleMiddleware.verifyAdminMiddleware, adminController.addAdmin);
router.get('/get', adminController.getAdmins);
router.get('/get/:id', adminController.getAdminByID);
router.get('/get-by-user/:id', adminController.getAdminByUserID);
router.put('/update/:id', adminController.updateAdmin);
router.delete('/delete/:id', adminController.deleteAdmin);
router.get('/get-notify/:id', adminController.getAllNotificationsController);
router.post('/set-notify/:id', adminController.setNotificationsController);

module.exports = router;