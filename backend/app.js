require('dotenv').config();
const express = require('express');

// Import the connectDB function
const connectDB = require('./src/config/database');

// Import routes
const userRoutes = require('./src/routes/userRoutes');
const authRoutes = require('./src/routes/authRoutes'); // Import the new authRoutes
const companyProfileRoutes = require('./src/routes/companyProfileRoutes'); // Adjust the path as necessary


const setupMiddleware = require('./src/middlewares/middleware'); // Import the setupMiddleware function from the middleware folder


const app = express();

// Set up middleware
setupMiddleware(app);

// Routes
app.get('/', (req, res) => {
  res.json({ message: "Welcome to the Employee Time Tracking API!" });
});

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', companyProfileRoutes);

// Connect to MongoDB, then start the server
connectDB().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(error => {
  console.error("Database connection failed", error);
  process.exit(1);
});