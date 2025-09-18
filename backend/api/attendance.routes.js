const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendance.controller');
const { protect } = require('../middlewares/auth.middleware');
const { isAdmin } = require('../middlewares/role.middleware');

// Endpoint untuk list semua pendaftar seminar beserta status kehadiran (admin)
router.get('/all', protect, isAdmin, attendanceController.listAllAttendance);

router.post('/:registration_id', protect, isAdmin, attendanceController.mark);

router.get('/:registration_id', protect, attendanceController.detail);

module.exports = router;