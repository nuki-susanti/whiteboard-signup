const router = require('express').Router();
const passport = require('passport');

const { signToken, cookieOptions} = require('../services/auth');



//Auth using google account
router.get('/auth/google', passport.authenticate( 'google', { scope: ['profile', 'email']} ));
// router.post('/auth/google', passport.authenticate('googleToken', { session: false }), googleSignIn); //post access token
router.get('/auth/google/redirect', passport.authenticate('google'), async (req, res) => {
    //res.send(req.user)
    const token = signToken(req.user.id);

    //Stuff JWT into the cookie
    res.cookie('jwt', token, cookieOptions);
    res.status(200).json({
        status: 'success',
        message: `Welcome to WHITEBOARD, ${req.user.name}`,
        data: req.user,
        token
    });
});



module.exports = router;