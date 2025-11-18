const joi = require("joi");

const articleValidationSchema = joi.object({
    article_title: joi.string().max(50).required().messages({
        "string.empty" : "Article Title is required",
        "string.max": "The max length of article title is 50 characters"
    }),
    article_description: joi.string().max(100).required().messages({
        "string.empty": "Article Description is required",
        "string.max" : "The min length of article description is 100 characters",
    }),
    article_content: joi.string().required().messages({
        "string.empty": "Article Content is required",
    }),
    article_image: joi.object({
        size: joi.number().max(5*1024*1024).messages({
            "number.max": "the image size must not exceed 5Mo",
        }),
        mimetype: joi.string().valid("image/png", "image/jpeg", "image/jpg").messages({
            "any.allowOnly": "Only jpg, jpeg, png images are allowed",
        })
    }).required().messages({
        "object.base": "Article Image is required",
        "any.required": "Article Image is required",
    }),

});

module.exports = articleValidationSchema;