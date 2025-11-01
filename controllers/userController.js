const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async function(request, response) {
    // get user data -------------
    console.log(request.body);

    const {user_email, user_password, user_name} = request.body;
    const userExists = await userModel.findOne({user_email});

    // check if user exist
    if (userExists) {
        response.status(400).send({message: "User already exists"});
        throw new Error("User already exists");
    }

    else {
        console.log("creating user ...");
        // hash password -------------
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user_password, salt);

        //creating user -------------
        const user = await userModel.create({
            user_email,
            user_password: hashedPassword,
            user_name,
        });
        // check if user was created
        if (user) {
            const token = jwt.sign({id: user._id}, process.env.TOKEN_KEY, {expiresIn: "1h"});

            response.status(200).send({
                message: "user creating successfully",
                user_data : user,
                token: token, // register token
            });

        } else {
            response.status(400).send({message: "creating user failed"});
        }
    }
};

const loginUser = async function(request, response) {
    const {user_email, user_password} = request.body;
    // get user from his email
    const user = await userModel.findOne({user_email});
    // check if user exists
    if (user) {
        // check password
        const checkPassword = await bcrypt.compare(user_password, user.user_password);
        if(checkPassword) {
            const token = jwt.sign({id: user._id}, process.env.TOKEN_KEY, {expiresIn: "1h"});

            response.status(200).json({
                message: "user login successful",
                user,
                token: token,
            });

        } else {
            console.log("user password is incorrect");
            response.status(400).json({message: "your email or password is incorrect"});
        }

    } else {
        console.log("user email is incorrect");
        response.status(400).send({message: "your email or password is incorrect"});
    }
};

const logOutUser = function(request, response) {
    response.json({"message": "user logged out"});
}
module.exports = {
    registerUser,
    logOutUser,
    loginUser,
};