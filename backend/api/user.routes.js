// Import express dan inisialisasi router
const express = require('express');
const router = express.Router();
// Import controller dan middleware
const userController = require('../controllers/user.controller');
const { protect } = require('../middlewares/auth.middleware');
const { isAdmin } = require('../middlewares/role.middleware');

// Endpoint untuk list semua user, hanya admin
router.get('/', protect, isAdmin, userController.listUsers);
module.exports = router;