const router = require('express').Router();
const passport = require('passport');


//Auth using google account
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));



module.exports = router;