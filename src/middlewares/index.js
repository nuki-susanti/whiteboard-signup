const validateBody = require('./validation');
const verification = require('./verification');
const authentication = require('./authentication');
const forgotResetPassword = require('./forgotResetPass');
const updatePassword = require('./updatePass');

module.exports = {
    validateBody,
    verification,
    authentication,
    forgotResetPassword,
    updatePassword
}