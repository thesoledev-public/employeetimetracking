const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController'); // Adjust the path as necessary
const requireRole = require('../middlewares/authMiddleware'); // Import the middleware
const requireRoleWithinCompany = require('../middlewares/requireRoleWithinCompany'); // Import the middleware


// Route to add a company
router.post('/company', requireRoleWithinCompany(['Subscriber', 'Administrator']), companyController.addCompany);

module.exports = router;
