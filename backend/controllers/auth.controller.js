const {createUser , findUserByEmail} = require('../models/user.models');
const bcrypt = require('bcrypt');
const {createToken} = require('../utils/jwt.util');

exports.register = async (req, res) => {
    const {nama, email, password, role} = req.body;
    const userExists = await findUserByEmail(email);
    if (userExists) {
        return res.status(400).json({message: 'Email sudah terdaftar'});
    }

    await createUser(nama, email, password, role || 'user');
    res.status(201).json({message: 'User berhasil didaftarkan'});
};

exports.login = async (req, res) => {
    const {email, password} = req.body;
    const user = await findUserByEmail(email);
    if (!user) {
        return res.status(400).json({message: 'Email tidak ditemukan'});
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(400).json({message: 'Password salah'});
    }

    const token = createToken({id: user.user_id, role: user.role});
    res.json({token, role: user.role, nama: user.nama});
};
