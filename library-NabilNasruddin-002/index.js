// Library-NabilNasruddin-002
// Utility functions for FinalProjectPAW

const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
  // MySQL connection helper
  createDbPool: (config) => {
    return mysql.createPool(config);
  },

  // JWT helper
  signJwt: (payload, secret, options = {}) => {
    return jwt.sign(payload, secret, options);
  },
  verifyJwt: (token, secret) => {
    return jwt.verify(token, secret);
  },

  // Bcrypt helpers
  hashPassword: async (password, saltRounds = 10) => {
    return await bcrypt.hash(password, saltRounds);
  },
  comparePassword: async (password, hash) => {
    return await bcrypt.compare(password, hash);
  }
};
