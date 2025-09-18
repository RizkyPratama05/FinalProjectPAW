// Endpoint untuk mengambil pendaftaran seminar milik user yang sedang login (beserta sertifikat)
exports.listMyRegistrations = async (req, res) => {
  const user_id = req.user && req.user.id ? req.user.id : null;
  if (!user_id) {
    return res.status(401).json({ message: 'User tidak terotorisasi atau token tidak valid.' });
  }
  const [rows] = await db.query(
    `SELECT r.*, u.nama, s.judul, s.gambar, c.file_url AS sertifikat_url
     FROM registrations r
     JOIN users u ON r.user_id = u.user_id
     JOIN seminars s ON r.seminar_id = s.seminar_id
     LEFT JOIN certificates c ON r.registration_id = c.registration_id
     WHERE r.user_id = ?`,
    [user_id]
  );
  res.json(rows);
};
// Import fungsi pendaftaran dan sertifikat dari model dan service
const { updateRegistrationStatus } = require('../models/registration.models');
const { createCertificate } = require('../models/certificate.models');
const { generateCertificatePDF } = require('../services/certificate.service');
const db = require('../database/db');

// Endpoint untuk validasi pendaftaran seminar (admin)
exports.validateRegistration = async (req, res) => {
  const { registration_id } = req.params;
  const { status } = req.body;
  // Update status pendaftaran di database
  await updateRegistrationStatus(registration_id, status);

  if (status === 'approved') {
    // Jika disetujui, ambil data user dan seminar
    const [regRows] = await db.query(
      `SELECT u.nama AS user_name, s.judul AS seminar_title
       FROM registrations r
       JOIN users u ON r.user_id = u.user_id
       JOIN seminars s ON r.seminar_id = s.seminar_id
       WHERE r.registration_id = ?`,
      [registration_id]
    );
    const { user_name, seminar_title } = regRows[0];

    // Generate sertifikat PDF
    //const file_url = await generateCertificatePDF(registration_id, user_name, seminar_title);

    // Simpan sertifikat ke database
    await createCertificate(registration_id, file_url);
  }

  res.json({ message: 'Status pendaftaran berhasil diupdate' });
};

// Pendaftaran seminar oleh user
// Endpoint untuk pendaftaran seminar oleh user
exports.registerSeminar = async (req, res) => {
  // Ambil user_id dari token
  const user_id = req.user && req.user.id ? req.user.id : null;
  if (!user_id) {
    return res.status(401).json({ message: 'User tidak terotorisasi atau token tidak valid.' });
  }
  const { seminar_id, data_tambahan } = req.body;

  // Cek apakah user sudah pernah daftar seminar ini
  const [existing] = await db.query(
    'SELECT * FROM registrations WHERE user_id = ? AND seminar_id = ?',
    [user_id, seminar_id]
  );
  if (existing.length > 0) {
    return res.status(400).json({ message: 'Sudah terdaftar di seminar ini' });
  }

  // Simpan pendaftaran ke database
  await db.query(
    'INSERT INTO registrations (user_id, seminar_id, data_tambahan) VALUES (?, ?, ?)',
    [user_id, seminar_id, data_tambahan]
  );
  res.status(201).json({ message: 'Pendaftaran seminar berhasil' });
};

// List semua pendaftaran (admin)
// Endpoint untuk list semua pendaftaran seminar (admin)
exports.listRegistrations = async (req, res) => {
  const [rows] = await db.query(
    `SELECT r.*, u.nama, u.email, s.judul 
     FROM registrations r
     JOIN users u ON r.user_id = u.user_id
     JOIN seminars s ON r.seminar_id = s.seminar_id`
  );
  res.json(rows);
};