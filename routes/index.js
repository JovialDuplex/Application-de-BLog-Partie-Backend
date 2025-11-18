const router = require("express").Router();
const userRoute = require("./userRoute");
const articleRoute = require("./articleRoute");

router.use("/users", userRoute);
router.use("/article", articleRoute);

module.exports = router;