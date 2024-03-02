// insertUser.js
require('dotenv').config(); // If you're using environment variables for DB URI
const mongoose = require('mongoose');
const User = require('./models/User'); // Adjust the path as necessary
const bcrypt = require('bcryptjs'); // For hashing the password

const uri = process.env.MONGODB_URI || "mongodb://mongoadmin:secret@localhost:27017/employeeTimeTracking?authSource=admin";

async function connectDB() {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected successfully to server");
  } catch (err) {
    console.error("Could not connect to MongoDB:", err);
  }
}

async function insertUser() {
  await connectDB();

  const hashedPassword = await bcrypt.hash('password123', 12); // Example password, hash it

  const newUser = new User({
    username: 'newUser2',
    email: 'newuser2@example.com',
    password: hashedPassword,
    role: 'Subscriber' // Adjust role as needed
  });

  try {
    const savedUser = await newUser.save();
    console.log('User inserted successfully:', savedUser);
  } catch (error) {
    console.error('Error inserting user:', error);
  } finally {
    mongoose.disconnect(); // Clean up connection
  }
}

insertUser();
