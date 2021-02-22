const Joi = require('joi');


const validateBody = (req, res, next) => {
    const { body } = req;

    const signupSchema = Joi.object({
        name: Joi.string().regex(/^[a-zA-Z\s]+$/).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required(),
        reset_password: Joi.date(),
        user_status: Joi.string()
    });

    const validateBody = signupSchema.validate(body);

    if(!validateBody.error) {
        next();
    } else {
        console.log(validateBody.error);

        res.status(400).json({
            status: 'failed',
            message: `Invalid ${validateBody.error.details[0].path}`
        });
    }
};

const updateValidation = (req, res, next) => {
    const { name, email } =  req.body;

    const updatedSchema= Joi.object({
        name: Joi.string().regex(/^[a-zA-Z]+$/),
        email: Joi.string().email(),
    });

    const updateBody = updatedSchema.validate({name, email});

    if(!updateBody.error) {
        next();
    } else {
        res.status(400).json({
            status: 'failed',
            message: `Invalid ${updateBody.error.details[0].path}`
        });
    }
} 

module.exports = {
    validateBody,
    updateValidation
};