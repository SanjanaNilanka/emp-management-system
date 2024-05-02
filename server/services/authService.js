const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const jwtSecret = config.auth.jwtSecret

const createUser = async(email, password, role) => {
    const user = await User.findOne({ email: email });
    if (user) {
        return {success: false, message: "Email already exists."};
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        email: email,
        password: hashedPassword,
        role: role
    });
    try {
        const createdUser = await newUser.save();
        return { success: true, message: "User is registered successfully.", user: createdUser };
        
    } catch (err) { 
        return {success: false, message: "Failed to register the user."};
    }
}

const authentcateUser = async(email, password) => {
    const user = await User.findOne({ email: email });
    if (!user) {
        return {success: false, message: "Email does not exist."};
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return {success: false, message: "Password does not match."};
    }

    const token = jwt.sign({ userID: user._id, role: user.role }, jwtSecret, { expiresIn: '10h' })

    
    
    return {
        success: true,
        message: 'Login successful',
        token: token
    };
}

const getUserByID = async(userID) => {
    const user = await User.findById(userID); 
    if (!user) {
        return {success: false, message:"User does not exist."};
    }

    return {
        success: true,
        message: "User is retrieved successfully.",
        user: user
    };
}

const updateUser = async (userID, email, role) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(userID, { email: email, role: role }, { new: true });
        if (!updatedUser) {
            return {success: false, message: "User not found."};
        }
        return {success: true, message: "User is updated successfully."};
    } catch {
        return {success: false, message: "Failed to update the user."};
    }
   
}

const updateUserPassword = async (userID, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const updatedUser = await User.findByIdAndUpdate(userID, { password: hashedPassword }, { new: true });
        if (!updatedUser) {
            return {success: false, message: "User not found."};
        }
        return {success: true, message: "Password is updated successfully."};
    } catch {
        return {success: false, message: "Failed to update the password."};
    }
   
}

const verifyPasswordByID = async(userID, password) => {
    const user = await User.findById(userID);
    if (!user) {
        return {success: false, message: "User does not exist."};
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
        return {success: false, message: "Password does not match."};
    } else if (isMatch) {
        return {
            success: true,
            message: 'Password is correct!',
        };
    }
    
    
    
}

const userDeleteByID = async (userID) => { 
    try {
        const deletedUser = await User.findByIdAndDelete(userID);
        if (!deletedUser) {
            return {success: false, message: "User not found."};
        }
        return {success: true, message: "User is deleted successfully."};
    } catch {
        return {success: false, message: "Failed to delete the user."};
    }
}

module.exports = { createUser, getUserByID, authentcateUser, updateUser, updateUserPassword, verifyPasswordByID, userDeleteByID };