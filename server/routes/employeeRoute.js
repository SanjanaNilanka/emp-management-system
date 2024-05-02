const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const userRoleMiddleware = require('../middleware/userRoleMiddleware');

router.post('/create', employeeController.addEmployee);
router.get('/get', employeeController.getEmployees);
router.get('/get/:id', employeeController.getEmployee);
router.get('/get-by-user-id/:id', employeeController.findEmployeeByUserID);
router.put('/update/:id', employeeController.updateEmployee);
router.delete('/delete/:id', employeeController.deleteEmployee);

module.exports = router;