const bcyrpt = require('bcrypt');
const hashPassword = async (password) => {
    const salt = await bcyrpt.genSalt(10);
    const hashedPassword = await bcyrpt.hash(password, salt);
    return hashedPassword;
};

const comparePassword = async (password, hashedPassword) => {
    const isMatch = await bcyrpt.compare(password, hashedPassword);
    return isMatch;
};  

module.exports = {
    hashPassword,
    comparePassword
};