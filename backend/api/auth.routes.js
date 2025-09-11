// Import express dan inisialisasi router
const express = require('express');
const router = express.Router();
// Import controller
const authController = require('../controllers/auth.controller');

// Endpoint untuk registrasi user
router.post('/register', authController.register);
// Endpoint untuk login user
router.post('/login', authController.login);

module.exports = router;
