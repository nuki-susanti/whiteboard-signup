const router = require('express').Router();

const userControllers = require('../controllers/user');
const {
    validation,
    verification,
    authentication,
    forgotResetPassword,
    updatePassword,
    photo,
    googleSignIn
} = require('../middlewares');


router.post('/signup', validation.validateBody, userControllers.signup);
router.post('/login', userControllers.login);
router.post('/forgot-password', forgotResetPassword.forgotPassword); //send token email-address
router.patch('/reset-password/:token', forgotResetPassword.resetPassword); //receive back token & update new password
router.patch('/update-my-password', verification, updatePassword); //update password when user is already logged in
router.delete('/delete-account', verification, userControllers.deleteAccount) //delete account -> put inactive

router
    .route('/users')
    .get(verification, authentication('admin'), userControllers.getAllUsers)
    



module.exports = router;