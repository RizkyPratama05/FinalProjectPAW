const db = require('../database/db');

// Menandai kehadiran peserta seminar
const markAttendance = async (registration_id, status) => {
  await db.query(
    'INSERT INTO attendance (registration_id, status) VALUES (?, ?) ON DUPLICATE KEY UPDATE status = VALUES(status)',
    [registration_id, status]
  );
};

// Mengambil data absensi berdasarkan registration_id
const getAttendanceByRegistration = async (registration_id) => {
  const [rows] = await db.query(
    'SELECT * FROM attendance WHERE registration_id = ?',
    [registration_id]
  );
  return rows[0];
};

module.exports = { markAttendance, getAttendanceByRegistration };