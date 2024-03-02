const jwt = require('jsonwebtoken');
const User = require('../models/User');

// const requireRole = (allowedRoles) => async (req, res, next) => {
//     try {
//         const token = req.headers.authorization?.split(" ")[1];
//         if (!token) return res.status(401).json({ message: "Authentication token required." });

//         let decoded;
//         try {
//             decoded = jwt.verify(token, process.env.JWT_SECRET);
//         } catch (error) {
//             if (error.name === 'TokenExpiredError') {
//                 return res.status(401).json({ message: "Token expired." });
//             } else if (error.name === 'JsonWebTokenError') {
//                 return res.status(401).json({ message: "Invalid token." });
//             } else {
//                 return res.status(401).json({ message: "Authentication failed." });
//             }
//         }

//         const user = await User.findById(decoded.userId);
//         if (!user || !allowedRoles.includes(user.role)) {
//             return res.status(403).json({ message: "Access denied. Insufficient permissions." });
//         }

//         req.user = user;
//         next();
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: "Server error during authentication." });
//     }
// };


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
        if (!user || !allowedRoles.includes(user.role)) {
            return res.status(403).json({ message: "Access denied. Insufficient permissions." });
        }

        // Check if user is Subscriber and the requested userId is in the same company
        if (user.role === 'Subscriber') {
            if (req.params.userId !== user._id.toString()) {
                const requestedUser = await User.findById(req.params.userId);
                if (!requestedUser || requestedUser.companyProfile.toString() !== user.companyProfile.toString()) {
                    return res.status(403).json({ message: "Access denied. Insufficient permissions." });
                }
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


