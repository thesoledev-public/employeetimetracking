const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireRoleWithinCompany = (allowedRoles) => async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Authentication token required." });

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: "Token expired." });
            } else if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: "Invalid token." });
            } else {
                return res.status(401).json({ message: "Authentication failed." });
            }
        }

        const loggedUser = await User.findById(decoded.userId);
        if (!loggedUser) {
            return res.status(403).json({ message: "Access denied. Invalid user." });
        }

        // Check if the logged-in user is an administrator
        if (loggedUser.role === 'Administrator') {
            req.user = loggedUser;
            return next();
        }

        // Check if the provided userId matches the logged-in user or is in the same company
        const userId = req.params.userId;
        if (userId === loggedUser._id.toString() || loggedUser.companyProfile.equals(userId)) {
            req.user = loggedUser;
            return next();
        } else {
            return res.status(403).json({ message: "Access denied. Insufficient permissions." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error during authentication." });
    }
};

module.exports = requireRoleWithinCompany;


