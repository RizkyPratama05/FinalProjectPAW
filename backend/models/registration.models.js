const db = require('../database/db');

// Membuat pendaftaran seminar baru
const createRegistration = async (userId, seminarId, data_tambahan)=> {
    await db.query(
        'INSERT INTO registrations (user_id, seminar_id, data_tambahan) VALUES (?, ?, ?)',
        [userId, seminarId, data_tambahan]
    );
};

// Mencari pendaftaran berdasarkan user dan seminar
const findRegistration = async (userId, seminarId) => {
    const [rows] = await db.query(
        'SELECT * FROM registrations WHERE user_id = ? AND seminar_id = ?',
        [userId, seminarId]
    );
    return rows[0];
};

// Mengupdate status pendaftaran (pending/approved/rejected)
const updateRegistrationStatus = async (registrationId, status) => {
    await db.query(
        'UPDATE registrations SET status = ? WHERE registration_id = ?',
        [status, registrationId]
    );
};

// Mengambil semua pendaftaran (untuk admin)
const getAllRegistrations = async () => {
    const [rows] = await db.query(
        `SELECT r.*, u.nama, u.email, s.judul
         FROM registrations r
         JOIN users u ON r.user_id = u.user_id
         JOIN seminars s ON r.seminar_id = s.seminar_id`
    );
    return rows;
};

module.exports = {
    createRegistration,
    findRegistration,
    updateRegistrationStatus,
    getAllRegistrations
};