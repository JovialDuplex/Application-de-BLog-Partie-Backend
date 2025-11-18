const mongooseType = require("mongoose").Schema.Types;
const mongoose = require("mongoose");
const multer = require("multer");

const articleSchema = mongoose.Schema({
    article_title: {
        type: mongooseType.String,
        required: true,
        maxlength: 25
    },

    article_content: {
        type: mongooseType.String,
        required: true,
    },

    article_description: {
        type: mongooseType.String,
        required: true,
        maxlength: 100
    },

    article_image: {
        type: mongooseType.String,
        required: true,
    },

    article_dateCreation : {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("Article", articleSchema);