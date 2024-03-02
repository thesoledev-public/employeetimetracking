const CompanyProfile = require('../models/CompanyProfile'); // Adjust the path as necessary
const User = require('../models/User'); // Adjust the path as necessary

// Function to add a company profile
exports.addCompanyProfile = async (req, res) => {
  const { userId, ...profileData } = req.body;

  try {
    // Check if the user already has a company profile
    const existingProfile = await CompanyProfile.findOne({ userId });
    if (existingProfile) {
      return res.status(400).json({ message: 'User already has a company profile.' });
    }

    // Create new company profile
    const companyProfile = new CompanyProfile({ ...profileData, userId });
    await companyProfile.save();

    // Optionally, update the user to indicate they now have a company profile
    await User.findByIdAndUpdate(userId, { $set: { companyProfile: companyProfile._id } });

    res.json({ message: 'Company profile added successfully.', companyProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding company profile.' });
  }
};
