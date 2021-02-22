const bcrypt = require('bcrypt');

const User = require('../models/userModel');
const signToken = require('../services/auth');

const userControllers = {
    signup: async (req, res) => {
        const { body } = req;

        //check if this user already registered in the database
        const userExist = await User.findOne({ email: body.email });

        try {        
            if(userExist) {
                return res.status(400).json({status: 'failed', message: `${body.email} is already registered`});
            } else {
                let newUser = await User.create(body)

                //Generate TOKEN
                const token = signToken(newUser._id);

                res.status(200).json({
                    status: 'success',
                    message: `Thank you ${newUser.name} for signing up`,
                    token,
                    data: {
                        user: newUser
                    }
                }); 
            }   
        } catch (err) {

            res.status(500).json({
                status: 'failed',
                message: err.message
            });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;
        
        try{
            if(!email || !password) {
                return res.status(400).json({status: 'failed', message: 'Please provide email and password'});
            }

            //check if this user already registered in the database
            const userExist = await User.findOne({ email, active: { $ne: false }}).select('+password'); //include password

            if(!userExist || !await bcrypt.compare(password, userExist.password)) {
                return res.status(401).json({status: 'failed', message: 'Incorrect email or password'});
            } else {
                //Generate TOKEN
                const token = signToken(userExist._id);

                return res.status(200).json({
                    status: 'success',
                    message: `Welcome back, ${userExist.name}!`,
                    token
                });
            }         
        } catch (err) {

            res.status(500).json({
                status: 'failed',
                message: err.message
            });
        }
    },
    
    getAllUsers: async (req, res) => {

        const users = await User.find().select('+active');

        res.status(200).json({
            status: 'success',
            results: users.length,
            data: users
        });
    },

    deleteAccount: async (req, res) => {
        //Do not delete from the DB, but make it only inactive -> could be reactivate
        //Put 'active flag to 'false'

        try{
            await User.findByIdAndUpdate(req.user.id, { active: false });

            res.status(204).json({
                status: 'success',
                message: 'Your account has been deleted',
                data: null
            });

        } catch (err) {
            res.status(500).json({
                status: 'failed',
                message: err.message
            });
        }
    }
}

module.exports = userControllers;