const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendance.controller');
const { protect } = require('../middlewares/auth.middleware');
const { isAdmin } = require('../middlewares/role.middleware');

router.post('/:registration_id', protect, isAdmin, attendanceController.mark);

router.get('/:registration_id', protect, attendanceController.detail);

module.exports = router;