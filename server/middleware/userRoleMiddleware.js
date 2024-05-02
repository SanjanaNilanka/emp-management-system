const jwt = require('jsonwebtoken');
const config = require('../config/config');
const jwtSecret = config.auth.jwtSecret;

const verifyAdminMiddleware = function(req, res, next) {
    try {
        const token = req.cookies.token;

        if (token) {
            try {
                const decodedToken = jwt.verify(token, jwtSecret);
                const role = decodedToken.role;
                if (role.toLowerCase() === 'admin') { 
                    next();
                } else {
                    return res.status(401).send({
                        success: false,
                        message: "You are not an admin",
                    });
                }
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

const verifyStudentMiddleware = function(req, res, next) {
    try {
        const token = req.cookies.token;

        if (token) {
            try {
                const decodedToken = jwt.verify(token, jwtSecret);
                const role = decodedToken.role;
                if (role.toLowerCase() === 'student') { 
                    next();
                } else {
                    return res.status(401).send({
                        success: false,
                        message: "You are not an admin",
                    });
                }
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

const verifyFacultyMiddleware = function(req, res, next) {
    try {
        const token = req.cookies.token;

        if (token) {
            try {
                const decodedToken = jwt.verify(token, jwtSecret);
                const role = decodedToken.role;
                if (role.toLowerCase() === 'faculty') { 
                    next();
                } else {
                    return res.status(401).send({
                        success: false,
                        message: "You are not an admin",
                    });
                }
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

const verifyNotFacultyMiddleware = function (req, res, next) {
    try {
        const token = req.cookies.token;

        if (token) {
            try {
                const decodedToken = jwt.verify(token, jwtSecret);
                const role = decodedToken.role;
                if (role.toLowerCase() !== 'faculty') { 
                    next();
                } else {
                    return res.status(401).send({
                        success: false,
                        message: "You are not having access to this",
                    });
                }
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

const verifyNotStudentMiddleware = function (req, res, next) {
    try {
        const token = req.cookies.token;

        if (token) {
            try {
                const decodedToken = jwt.verify(token, jwtSecret);
                const role = decodedToken.role;
                const userID = decodedToken.userID;
                if (role.toLowerCase() !== 'student') { 
                    req.userID = userID;
                    next();
                } else {
                    return res.status(401).send({
                        success: false,
                        message: "You are not having access to this",
                    });
                }
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

module.exports = {
    verifyAdminMiddleware,
    verifyStudentMiddleware,
    verifyFacultyMiddleware,
    verifyNotFacultyMiddleware,
    verifyNotStudentMiddleware
};