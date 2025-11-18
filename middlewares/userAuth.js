const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const protectRoute = function (request, response, next) {
    const token = request.headers.authorization;
    if (!token) {
        return response.json({
            message : "user unauthorized"
        });
    }

    //check token
    jwt.verify(token, process.env.TOKEN_KEY, async (error, decoded)=>{
        if (error) {
            return response.json({
                message : "invalid token, user unauthorized",
                error
            });
        } else {
            const user = await userModel.findById(decoded.id);
            request.user = user;
            next();
        }
    })
};

module.exports = {protectRoute};