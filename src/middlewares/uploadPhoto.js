const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const sharp = require('sharp');
const path = require('path');

// Create storage engine
const multerStorage = new GridFsStorage({
    url: process.env.DATABASE,
    file: (req, file) => {
        const ext = file.mimetype.split('/')[1]; // => /jpeg or anything else
        return {
            filename : `${req.user.name}.${ext}` //user-id-timestamp.jpeg
        }
    }
});

//Create MULTER Filter to test if the uploaded image is an image
const multerFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb('Not an image. Please upload only image.', false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});
const uploadPhoto = upload.single('photo'); //Upload single photo



const resizePhoto = (req, res, next) => {

    if(!req.file) return next();

    filename = `${req.user.name}.jpeg`;

    //Use sharp to resize image
    sharp(req.file)
        .resize(400, 400) //make square image
        .toFormat('jpeg') //always convert to jpeg
        .jpeg({ quality: 70 })//jpeg quality 90%
        // .toFile(filename);  //write it to the file

    next();
}


module.exports = {
    uploadPhoto,
    resizePhoto
};