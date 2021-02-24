const router = require('express').Router();
const passport = require('passport');


//Auth using google account
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/auth/facebook/redirect', passport.authenticate('facebook'), async (req, res) => {
    //res.send(req.user)

    res.status(200).json({
        status: 'success',
        message: `Hi ${req.user.name}! You are logged in`,
        data: req.user
    });
});



module.exports = router;