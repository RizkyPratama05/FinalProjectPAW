const db = require('../database/db');

// Membuat seminar baru
const createSeminar = async (judul, deskripsi, tanggal, lokasi, created_by) => {
    await db.query(
        'INSERT INTO seminars (judul, deskripsi, tanggal, lokasi, created_by) VALUES (?, ?, ?, ?, ?)',
        [judul, deskripsi, tanggal, lokasi, created_by]
    );
};

// Mengambil semua seminar
const getSeminars = async () => {
    const [rows] = await db.query('SELECT * FROM seminars');
    return rows;
};

// Mengambil detail seminar berdasarkan seminar_id
const getSeminarById = async (id) => {
    const [rows] = await db.query('SELECT * FROM seminars WHERE seminar_id = ?', [id]);
    return rows[0];
};

// Mengupdate seminar
const updateSeminar = async (id, judul, deskripsi, tanggal, lokasi) => {
    await db.query(
        'UPDATE seminars SET judul = ?, deskripsi = ?, tanggal = ?, lokasi = ? WHERE seminar_id = ?',
        [judul, deskripsi, tanggal, lokasi, id]
    );
};

// Menghapus seminar
const deleteSeminar = async (id) => {
    await db.query('DELETE FROM seminars WHERE seminar_id = ?', [id]);
};
module.exports = {
    createSeminar,
    getSeminars,
    getSeminarById,
    updateSeminar,
    deleteSeminar
};