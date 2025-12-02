const router = require("express").Router();
const userRoute = require("./userRoute");
const articleRoute = require("./articleRoute");
const categoryRoute = require("./categoryRoute");

router.use("/users", userRoute);
router.use("/article", articleRoute);
router.use("/category", categoryRoute);
module.exports = router;