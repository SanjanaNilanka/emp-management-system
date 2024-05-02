const notificationService = require('../services/notificationService');

const sendNotification = async (req, res) => {
    try {
        const data = await notificationService.createNotification(req.body);
        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(400).json(data);
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

const getNotification = async (req, res) => { 
    try {
        const data = await notificationService.getNotifications();
        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(400).json(data);
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

const getNotificationById = async (req, res) => { 
    try {
        const data = await notificationService.getNotification(req.params.id);
        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(400).json(data);
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

const updateNotification = async (req, res) => { 
    try {
        const data = await notificationService.updateNotification(req.params.id, req.body);
        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(400).json(data);
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

const deleteNotification = async (req, res) => { 
    try {
        const data = await notificationService.deleteNotification(req.params.id);
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
    sendNotification,
    getNotification,
    getNotificationById,
    updateNotification,
    deleteNotification
}