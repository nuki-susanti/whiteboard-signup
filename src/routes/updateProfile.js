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


router
    .route('/profile')
    .get(verification, updateProfile)
    .patch(verification, validation.updateValidation, photo.uploadPhoto, photo.resizePhoto, updateProfile);


module.exports = router;