const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generateCertificatePDF = async (registration_id, user_name, seminar_title) => {
  const doc = new PDFDocument();
  const fileName = `cert_${registration_id}.pdf`;
  const filePath = path.join(__dirname, '../public/certificates', fileName);

  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  doc.pipe(fs.createWriteStream(filePath));
  doc.fontSize(25).text('SERTIFIKAT SEMINAR', { align: 'center' });
  doc.moveDown();
  doc.fontSize(18).text(`Diberikan kepada: ${user_name}`, { align: 'center' });
  doc.moveDown();
  doc.fontSize(16).text(`Atas partisipasi dalam seminar: ${seminar_title}`, { align: 'center' });
  doc.end();

  return `/certificates/${fileName}`;
};

module.exports = { generateCertificatePDF };