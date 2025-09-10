const express = require('express');
const router = express.Router();
const seminarController = require('../controllers/seminar.controller');
const { protect } = require('../middlewares/auth.middleware');
const { isAdmin } = require('../middlewares/role.middleware');

router.post('/', protect, isAdmin, seminarController.create);
router.get('/', seminarController.list);
router.get('/:id', seminarController.detail);
router.put('/:id', protect, isAdmin, seminarController.update);
router.delete('/:id', protect, isAdmin, seminarController.delete);
module.exports = router;