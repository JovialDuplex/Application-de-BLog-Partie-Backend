const router = require("express").Router();
const userController = require("../controllers/userController");
const userMiddleware = require("../middlewares/userValidation");
const {protectRoute} = require("../middlewares/userAuth")

// routes for manage users
router.post("/login", userMiddleware.loginValidationMiddleware,userController.loginUser);
router.post("/register", userMiddleware.registerValidationMiddleware, userController.registerUser);
router.get("/getmyself", protectRoute, (req, res)=>{
    res.json("user authorized ");
})
router.get("/logout", userController.logOutUser);

module.exports = router;