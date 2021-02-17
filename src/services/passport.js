const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


//Use google strategy
module.exports = passport.use
    (new GoogleStrategy({
        //Options for strategy
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'auth/google/redirect'
    }, () => {
        //Passport callback function

    })
)