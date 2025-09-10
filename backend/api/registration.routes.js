const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registration.controller');
const { protect } = require('../middlewares/auth.middleware');
const { isAdmin } = require('../middlewares/role.middleware');

router.post('/seminar', protect, registrationController.registerSeminar);
router.get('/all', protect, isAdmin, registrationController.listRegistrations);
router.put('/:registration_id/validate', protect, isAdmin, registrationController.validateRegistration);
module.exports = router;