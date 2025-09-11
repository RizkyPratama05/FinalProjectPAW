// Import express dan inisialisasi router
const express = require('express');
const router = express.Router();
// Import controller dan middleware
const certificateController = require('../controllers/certificate.controller');
const { protect } = require('../middlewares/auth.middleware');
const { isAdmin } = require('../middlewares/role.middleware');

// Endpoint untuk admin generate sertifikat
router.post('/:registration_id', protect, isAdmin, certificateController.generate);

// Endpoint untuk user/admin melihat detail sertifikat
router.get('/:registration_id', protect, certificateController.detail);

module.exports = router;