const userRouter = require('./user');
const googleRouter = require('./googleAuth');
const updateProfileRouter = require('./updateProfile');


module.exports = {
    userRouter,
    googleRouter,
    updateProfileRouter
};