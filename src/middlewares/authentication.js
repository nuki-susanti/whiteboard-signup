//Purpose: verify if user logged in admin or regular user -> restrict access

const authentication = (...user_status) => { //catch the user_status from the former middleware: verification
    return (req, res, next) => {
        //user_status is an array ['user', 'admin']
        if(!user_status.includes(req.user.user_status)) {
            return res.status(403).send('You are unauthorized to proceed.'); //forbidden
        }

        next();
    }
}

module.exports = authentication;