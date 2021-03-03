const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const findOrCreate = require('mongoose-findorcreate');

const User = require('../models/userModel');


//Use facebook strategy
module.exports = passport.use(
    new FacebookStrategy({
        //Options for strategy
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: 'https://whiteboard-signup.herokuapp.com/auth/facebook/redirect',
        profileFields: ['id', 'emails', 'name']
    }, async (accessToken, refreshToken, profile, done) => {
        //Passport callback function
     
        const userProfile = {
            facebookId: profile.id, 
            name: `${profile.name.givenName} ${profile.name.familyName}`,
            email: profile.emails[0]['value']
        }
        console.log(accessToken, userProfile);
    
        await User.findOrCreate({ facebookId: userProfile.id, name: userProfile.name, email: userProfile.email },
            (err, user) => {
            user.save({ validateBeforeSave: false });
            user.accessToken = accessToken;
            done(null, user);
        })
    })
);