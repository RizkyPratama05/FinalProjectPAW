const request = require('supertest');
const app = require('../server');
const jwt = require('jsonwebtoken');

const userPayload = { user_id: 2, email: 'admin@example.com', role: 'admin' }; 
const token = jwt.sign(userPayload, process.env.JWT_SECRET);

describe('DELETE /api/seminar/:seminar_id', () => {
  it('should delete seminar and return success message', async () => {
    const seminarId = 1;
    const res = await request(app)
      .delete(`/api/seminar/${seminarId}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Seminar deleted successfully');
  });

  afterAll(async () => {
    // Tutup koneksi database jika perlu
    // await db.end();
  });
});