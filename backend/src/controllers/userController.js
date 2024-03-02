const User = require('../models/User');
const Company = require('../models/Company');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const user = await User.create({ username, email, password, role });
    
    res.status(201).json({ message: "User successfully registered", userId: user._id });
  } catch (error) {
    console.error(error); // Log the full error object for more details
    res.status(500).json({ error: "An error occurred during user registration." });
  }
};

exports.addEmployee = async (req, res) => {
  const { username, email, password, role, companyId } = req.body;

  try {
    // Find the company profile corresponding to the companyId
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ error: 'Company profile not found.' });
    }

    // Create a new user document
    const user = new User({
      username,
      email,
      password,
      role,
      companyId: company._id, // Link the user to the company profile
    });

    // Hash password before saving
    user.password = await bcrypt.hash(password, 12);

    // Save the user document
    await user.save();

    res.status(201).json({ message: "User added successfully.", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while adding user." });
  }
};

exports.getAllUsers = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    let usersQuery = User.find({})
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('companyId');
   

    const users = await usersQuery.exec();

    const count = await User.countDocuments();
    res.json({
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching users." });
  }
};

exports.getCurrentUserProfile = async (req, res) => {
  try {
      const userProfile = await User.findById(req.user.id).populate('companyId');
      if (!userProfile) {
          return res.status(404).json({ message: "User profile not found" });
      }
      res.json(userProfile);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while fetching user profile" });
  }
};

exports.getUserProfileById = async (req, res) => {
  const userId = req.params.userId;
  try {
      const userProfile = await User.findById(userId).populate('companyId');
      if (!userProfile) {
          return res.status(404).json({ message: "User profile not found" });
      }
      res.json(userProfile);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while fetching user profile" });
  }
};