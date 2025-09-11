// Import express dan inisialisasi router
const express = require('express');
const router = express.Router();
// Import controller dan middleware
const seminarController = require('../controllers/seminar.controller');
const { protect } = require('../middlewares/auth.middleware');
const { isAdmin } = require('../middlewares/role.middleware');

// Endpoint untuk membuat seminar (admin)
router.post('/', protect, isAdmin, seminarController.create);
// Endpoint untuk list semua seminar
router.get('/', seminarController.list);
// Endpoint untuk detail seminar
router.get('/:seminar_id', seminarController.detail);
// Endpoint untuk update seminar (admin)
router.put('/:seminar_id', protect, isAdmin, seminarController.update);
// Endpoint untuk hapus seminar (admin)
router.delete('/:seminar_id', protect, isAdmin, seminarController.delete);
module.exports = router;