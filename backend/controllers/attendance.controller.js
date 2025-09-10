const { markAttendance, getAttendanceByRegistration } = require('../models/attendance.models.js');

exports.mark = async (req, res) => {
  const { registration_id } = req.params;
  const { status } = req.body; // 'hadir' atau 'tidak_hadir'
  await markAttendance(registration_id, status);
  res.json({ message: 'Absensi berhasil dicatat' });
};

exports.detail = async (req, res) => {
  const { registration_id } = req.params;
  const attendance = await getAttendanceByRegistration(registration_id);
  res.json(attendance);
};