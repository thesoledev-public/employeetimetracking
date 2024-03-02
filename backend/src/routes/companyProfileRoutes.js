const express = require('express');
const router = express.Router();
const companyProfileController = require('../controllers/companyProfileController'); // Adjust the path as necessary
const requireRole = require('../middlewares/authMiddleware'); // Import the middleware


// Route to add a company profile
router.post('/company-profile', requireRole(['Subscriber', 'Administrator']), companyProfileController.addCompanyProfile);

module.exports = router;
