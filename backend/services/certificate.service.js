// Import library PDFKit untuk membuat file PDF
const PDFDocument = require('pdfkit');
// Import modul file system untuk menulis file
const fs = require('fs');
// Import modul path untuk mengelola path file
const path = require('path');

// Fungsi untuk generate sertifikat PDF
const generateCertificatePDF = async (registration_id, user_name, seminar_title) => {
  // Membuat dokumen PDF baru
  const doc = new PDFDocument();
  // Nama file sertifikat
  const fileName = `cert_${registration_id}.pdf`;
  // Path lengkap file sertifikat
  const filePath = path.join(__dirname, '../public/certificates', fileName);

  // Membuat folder certificates jika belum ada
  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  // Menulis konten ke file PDF
  doc.pipe(fs.createWriteStream(filePath));
  doc.fontSize(25).text('SERTIFIKAT SEMINAR', { align: 'center' });
  doc.moveDown();
  doc.fontSize(18).text(`Diberikan kepada: ${user_name}`, { align: 'center' });
  doc.moveDown();
  doc.fontSize(16).text(`Atas partisipasi dalam seminar: ${seminar_title}`, { align: 'center' });
  doc.end();

  // Mengembalikan path file sertifikat untuk akses dari frontend
  return `/certificates/${fileName}`;
};

// Ekspor fungsi generateCertificatePDF
module.exports = { generateCertificatePDF };