const jwt = require('jsonwebtoken');

const signToken = (id) => {

    //Generate TOKEN
    return jwt.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: process.env.TOKEN_EXPIRATION
    });
};


module.exports = signToken;