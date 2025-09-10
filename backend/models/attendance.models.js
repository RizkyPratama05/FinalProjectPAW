const db = require('../database/db');

const markAttendance = async (registration_id, status) => {
  await db.query(
    'INSERT INTO attendance (registration_id, status) VALUES (?, ?) ON DUPLICATE KEY UPDATE status = VALUES(status)',
    [registration_id, status]
  );
};

const getAttendanceByRegistration = async (registration_id) => {
  const [rows] = await db.query(
    'SELECT * FROM attendance WHERE registration_id = ?',
    [registration_id]
  );
  return rows[0];
};

module.exports = { markAttendance, getAttendanceByRegistration };