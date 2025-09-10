const {
    createSeminar,
    getSeminars,
    getSeminarById,
    updateSeminar,
    deleteSeminar
} = require('../models/seminar.models');

// Buat seminar
exports.create = async (req, res) => {
    const { judul, deskripsi, tanggal, lokasi } = req.body;
    const created_by = req.user.id; 
    await createSeminar(judul, deskripsi, tanggal, lokasi, created_by);
    res.status(201).json({ message: 'Seminar created successfully' });
};

// List semua seminar
exports.list = async (req, res) => {
    const seminars = await getSeminars();
    res.json(seminars);
};

// Detail seminar
exports.detail = async (req, res) => {
    const seminar = await getSeminarById(req.params.seminar_id);
    if (!seminar) {
        return res.status(404).json({ message: 'Seminar not found' });
    }
    res.json(seminar);
};

// Update seminar
exports.update = async (req, res) => {
    const { judul, deskripsi, tanggal, lokasi } = req.body;
    await updateSeminar(req.params.seminar_id, judul, deskripsi, tanggal, lokasi);
    res.json({ message: 'Seminar updated successfully' });
};

// Hapus seminar
exports.delete = async (req, res) => {
    await deleteSeminar(req.params.seminar_id);
    res.json({ message: 'Seminar deleted successfully' });
};