const userService = require('../services/authService')

const registerUser = async(req, res) => {
    const { email, password, role } = req.body;
    try {
        const data = await userService.createUser(email, password, role);
        if (data.success) { 
            res.status(200).json(data);
        } else {
            res.status(400).json(data);
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Failed to register the user, Error: ${error.message}`
        });
    }
}

const loginUser = async(req, res) => {
    const { email, password } = req.body;
    try {
        const data = await userService.authentcateUser(email, password);

        if (data.success) { 
            try {
                res.cookie('token', data.token, { httpOnly: true, secure: true, maxAge: 3600000 });
                res.status(200).json(data);
            } catch {
                res.status(400).json({
                    success: false,
                    message: `Cookies are not updated.`
                });

            }

        } else {
            res.status(400).json(data);
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Failed to login, Error: ${error.message}`
        });
    }
}

const getLoggedUser = async (req, res) => { 
    
    try {
        const userID = req.decodedToken.userID;
        const data = await userService.getUserByID(userID);
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

const getloggedUserRole = async (req, res) => {
    try {
        const role = req.decodedToken.role;
        res.status(200).json({ role: role });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Failed to get data, Error: ${error.message}`
        });
    }
}

const logoutUser = (req, res) => {

    res.clearCookie('token');

    res.status(200).json({ message: 'Logged out successfully' });
}

const updateUser = async(req, res) => { 
    try {
        const userID = req.params.id;
        const { email, role } = req.body;
        const data = await userService.updateUser(userID, email, role);
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

const changePassword = async (req, res) => { 
    try {
        const userID = req.params.id;
        const newPassword = req.body.newPassword;
        
        const data = await userService.updateUserPassword(userID, newPassword);
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

const deleteUser = async (req, res) => { 
    try {
        const userID = req.params.id;
        const data = await userService.userDeleteByID(userID);
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

module.exports = {
    registerUser,
    loginUser,
    getLoggedUser,
    getloggedUserRole,
    logoutUser,
    updateUser,
    changePassword,
    deleteUser
}