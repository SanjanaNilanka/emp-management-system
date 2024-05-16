const { sendEmail } = require('../services/emailService');
const employeeService = require('../services/employeeService');

const addEmployee = async(req, res) => {
    const newEmp = req.body;
    try {
        const data = await employeeService.createEmployee(newEmp);
        if (data.success) { 
            res.status(200).json(data);
            sendEmail(newEmp.email, newEmp.empID, newEmp.fullName, newEmp.position)
        } else {
            res.status(400).json(data);
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Failed to register the employee, Error: ${error.message}`
        });
    }
}

const getEmployees = async (req, res) => {
    try {
        const data = await employeeService.getEmployees();
        if (data.success) { 
            res.status(200).json(data);
        } else {
            res.status(400).json(data);
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Failed to get data, Error: ${error.message}`
        });
    }
}

const getEmployee = async (req, res) => { 
    try {
        const id = req.params.id;
        const data = await employeeService.getEmployeeByID(id);
        if (data.success) { 
            res.status(200).json(data);
        } else {
            res.status(400).json(data);
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Failed to get data, Error: ${error.message}`
        });
    }
}

const findEmployeeByUserID = async (req, res) => { 
    try {
        const id = req.params.id;
        const data = await employeeService.findByUserID(id);
        if (data.success) { 
            res.status(200).json(data);
        } else {
            res.status(400).json(data);
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Failed to get data, Error: ${error.message}`
        });
    }
}

const updateEmployee = async (req, res) => { 
    try {
        const id = req.params.id;
        const updatedEmp = req.body;
        const data = await employeeService.updateEmployee(id, updatedEmp);
        if (data.success) { 
            res.status(200).json(data);
        } else {
            res.status(400).json(data);
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Failed to get data, Error: ${error.message}`
        });
    }
}

const deleteEmployee = async (req, res) => { 
    try {
        const id = req.params.id;
        const data = await employeeService.deleteEmployee(id);
        if (data.success) { 
            res.status(200).json(data);
        } else {
            res.status(400).json(data);
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Failed to get data, Error: ${error.message}`
        });
    }
}

const getAllNotificationsController = async (req, res) => { 
    try {
        const data = await employeeService.getAllNotifications(req.params.id);
        if (data.success) { 
            res.status(200).json(data);
        } else {
            res.status(400).json(data);
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Failed to get data, Error: ${error.message}`
        });
    }
}

const setNotificationsController = async (req, res) => { 
    const id = req.params.id;
    const notification = req.body;
    try {
        const data = await employeeService.setNotification(id, notification);
        if (data.success) { 
            res.status(200).json(data);
        } else {
            res.status(400).json(data);
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Failed to update the employee, Error: ${error.message}`
        });
    }
}

module.exports = {
    addEmployee,
    getEmployees,
    getEmployee,
    findEmployeeByUserID,
    updateEmployee,
    deleteEmployee,
    getAllNotificationsController,
    setNotificationsController
}