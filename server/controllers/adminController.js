const adminService = require('../services/adminService')

const addAdmin = async(req, res) => {
    const newAdmin = req.body;
    try {
        const data = await adminService.createAdmin(newAdmin);
        if (data.success) { 
            res.status(200).json(data);
        } else {
            res.status(400).json(data);
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Failed to register the admin, Error: ${error.message}`
        });
    }
}

const getAdmins = async (req, res) => { 
    try {
        const data = await adminService.getAdmins();
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

const getAdminByID = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await adminService.getAdminByID(id);
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

const deleteAdmin = async (req, res) => { 
    const id = req.params.id;
    try {
        const data = await adminService.deleteAdmin(id);
        if (data.success) { 
            res.status(200).json(data);
        } else {
            res.status(400).json(data);
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Failed to delete the admin, Error: ${error.message}`
        });
    }
}

const updateAdmin = async (req, res) => { 
    const id = req.params.id;
    const updatedAdmin = req.body;
    try {
        const data = await adminService.updateAdmin(id, updatedAdmin);
        if (data.success) { 
            res.status(200).json(data);
        } else {
            res.status(400).json(data);
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Failed to update the admin, Error: ${error.message}`
        });
    }
}

module.exports = {
    addAdmin,
    getAdmins,
    getAdminByID,
    deleteAdmin,
    updateAdmin
}