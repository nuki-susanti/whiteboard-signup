const userRouter = require('./user');
const updateProfileRouter = require('./updateProfile');
const googleRouter = require('./googleAuth');
const facebookRouter = require('./facebookAuth');



module.exports = {
    userRouter,
    updateProfileRouter,
    googleRouter,
    facebookRouter
};