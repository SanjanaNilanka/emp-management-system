const leaveService = require('../services/leaveService');
const {setNotification} = require('../services/employeeService');

const createLeave = async (req, res) => {
    try {
        const data = await leaveService.createLeave(req.body);
        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(400).json(data);
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

const getLeaves = async (req, res) => { 
    try {
        const data = await leaveService.getLeaves();
        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(400).json(data);
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

const getLeaveById = async (req, res) => { 
    try {
        const data = await leaveService.getLeaveByID(req.params.id);
        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(400).json(data);
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

const getMyLeaves = async (req, res) => { 
    try {
        const data = await leaveService.getMyLeaves(req.params.id);
        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(400).json(data);
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

const updateLeaveStatus = async (req, res) => { 
    const notification = {
        title: "Leave Request",
        description: "",
    }
    console.log(req.body.status);
    if (req.body.status == 'Approved') {
        notification.description = "Your leave request has been approved."
    } else if (req.body.status == 'Rejected') {
        notification.description = "Your leave request has been rejected."
    }
    try {
        const data = await leaveService.updateLeaveStatus(req.params.id, req.body);
        if (data.success) {
            setNotification(data.leave.employee, notification);
            res.status(200).json(data);
        } else {
            res.status(400).json(data);
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

const deleteLeave = async (req, res) => { 
    try {
        const data = await leaveService.deleteLeave(req.params.id);
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
    createLeave,
    getLeaves,
    getLeaveById,
    getMyLeaves,
    updateLeaveStatus,
    deleteLeave
}