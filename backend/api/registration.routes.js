// Import express dan inisialisasi router
const express = require('express');
const router = express.Router();
// Import controller dan middleware
const registrationController = require('../controllers/registration.controller');
const { protect } = require('../middlewares/auth.middleware');
const { isAdmin } = require('../middlewares/role.middleware');

// Endpoint untuk pendaftaran seminar oleh user
router.post('/seminar', protect, registrationController.registerSeminar);
// Endpoint untuk list semua pendaftaran seminar (admin)
router.get('/all', protect, isAdmin, registrationController.listRegistrations);
// Endpoint untuk validasi pendaftaran seminar (admin)
router.put('/:registration_id/validate', protect, isAdmin, registrationController.validateRegistration);
module.exports = router;