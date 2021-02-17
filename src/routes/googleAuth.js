const router = require('express').Router();
const passport = require('passport');


//Auth using google account
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/redirect', passport.authenticate('google'), (req, res) => {
    //res.send(req.user)
    res.status(200).json({
        status: 'success',
        message: `Hi ${req.user.name}! You are logged in`,
        data: req.user
    });
});



module.exports = router;