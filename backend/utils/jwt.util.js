const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const createToken = (payload) =>{
    return jwt.sign(payload, JWT_SECRET, {expiresIn: '8h'});
};

const verifyToken = (token)=>{
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    }catch(err){
        return null;    
    }
};

module.exports = {
    createToken,
    verifyToken
};