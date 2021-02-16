const router = require('express').Router();
const googleAuth = require('../controllers/googleAuth');

router.get('/', (req, res) => {
    res.render("login")
});

//Google auth
router
    .route('/auth')
    .get('/google')



module.exports = router;