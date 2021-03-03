const passport = require('passport');
// const GooglePlusTokenStrategy = require('passport-google-plus-token');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

const User = require('../models/userModel');

passport.serializeUser((user, done) => {
    done(null, user.id); //sending out only user.id in the cookie to the browser. null is error
}); //cookie encrypted

passport.deserializeUser( async (id, done) => {
    const user = await User.findById(id); //search the user in the DB based on the info in cookie
    // console.log(user);
    done(null, user); // then grant access to redirect
});

//Use google strategy
module.exports = passport.use('google',
    new GoogleStrategy({
        //Options for strategy
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'https://whiteboard-signup.herokuapp.com/auth/google/redirect'
    }, async (accessToken, refreshToken, profile, done) => {
        //Passport callback function
        try {
           // console.log(profile.emails[0]['value']);
            const userProfile = {
                googleId: profile.id, 
                name: profile.displayName,
                email: profile.emails[0]['value']
            }
        
            await User.findOrCreate({ googleId: userProfile.id, name: userProfile.name, email: userProfile.email },
                (err, user) => {
                user.save({ validateBeforeSave: false });
                done(null, user);
            }); 
        } catch (error) {
            done(error, false, error.message);
        }
    })
);


// Google OAuth Strategy
// module.exports = passport.use('googleToken', new GooglePlusTokenStrategy({
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//   }, async (accessToken, refreshToken, profile, done) => {
//       console.log('accessToken', accessToken);
//       console.log('refreshToken', refreshToken);
//       console.log('profile', profile);

//       //Passport callback function
//         try {
//            // console.log(profile.emails[0]['value']);
//             console.log(accessToken, refreshToken);
//             const userProfile = {
//                 googleId: profile.id, 
//                 name: profile.displayName,
//                 email: profile.emails[0]['value']
//             }
        
//             await User.findOrCreate({ googleId: userProfile.id, name: userProfile.name, email: userProfile.email },
//                 (err, user) => {
//                 user.save({ validateBeforeSave: false });
//                 user.accessToken = accessToken;
//                 done(null, user);
//             }); 
//         } catch (error) {
//             done(error, false, error.message);
//         }
// }));