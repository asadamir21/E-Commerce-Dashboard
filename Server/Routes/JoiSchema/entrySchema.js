const Joi = require('joi');

const loginSchema = Joi.object({
    UserID: Joi.string().required(),
    UserPassword: Joi.string().required(),
    UserHashedPassword: Joi.string().required(),
})

// const userProfileSchema = Joi.object({
//     fullName: Joi.string().min(3).max(50),
//     email: Joi.string().email(),
//     status: Joi.string()
// })



module.exports = {
    loginSchema,
}


