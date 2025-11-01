const joi = require("joi");

const validationRegisterSchema = joi.object({
    user_email : joi.string().email().required().messages({
        "string.empty" : "Please enter your email address",
        "string.email" : "Please enter a valid email",
    }),

    user_name : joi.string().required().messages({
        "string.empty" : "Please enter your name",
    }),

    user_password : joi.string().required().messages({
        "string.empty" : "Please enter your password",
    })
});

const validationLoginSchema = joi.object({
    user_email : joi.string().email().required().messages({
        "string.empty" : "Please enter your email address",
        "string.email" : "Please enter a valid email",
    }),

    user_password : joi.string().required().messages({
        "string.empty" : "Please enter your password",
    })

});

module.exports = {
    validationRegisterSchema,
    validationLoginSchema,
};