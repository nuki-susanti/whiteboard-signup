const multer = require('multer');
const sharp = require('sharp');


//Create MULTER Storage
// const multerStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'img/users');
//     },
//     filename: (req, file, cb) => {
//         //user-id-timestamp.jpeg
//         //uploading using id will overwrite the last one -> no same photo file
//         const ext = file.mimetype.split('/')[1]; // => /jpeg or anything else
//         cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//     }
// });

const multerStorage = multer.memoryStorage(); //image will be converted to buffer

//Create MULTER Filter to test if the uploaded image is an image
const multerFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb('Not an image. Please upload only image.', false);
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});
const uploadPhoto = upload.single('photo'); //Upload single photo

const resizePhoto = (req, res, next) => {
    if(!req.file) return next();

    req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

    //Use sharp to resize image
    sharp(req.file.buffer)
        .resize(500, 500) //make square image
        .toFormat('jpeg') //always convert to jpeg
        .jpeg({ quality: 90 })//jpeg quality 90%
        .toFile(`img/users/${req.file.filename}`);  //write it to the file

    next();
}


module.exports = {
    uploadPhoto,
    resizePhoto
};