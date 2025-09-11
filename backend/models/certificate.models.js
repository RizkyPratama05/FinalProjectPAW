const db = require('../database/db');

// Membuat sertifikat baru untuk pendaftaran tertentu
const createCertificate = async (registration_id, file_url) => {
  await db.query(
    'INSERT INTO certificates (registration_id, file_url) VALUES (?, ?)',
    [registration_id, file_url]
  );
};

// Mengambil sertifikat berdasarkan registration_id
const getCertificateByRegistration = async (registration_id) => {
  const [rows] = await db.query(
    'SELECT * FROM certificates WHERE registration_id = ?',
    [registration_id]
  );
  return rows[0];
};

module.exports = { createCertificate, getCertificateByRegistration };