const { createCertificate, getCertificateByRegistration } = require('../models/certificate.models');
const { generateCertificatePDF } = require('../services/certificate.service');
const db = require('../database/db');

exports.generate = async (req, res) => {
  const { registration_id } = req.params;

  // Ambil data user dan seminar dari database
  const [regRows] = await db.query(
    `SELECT u.nama AS user_name, s.judul AS seminar_title
     FROM registrations r
     JOIN users u ON r.user_id = u.user_id
     JOIN seminars s ON r.seminar_id = s.seminar_id
     WHERE r.registration_id = ?`,
    [registration_id]
  );
  if (!regRows.length) {
    return res.status(404).json({ message: 'Data pendaftaran tidak ditemukan' });
  }
  const { user_name, seminar_title } = regRows[0];

  // Generate PDF
  const file_url = await generateCertificatePDF(registration_id, user_name, seminar_title);

  // Simpan ke database
  await createCertificate(registration_id, file_url);

  res.json({ message: 'Sertifikat berhasil dibuat', file_url });
};

exports.detail = async (req, res) => {
  const { registration_id } = req.params;
  const certificate = await getCertificateByRegistration(registration_id);
  if (!certificate) {
    return res.status(404).json({ message: 'Sertifikat tidak ditemukan' });
  }
  res.json(certificate);
};