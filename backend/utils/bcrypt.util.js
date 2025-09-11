// Import library bcrypt untuk hashing password
const bcyrpt = require('bcrypt');

// Fungsi untuk mengenkripsi password
const hashPassword = async (password) => {
    // Generate salt untuk proses hashing
    const salt = await bcyrpt.genSalt(10);
    // Hash password dengan salt
    const hashedPassword = await bcyrpt.hash(password, salt);
    return hashedPassword;
};

// Fungsi untuk membandingkan password dengan hash di database
const comparePassword = async (password, hashedPassword) => {
    // Bandingkan password plain dengan hash
    const isMatch = await bcyrpt.compare(password, hashedPassword);
    return isMatch;
};  

// Ekspor fungsi hashPassword dan comparePassword
module.exports = {
    hashPassword,
    comparePassword
};