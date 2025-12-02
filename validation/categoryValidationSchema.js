const joi = require("joi");

const categoryValidationSchema = joi.object({
    category_name: joi.string().required().messages({
        "string.empty": "Please enter the name of the article category"
    }),
});

module.exports = categoryValidationSchema;