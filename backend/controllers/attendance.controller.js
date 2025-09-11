// Import fungsi absensi dari model
const { markAttendance, getAttendanceByRegistration } = require('../models/attendance.models.js');

// Endpoint untuk mencatat absensi peserta seminar
exports.mark = async (req, res) => {
  const { registration_id } = req.params;
  const { status } = req.body; 
  // Catat status absensi di database
  await markAttendance(registration_id, status);

  // Otomatis update status pendaftaran dan generate sertifikat jika hadir
  const { updateRegistrationStatus } = require('../models/registration.models');
  const { createCertificate } = require('../models/certificate.models');
  const { generateCertificatePDF } = require('../services/certificate.service');
  const db = require('../database/db');

  if (status === 'hadir') {
    // Jika hadir, update status pendaftaran ke approved/lulus
    await updateRegistrationStatus(registration_id, 'approved');
    // Ambil data user dan seminar
    const [regRows] = await db.query(
      `SELECT u.nama AS user_name, s.judul AS seminar_title
       FROM registrations r
       JOIN users u ON r.user_id = u.user_id
       JOIN seminars s ON r.seminar_id = s.seminar_id
       WHERE r.registration_id = ?`,
      [registration_id]
    );
    if (regRows.length > 0) {
      const { user_name, seminar_title } = regRows[0];
      // Generate sertifikat PDF
      const file_url = await generateCertificatePDF(registration_id, user_name, seminar_title);
      // Simpan sertifikat ke database
      await createCertificate(registration_id, file_url);
    }
    res.json({ message: 'Absensi hadir, status lulus & sertifikat digenerate.' });
  } else if (status === 'tidak_hadir') {
    // Jika tidak hadir, update status pendaftaran ke tidak_lulus
    await updateRegistrationStatus(registration_id, 'rejected');
    res.json({ message: 'Absensi tidak hadir, status tidak lulus.' });
  } else {
    // Status absensi lain
    res.json({ message: 'Absensi berhasil dicatat.' });
  }
};

// Endpoint untuk detail absensi berdasarkan registration_id
exports.detail = async (req, res) => {
  const { registration_id } = req.params;
  const attendance = await getAttendanceByRegistration(registration_id);
  res.json(attendance);
};