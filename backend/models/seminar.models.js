const db = require('../database/db');

const createSeminar = async (judul, deskripsi, tanggal, lokasi, created_by) => {
    await db.query(
        'INSERT INTO seminars (judul, deskripsi, tanggal, lokasi, created_by) VALUES (?, ?, ?, ?, ?)',
        [judul, deskripsi, tanggal, lokasi, created_by]
    );
};

const getSeminars = async () => {
    const [rows] = await db.query('SELECT * FROM seminars');
    return rows;
};

const getSeminarById = async (id) => {
    const [rows] = await db.query('SELECT * FROM seminars WHERE id = ?', [id]);
    return rows[0];
};

const updateSeminar = async (id, judul, deskripsi, tanggal, lokasi) => {
    await db.query(
        'UPDATE seminars SET judul = ?, deskripsi = ?, tanggal = ?, lokasi = ? WHERE id = ?',
        [judul, deskripsi, tanggal, lokasi, seminar_id]
    );
};

const deleteSeminar = async (id) => {
    await db.query('DELETE FROM seminars WHERE id = ?', [id]);
};
module.exports = {
    createSeminar,
    getSeminars,
    getSeminarById,
    updateSeminar,
    deleteSeminar
};