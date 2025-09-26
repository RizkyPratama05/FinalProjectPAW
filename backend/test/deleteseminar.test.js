const request = require('supertest'); // Import library supertest untuk melakukan HTTP request ke server Express
const app = require('../server');     // Import instance Express app dari file server.js
const jwt = require('jsonwebtoken');  // Import library jsonwebtoken untuk membuat token JWT

// Membuat payload user untuk token JWT
const userPayload = { user_id: 2, email: 'admin@example.com', role: 'admin' }; 
// Membuat token JWT dengan secret yang sama seperti di backend (.env)
const token = jwt.sign(userPayload, process.env.JWT_SECRET);

describe('DELETE /api/seminar/:seminar_id', () => {
  it('should delete seminar and return success message', async () => {
    const seminarId = 1; // ID seminar yang akan dihapus
    // Melakukan HTTP DELETE request ke endpoint /api/seminar/1
    const res = await request(app)
      .delete(`/api/seminar/${seminarId}`) // Endpoint yang dites
      .set('Accept', 'application/json')   // Set header Accept
      .set('Authorization', `Bearer ${token}`); // Set header Authorization dengan token JWT
    expect(res.statusCode).toBe(200); // Mengecek response status 200 (OK)
    expect(res.body).toHaveProperty('message', 'Seminar deleted successfully'); // Mengecek pesan response
  });

  afterAll(async () => {
    // Tutup koneksi database jika perlu
    // await db.end();
  });
});