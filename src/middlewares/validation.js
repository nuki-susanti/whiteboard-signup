const Joi = require('joi');

const validateBody = (req, res, next) => {
    const { body } = req;

    const signupSchema = Joi.object({
        name: Joi.string().regex(/^[a-zA-Z]/).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required(),
        reset_password: Joi.date(),
        user_status: Joi.string()
    });

    const validateBody = signupSchema.validate(body);

    if(!validateBody.error) {
        next();
    } else {

        res.status(500).json({
            status: 'Validation failed',
            message: validateBody.error.details[0].message
        });
    }
};

module.exports = validateBody;