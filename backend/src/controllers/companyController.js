const Company = require('../models/Company'); // Adjust the path as necessary
const User = require('../models/User'); // Adjust the path as necessary

// Function to add a company profile
exports.addCompany = async (req, res) => {
  const { userId, ...profileData } = req.body;

  try {
    // Check if the user already has a company profile
    const existingProfile = await Company.findOne({ userId });
    if (existingProfile) {
      return res.status(400).json({ message: 'User already has a company profile.' });
    }

    // Create new company profile
    const company = new Company({ ...profileData, userId });
    await company.save();

    // Optionally, update the user to indicate they now have a company profile
    await User.findByIdAndUpdate(userId, { $set: { company: company._id } });

    res.json({ message: 'Company profile added successfully.', company });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding company profile.' });
  }
};
