const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificate.controller');
const { protect } = require('../middlewares/auth.middleware');
const { isAdmin } = require('../middlewares/role.middleware');

// Admin generate sertifikat
router.post('/:registration_id', protect, isAdmin, certificateController.generate);

// User/admin melihat detail sertifikat
router.get('/:registration_id', protect, certificateController.detail);

module.exports = router;