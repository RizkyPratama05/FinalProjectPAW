const db = require('../database/db');

const createCertificate = async (registration_id, file_url) => {
  await db.query(
    'INSERT INTO certificates (registration_id, file_url) VALUES (?, ?)',
    [registration_id, file_url]
  );
};

const getCertificateByRegistration = async (registration_id) => {
  const [rows] = await db.query(
    'SELECT * FROM certificates WHERE registration_id = ?',
    [registration_id]
  );
  return rows[0];
};

module.exports = { createCertificate, getCertificateByRegistration };