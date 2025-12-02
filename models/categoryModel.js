const mongoose = require("mongoose");
const mongooseType = mongoose.Schema.Types;

const categorySchema = mongoose.Schema({
    category_name: {
        type: mongooseType.String,
        required: true,
    },
    category_author: {
        type: mongooseType.ObjectId,
        ref: "User",
        required: true,
    }
});

module.exports = mongoose.model("Category", categorySchema);