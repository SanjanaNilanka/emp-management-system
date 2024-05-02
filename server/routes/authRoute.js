const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/logout', authController.logoutUser);
router.get('/logged-user', authMiddleware.getLoggedUserMiddleware, authController.getLoggedUser);
router.get('/logged-user-role', authMiddleware.getLoggedUserMiddleware, authController.getloggedUserRole);

router.put('/update-user/:id', authController.updateUser);
router.put('/change-password/:id', authMiddleware.changePasswordMiddleware, authController.changePassword);
router.put('/admin/change-password/:id', authController.changePassword);

router.delete('/delete-user', authController.deleteUser);

module.exports = router;