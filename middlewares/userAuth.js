const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const protectRoute = function (request, response, next) {
    const token = request.headers.authorization;
    if (!token) {
        return response.status(401).json({
            message : "user unauthorized"
        });
    }

    //check token
    jwt.verify(token, process.env.TOKEN_KEY, async (error, decoded)=>{
        if (error) {
            return response.status(401).json({
                message : "token invalid",
            });
        }
        console.log(decoded);
        const user = await userModel.findById(decoded.id);
        console.log(user);
        request.user = user;
        next();
    })
};

module.exports = {protectRoute};