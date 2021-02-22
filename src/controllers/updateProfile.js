const User = require('../models/userModel');

//Helper to loop through body to restrict only allowed fields
const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => { //array
        if(allowedFields.includes(el)) newObj[el] = obj[el]
    });
    return newObj; 
}

const updateProfile = async (req, res) => {

    //1. Create error end point if user tries to POST password data
    if(req.body.password || req.body.user_status) return res.status(400).json({
        status: 'failed',
        message: 'This route is not for the intented purpose.'
    });

   try {
    //2. Update user's profile
    //Filter the input body
    const filteredBody = filterObj(req.body, 'name', 'email', 'role', 'industry', 'company_name');
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true, //to show the new data
        runValidators: true
    });
    res.status(200).json({
        status: 'success',
        data: updatedUser
    })
   } catch (err) {
       res.status(400).json({
        status: 'failed', 
        message: `Ooops, ${err.message}`});
   }  
}

module.exports = updateProfile;