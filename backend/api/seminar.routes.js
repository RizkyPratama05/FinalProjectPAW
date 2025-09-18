// Import express dan inisialisasi router
const express = require('express');
const router = express.Router();
// Import controller dan middleware
const seminarController = require('../controllers/seminar.controller');
const { protect } = require('../middlewares/auth.middleware');
const { isAdmin } = require('../middlewares/role.middleware');
const multer = require('multer');
const path = require('path');

// Konfigurasi multer untuk upload gambar
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '../uploads'));
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);
	}
});
const upload = multer({ storage });

// Endpoint untuk membuat seminar (admin)
router.post('/', protect, isAdmin, upload.single('gambar'), seminarController.create);
// Endpoint untuk list semua seminar
router.get('/', seminarController.list);
// Endpoint untuk detail seminar
router.get('/:seminar_id', seminarController.detail);
// Endpoint untuk update seminar (admin)
router.put('/:seminar_id', protect, isAdmin, upload.single('gambar'), seminarController.update);
// Endpoint untuk hapus seminar (admin)
router.delete('/:seminar_id', protect, isAdmin, seminarController.delete);
module.exports = router;