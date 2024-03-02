const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const requireRole = require('../middlewares/authMiddleware'); 




// For routes accessible by any logged-in user
router.get('/', requireRole(['Administrator']), userController.getAllUsers);
router.get('/profile', requireRole(['Administrator', 'Subscriber']), userController.getCurrentUserProfile);
router.get('/:userId/profile', requireRole(['Administrator', 'Subscriber']), userController.getUserProfileById);


router.post('/register', userController.register);
router.post('/employees/add', requireRole(['Administrator', 'Subscriber']), userController.addEmployee);
module.exports = router;