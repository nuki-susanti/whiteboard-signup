const router = require('express').Router();

const {
    validation,
    verification,
    authentication,
    forgotResetPassword,
    updatePassword
} = require('../middlewares');
const updateProfile = require('../controllers/updateProfile');


router.patch('/update-profile', verification, validation.updateValidation, updateProfile);


module.exports = router;