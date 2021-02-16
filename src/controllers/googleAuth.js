const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

const User = require('../models');

//Use google strategy
passport.use(new GoogleStrategy({
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/whiteboard",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

const googleAuth = (req, res) => {

  passport.authenticate('google', { scope: 'profile'});
};




module.exports = googleAuth;