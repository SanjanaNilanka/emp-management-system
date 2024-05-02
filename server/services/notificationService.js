const notificationModel = require('../models/notificationModel');

const createNotification = async (notification) => { 
    try {
        if (notification.type === 'announcement' && notification.to === 'all') { 
            notification.regarding = null;
        }
        const newNotification = new notificationModel({
            title: notification.title,
            description: notification.description,
            sendBy: notification.sendBy,
            to: notification.to,
            type: notification.type,
            regarding: notification.regarding
        });
        const savedNotification = await newNotification.save();
        return {
            success: true,
            message: "Notification is created successfully.",
            notification: savedNotification
        }
    } catch (error) {
        return {
            success: false,
            message: "Failed to create notification." + error
        }
    }
}

const getNotifications = async () => { 
    try {
        const notifications = await notificationModel.find();
        return {
            success: true,
            message: "Notifications are retrieved successfully.",
            notifications: notifications
        }
    } catch (error) {
        return {
            success: false,
            message: "Failed to retrieve notifications." + error
        }
    }
}

const getNotification = async (id) => { 
    try {
        const notification = await notificationModel.findById(id);
        return {
            success: true,
            message: "Notification is retrieved successfully.",
            notification: notification
        }
    } catch (error) {
        return {
            success: false,
            message: "Failed to retrieve notification." + error
        }
    }
}

const updateNotification = async (id, updatedData) => {
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
}

const deleteNotification = async (id) => { 
    try {
        const deletedNotification = await notificationModel.findByIdAndDelete(id);
        return {
            success: true,
            message: "Notification is deleted successfully.",
            notification: deletedNotification
        }
    } catch (error) {
        return {
            success: false,
            message: "Failed to delete notification." + error
        }
    }
}

module.exports = {
    createNotification,
    getNotifications,
    getNotification,
    updateNotification,
    deleteNotification
}