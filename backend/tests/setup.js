const connectDB = require('../src/config/database'); // Adjust the path to where connectDB is actually located

module.exports = async () => {
  await connectDB();
};