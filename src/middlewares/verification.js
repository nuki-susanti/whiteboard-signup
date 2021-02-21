const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

//General purpose: check if user has signed up / logged in, thus, generate token

const verifyToken = async (req, res, next) => {
    //1. Getting token and check if token is there
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token) {
        return res.status(401).json({status: 'failed', message: 'You are not logged in'});
    }

    //2. Verifying token
    let decodedUser;
    const decoded = await jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if(err) {
            // console.log(err.message);
            return res.status(401).send('Ooops something went wrong');
        };

        decodedUser = user;
    });

    //3. Check if user still exists
    const currentUser = await User.findById(decodedUser.id, (err, user) => {
        decodedUser.reset_password = user.reset_password;
    });
    if(!currentUser) {
        return res.status(401).send('User no longer exists');
    }

    //4. Check if user changed password after token was issued
    if(decodedUser.reset_password) {
        const convertTimestamp = parseInt(
            decodedUser.reset_password.getTime() / 1000, 10); //convert reset in date to second then return as integer
        
        if (decodedUser.iat < convertTimestamp) 
        return res.status(401).json({status: 'failed', message: 'Password has changed. Please log in again.'});
    }

    //Default false -> password not changed decodedUser.iat > convertTimestamp
    //No problem at all? -> Call next() to grant access
    req.user = currentUser; //here: all data from the user
    next();
};

module.exports = verifyToken;