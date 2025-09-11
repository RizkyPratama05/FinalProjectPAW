// Import library jsonwebtoken untuk membuat dan memverifikasi JWT
const jwt = require('jsonwebtoken');
// Load variabel environment dari file .env
require('dotenv').config();

// Ambil secret key dari environment
const JWT_SECRET = process.env.JWT_SECRET;

// Fungsi untuk membuat token JWT
const createToken = (payload) =>{
    // Membuat token dengan payload dan secret, berlaku 8 jam
    return jwt.sign(payload, JWT_SECRET, {expiresIn: '8h'});
};

// Fungsi untuk memverifikasi token JWT
const verifyToken = (token)=>{
    try{
        // Verifikasi token, jika valid kembalikan payload
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    }catch(err){
        // Jika token tidak valid, kembalikan null
        return null;    
    }
};

// Ekspor fungsi createToken dan verifyToken
module.exports = {
    createToken,
    verifyToken
};