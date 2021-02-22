const router = require('express').Router();

const {
    validation,
    verification,
    authentication,
    forgotResetPassword,
    updatePassword,
    photo
} = require('../middlewares');
const updateProfile = require('../controllers/updateProfile');


router.patch('/profile', 
    verification, validation.updateValidation, photo.uploadPhoto, photo.resizePhoto, updateProfile);


module.exports = router;