const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireRole = (allowedRoles) => async (req, res, next) => {
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

        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(403).json({ message: "Access denied. User not found." });
        }

        // Allow Superuser role to access everything
        if (user.role === 'Superuser') {
            req.user = user;
            return next();
        }

        if (!allowedRoles.includes(user.role)) {
            return res.status(403).json({ message: "Access denied. Insufficient permissions." });
        }

        // Further permission checks for 'Subscriber' role
        if (user.role === 'Subscriber') {
            
            // If checking own profile, proceed
            if (req.params.userId === user._id.toString()) {
                req.user = user;
                return next();
            }
            
            // Check if currentUser has a companyId
            if (!user.companyId) {
                return res.status(403).json({ message: "Access denied. Current user does not belong to any company." });
            }

            // If checking another user's profile, ensure companyId matches, if applicable
            const requestedUser = await User.findById(req.params.userId);
            if (!requestedUser) {
                return res.status(404).json({ message: "Requested user not found." });
            }

            // Ensure requestedUser has a companyId and it matches currentUser's companyId
            if (!requestedUser.companyId || requestedUser.companyId.toString() !== user.companyId.toString()) {
                return res.status(403).json({ message: "Access denied. Users do not belong to the same company." });
            }

        }

        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error during authentication." });
    }
};

module.exports = requireRole;
