require('dotenv').config(); // Ensure this is at the top

const mongoose = require('mongoose');

// Determine the correct database based on the environment
const dbName = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_DATABASE : process.env.MONGODB_DATABASE;

// Construct the URI using environment variables
const uri = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}` +
            `@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}` +
            `/${dbName}?authSource=${process.env.MONGODB_AUTH_SOURCE}`;

async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log(`Connected successfully to MongoDB server (${dbName})`);
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }
}

// Export the connectDB function
module.exports = connectDB;
