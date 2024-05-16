const Admin = require('../models/adminModel')
const authService = require('./authService')

const createAdmin = async (admin) => {;
    try {
        const returnedData = await authService.createUser(admin.personalEmail, admin.nic, "Admin");
        if (returnedData.success) {
            const newAdmin = new Admin({
                fullName: admin.fullName,
                empID: admin.empID,
                nic: admin.nic,
                personalEmail: admin.personalEmail,
                phone: admin.phone,
                address: admin.address,
                dob: admin.dob,
                user: returnedData.user._id
            })
            try {
                const createdAdmin = await newAdmin.save();
                if (createdAdmin) {
                    return {success: true, message: "Admin is registered successfully.", admin: createdAdmin };
                } else {
                    return {success: false, message: "Failed to create admin."};
                }
            } catch {
                return {success: false, message: "Failed to create admin."};
            }
        } else {
            return { success: false, message: "Failed to create user." };
        }
        
    } catch (err) { 
        return { success: false, message: "Failed to create user." };
    }
}

const getAdmins = async () => {
    try {
        const admins = await Admin.find();
        if (admins) {
            return {success: true, message: "Admins are retrieved successfully.", admins: admins};
        } else {
            return {success: false, message: "Failed to retrieve admins."};
        }
    } catch (error) {
        return {success: false, message: "Failed to retrieve admins."};
    }
}

const getAdminByID = async (id) => { 
    try {
        const admin = await Admin.findById(id);
        if (admin) {
            return {success: true, message: "Admin is retrieved successfully.", admin: admin};
        } else {
            return {success: false, message: "Failed to retrieve admin."};
        }
    } catch (error) {
        return {success: false, message: "Failed to retrieve admin."};
    }
}

const findByUserID = async (userID) => {
    try {
        const admin = await Admin.findOne({ user: userID });
        if (admin) {
            return {success: true, message: "Admin is retrieved successfully.", admin: admin};
        } else {
            return {success: false, message: "Failed to get admin."};
        }
    } catch (error) {
        return {success: false, message: "Failed to retrieve student."};
    }
}

const updateAdmin = async (id, updatedData) => { 
    const updatedAdmin = {
        fullName: updatedData.fullName,
        nameWithInitials: updatedData.nameWithInitials,
        empID: updatedData.empID,
        nic: updatedData.nic,
        personalEmail: updatedData.personalEmail,
        universityEmail: updatedData.universityEmail,
        phone: updatedData.phone,
        address: updatedData.address,
        dob: updatedData.dob
    }
    try {
        const admin = await Admin.findByIdAndUpdate(id, updatedAdmin, { new: true });
        if (admin) {
            return {success: true, message: "Admin is updated successfully.", admin: admin};
        } else {
            return {success: false, message: "Failed to update admin."};
        }
    } catch (error) {
        return {success: false, message: "Failed to update admin."};
    }
}

const deleteAdmin = async (id) => { 
    try {
        const admin = await Admin.findByIdAndDelete(id);
        if (admin) {
            return {success: true, message: "Admin is deleted successfully.", admin: admin};
        } else {
            return {success: false, message: "Failed to delete admin."};
        }
    } catch (error) {
        return {success: false, message: "Failed to delete admin."};
    }
}

const getAllNotifications = async (id) => {
    try {
        const admin = await Admin.findById(id);
        console.log(admin)
        const seenNotification = admin.seenNotification;
        const notification = admin.notification;
        seenNotification.push(...notification);
        admin.notification = []
        //admin.seenNotification = notification;
        const updateAdmin = await admin.save();
        if (updateAdmin) {
            return { success: true, message: "All notification marked as read.", admin: updateAdmin };
        } else {
            return { success: false, message: "Failed to update admin." };
        }
    } catch (err) {
        return { success: false, message: "Failed to get notifications." };
    }
}

const setNotification = async (id, notification) => { 
    try {
        const admin = await Admin.findById(id);
        console.log(admin);
        const notify = admin.notification;
        notify.push(notification);
        const updateAdmin = await admin.save();
        if (updateAdmin) {
            return { success: true, message: "Notification is sent." };
        } else {
            return { success: false, message: "Failed to update admin." };
        }
    } catch (error) {
        return { success: false, message: "Failed to set notifications: ", error: error.message };
    }
}

module.exports = { createAdmin, getAdmins, getAdminByID, findByUserID, updateAdmin, deleteAdmin, getAllNotifications, setNotification };