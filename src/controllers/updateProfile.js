const mongoose = require('mongoose');
const Grid = require('gridfs-stream'); //Allows streaming of files to and from mongodb
const User = require('../models/userModel');
const methodOverride = require('method-override');
const connect = mongoose.createConnection(process.env.DATABASE, 
    { useUnifiedTopology: true, useNewUrlParser: true})

// Init gfs
let gfs;

connect.once('open',() => {
    // Init stream
    gfs = Grid(connect.db, mongoose.mongo);
    gfs.collection('uploads');
});


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

    if(req.file) filteredBody.photo = req.file.filename;

    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true, //to show the new data
        runValidators: true
    });

    // const image = gfs.createReadStream(req.user.photo);
    // image.pipe(res);

    res.status(200).json({
        status: 'success',
        data: updatedUser || req.user
    })
   } catch (err) {
       res.status(400).json({
        status: 'failed', 
        message: `Ooops, ${err.message}`});
   }  
}

module.exports = updateProfile;