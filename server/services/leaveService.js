const leaveModel = require('../models/leaveModel');
const notificationService = require('./notificationService')
const empNotifications = require('./employeeService')
const emailService = require('./emailService')

const createLeave = async (leave) => { 
    try {
        const newLeave = new leaveModel({
            category: leave.category,
            startDate: leave.startDate,
            endDate: leave.endDate,
            reason: leave.reason,
            status: leave.status,
            user: leave.user,
            employee: leave.employee
        });
        const savedLeave = await newLeave.save();
        return {
            success: true,
            message: "Leave is created successfully.",
            leave: savedLeave
        }
    } catch (error) {
        return {
            success: false,
            message: "Failed to create leave." + error
        }
    }
}

const getLeaves = async () => { 
    try {
        const leaves = await leaveModel.find();
        return {
            success: true,
            message: "Leaves are retrieved successfully.",
            leaves: leaves
        }
    } catch (error) {
        return {
            success: false,
            message: "Failed to retrieve leaves." + error
        }
    }
}

const getLeaveByID = async (id) => { 
    try {
        const leave = await leaveModel.findById(id);
        return {
            success: true,
            message: "Leave is retrieved successfully.",
            leave: leave
        }
    } catch (error) {
        return {
            success: false,
            message: "Failed to retrieve leave." + error
        }
    }
}

const getMyLeaves = async (userID) => { 
    try {
        const leaves = await leaveModel.find({ user: userID });
        return {
            success: true,
            message: "Leaves is retrieved successfully.",
            leaves: leaves
        }
    } catch (error) {
        return {
            success: false,
            message: "Failed to retrieve leaves." + error
        }
    }
}

/*const updateNotification = async (id, updatedData) => {
    try {
        const notification = await notificationModel.findByIdAndUpdate(id, updatedData, { new: true });
        return {
            success: true,
            message: "Notification is updated successfully.",
            notification: notification
        }
    } catch (error) {
        return {
            success: false,
            message: "Failed to update notification." + error
        }
    }
}*/

const updateLeaveStatus = async (id, updatedData) => {
    const notification = {
        title: "Leave Request",
        description: "",
    }
    if (updatedData.status == 'Approved') {
        notification.description = "Your leave request has been approved."
    } else if (updatedData.status == 'Rejected') {
        notification.description = "Your leave request has been rejected."
    }
    try {
        const leave = await leaveModel.findByIdAndUpdate(id, updatedData);
        if (leave) {
            empNotifications.setNotification(id, notification)
        }
        return {
            success: true,
            message: "Leave is updated successfully.",
            leave: leave
        }
    } catch (error) {
        return {
            success: false,
            message: "Failed to update leave." + error
        }
    }
}

const deleteLeave = async (id) => { 
    try {
        const deletedLeave = await leaveModel.findByIdAndDelete(id);
        return {
            success: true,
            message: "Notification is deleted successfully.",
            deletedLeave: deletedLeave
        }
    } catch (error) {
        return {
            success: false,
            message: "Failed to delete notification." + error
        }
    }
}

module.exports = {
    createLeave,
    getLeaves,
    getLeaveByID,
    getMyLeaves,
    updateLeaveStatus,
    deleteLeave
}