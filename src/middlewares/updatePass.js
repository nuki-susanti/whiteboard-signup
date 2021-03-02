const bcrypt = require('bcrypt');

const User = require('../models');
const { signToken, cookieOptions} = require('../services/auth');

//Update password when user is logged in. Without forgot-password route
//IMPORTANT: findByIdAndUpdate will not work because it wont trigger 'pre save()' function

const updatePassword = async (req, res, next) => {

    const { current_password, new_password } = req.body;

    try {
        //IMPORTANT: Check if the user logged in is the real user -> confirm the old password!
        //1. Get user from collections
        const userExist = await User.findById(req.user.id).select('+password');

        //2. Check if POSTed current password is correct
        const isPassTrue = await bcrypt.compare(current_password, userExist.password); //-> TRUE

        //3. If it is correct
        if(!isPassTrue) return res.status(401).send('Your current password is wrong.');

        //4. new_password can not be equal to the old password (userExist.password a.k.a current password)
        if(new_password === current_password) return res.status(401).send('This is your old password. Please pick the new one.');

        //5. Update password
        //Password is automatically hashed by 'pre save()' function
        userExist.password = new_password;
        await userExist.save();

        //6. Logged the user in -> send JWT token
        const token = signToken(userExist._id);

        return res.status(201).json({
            status: 'success',
            message: `Hi ${userExist.name}, your password has been successfully updated.`,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: 'failed',
            message: error.message
        });
    }
};

module.exports = updatePassword;