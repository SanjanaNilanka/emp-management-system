const jwt = require('jsonwebtoken');
const config = require('../config/config');
const authService = require('../services/authService');
const jwtSecret = config.auth.jwtSecret;

const getLoggedUserMiddleware = function(req, res, next) {
    try {
        const token = req.headers.authorization;
        if (token) {
            try {
                const decodedToken = jwt.verify(token, jwtSecret);
                req.decodedToken = decodedToken;
                next();
            } catch (err) {
                if (err instanceof jwt.TokenExpiredError) {
                    return res.status(401).send({
                        success: false,
                        message: "Token expired",
                    });
                } else {
                    return res.status(401).send({
                        success: false,
                        message: "Invalid token",
                    });
                }
            }
        } else {
            return res.status(401).send({
                success: false,
                message: "Token not provided",
            });
        }
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
};


const changePasswordMiddleware = async(req, res, next) => { 
    try {
        const userID = req.params.id;
        const oldPassword = req.body.oldPassword;

        const data = await authService.verifyPasswordByID(userID, oldPassword);
        if (data.success === true) { 
            next();
        } else {
            res.status(400).json({
                success: false,
                message: data.message
            });
        }

    } catch (err) {
        res.status(400).json({
            success: false,
            message: `Failed to get data, Error: ${err.message}`
        });
    }
}

module.exports = { getLoggedUserMiddleware, changePasswordMiddleware };