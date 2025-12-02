const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const protectRoute = function (request, response, next) {
    console.log(request.headers.authorization);
    const token = request.headers.authorization.split(" ")[1];
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
            console.log(user);
            next();
        }
    })
};

module.exports = {protectRoute};