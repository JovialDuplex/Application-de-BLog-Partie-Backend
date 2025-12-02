const mongoose = require("mongoose");
const mongooseType = mongoose.Schema.Types;

const userSchema = mongoose.Schema({
    user_name: {
        type: mongooseType.String,
        required: true,
    },
    user_email: {
        type: mongooseType.String,
        required: true,
        unique: true,
    },
    user_password: {
        type: mongooseType.String,
        required: true,
    },
    user_categories: [
        {
            type: mongooseType.ObjectId,
            ref: "Category",
        }
    ]
});

// export model
module.exports = mongoose.model("User", userSchema);
