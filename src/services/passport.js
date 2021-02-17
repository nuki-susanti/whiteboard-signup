const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

const User = require('../models/userModel');

passport.serializeUser((user, done) => {
    done(null, user.id); //sending out only user.id in the cookie
});

passport.deserializeUser( async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
})


//Use google strategy
module.exports = passport.use(
    new GoogleStrategy({
        //Options for strategy
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'https://whiteboard-signup.herokuapp.com/auth/google/redirect'
    }, async (accessToken, refreshToken, profile, done) => {
        //Passport callback function
        // console.log(profile.emails[0]['value']);
        const userProfile = {
            googleId: profile.id, 
            name: profile.displayName,
            email: profile.emails[0]['value']
        }
    
        await User.findOrCreate({ googleId: userProfile.id, name: userProfile.name, email: userProfile.email },
            (err, user) => {
            user.save({ validateBeforeSave: false });
            // console.log(user);
            done(null, user);
        })
    })
);
