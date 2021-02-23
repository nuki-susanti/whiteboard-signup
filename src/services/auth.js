const jwt = require('jsonwebtoken');

const signToken = (id) => {

    //Generate TOKEN
    return jwt.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: process.env.TOKEN_EXPIRATION
    });
};

//Stuff JWT into the cookie
const cookieOptions = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), //cookie for 1d
    httpOnly: true //cookie can not be accessed or modified in any way by the browser
};

if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
//cookie will be sent in a encrypted connection (secure: true)


module.exports = {
    signToken,
    cookieOptions
};