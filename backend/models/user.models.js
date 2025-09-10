const db = require ('../database/db');
const bcrypt = require ('bcrypt');

const createUser = async (nama, email, password, role = 'user') => {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
        'INSERT INTO users (nama, email, password, role) VALUES (?, ?, ?, ?)',
        [nama, email, hashedPassword, role]
    );
};

const findUserByEmail= async (email) => {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
};

const getAllUsers = async () => {
    const [rows] = await db.query('SELECT user_id, nama, email, role, created_at FROM users');
    return rows;
};

module.exports = {
    createUser,
    findUserByEmail,
    getAllUsers
};