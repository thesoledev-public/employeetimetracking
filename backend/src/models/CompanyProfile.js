const mongoose = require('mongoose');

const companyProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Company names are unique
  },
  description: {
    type: String,
    required: false, // Optional
  },
  industry: {
    type: String,
    required: true,
  },
  location: {
    address: String,
    city: String,
    country: String,
  },
  contact: {
    email: {
      type: String,
      required: true,
    },
    phone: String, // Optional
  },
  logo: {
    type: String,
    required: false, // URL to the logo image, optional
  },
  website: {
    type: String,
    required: false,
  },
  userId: { // Link to the User who owns this profile
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true, // Ensure one-to-one relationship between User and CompanyProfile
  },
  // Additional fields as needed...
}, { timestamps: true }); // Include creation and update timestamps

const CompanyProfile = mongoose.model('CompanyProfile', companyProfileSchema);

module.exports = CompanyProfile;
