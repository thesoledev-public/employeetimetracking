// middleware/middleware.js
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const setupMiddleware = (app) => {
  app.use(express.json());
  app.use(helmet());
  app.use(morgan('tiny'));
  app.use(cors());
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  }));
};

module.exports = setupMiddleware;
