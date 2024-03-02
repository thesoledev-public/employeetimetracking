const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userProfileSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  personalInfo: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dob: { type: Date, required: true }, // Date of Birth
    gender: { type: String },
    phoneNumber: { type: String },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
      country: { type: String, required: true }
    },
    // Additional personal fields...
  },
  employmentDetails: {
    position: { type: String, required: true },
    department: { type: String, required: true },
    hireDate: { type: Date, required: true },
    employmentType: { type: String, enum: ['Full-Time', 'Part-Time', 'Contractor'], required: true },
    manager: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', // Reference to another User document
      required: false // Set to false if not every employee has a manager or is a manager
    },
    workEmail: { type: String, unique: true, sparse: true },
    workPhoneNumber: { type: String },
    // Additional employment-related fields...
  },
  // Other sections or fields as needed for your application...
}, { timestamps: true });

module.exports = mongoose.model('UserProfile', userProfileSchema);
