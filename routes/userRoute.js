const router = require("express").Router();
const userController = require("../controllers/userController");
const userMiddleware = require("../middlewares/userValidation");
const {protectRoute} = require("../middlewares/userAuth")
const jwt = require("jsonwebtoken");

// routes for manage users
router.post("/login", userMiddleware.loginValidationMiddleware,userController.loginUser);
router.post("/register", userMiddleware.registerValidationMiddleware, userController.registerUser);
router.get("/get-user/:userId", protectRoute, userController.getUser);
router.post("/check-token", async (request, response)=>{
    const {token} = request.body;
    if(token) {
        console.log(token);
        jwt.verify(token, process.env.TOKEN_KEY,{}, (error, decode)=>{
            if(error){
                console.log(error);
                response.json({error:true, message: "the token has expired, please login again"});
            } else {
                console.log(decode)
                response.json({error: false, msg: "the token is still valid", userId: decode.id});
            }
        });
    }
    else {
        console.log("no token");
        response.json({msg: "no token"});
    }
});

module.exports = router;