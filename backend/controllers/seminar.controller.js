// Import fungsi seminar dari model
const {
    createSeminar,
    getSeminars,
    getSeminarById,
    updateSeminar,
    deleteSeminar
} = require('../models/seminar.models');

// Endpoint untuk membuat seminar baru
exports.create = async (req, res) => {
    const { judul, deskripsi, tanggal, lokasi, harga } = req.body;
    const created_by = req.user.id;
    let gambar = null;
    if (req.file) {
        gambar = `/uploads/${req.file.filename}`;
    } else if (req.body.gambar) {
        gambar = req.body.gambar;
    }
    await createSeminar(judul, deskripsi, tanggal, lokasi, harga, gambar, created_by);
    res.status(201).json({ message: 'Seminar created successfully' });
};

// Endpoint untuk list semua seminar
exports.list = async (req, res) => {
    const seminars = await getSeminars();
    res.json(seminars);
};

// Endpoint untuk detail seminar berdasarkan seminar_id
exports.detail = async (req, res) => {
    const seminar = await getSeminarById(req.params.seminar_id);
    if (!seminar) {
        return res.status(404).json({ message: 'Seminar not found' });
    }
    res.json(seminar);
};

// Endpoint untuk update seminar
exports.update = async (req, res) => {
    const { judul, deskripsi, tanggal, lokasi, harga } = req.body;
    let gambar = null;
    if (req.file) {
        gambar = `/uploads/${req.file.filename}`;
    } else if (req.body.gambar) {
        gambar = req.body.gambar;
    }
    await updateSeminar(req.params.seminar_id, judul, deskripsi, tanggal, lokasi, harga, gambar);
    res.json({ message: 'Seminar updated successfully' });
};

// Endpoint untuk menghapus seminar
exports.delete = async (req, res) => {
    await deleteSeminar(req.params.seminar_id);
    res.json({ message: 'Seminar deleted successfully' });
};