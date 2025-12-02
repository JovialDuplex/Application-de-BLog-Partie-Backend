const router = require("express").Router();
const {protectRoute} = require("../middlewares/userAuth");
const {addCategoryMiddleware} = require("../middlewares/categoryValidation");
const categoryController = require("../controllers/categoryController");

router.post("/add", protectRoute, addCategoryMiddleware, categoryController.addCategory);
router.get("/", protectRoute, categoryController.getAllCategoriesOfUser);
router.get("/show/:categoryId", protectRoute, categoryController.getOneCategory);
router.put("/update/:categoryId", protectRoute, categoryController.updateCategory);
router.delete("/delete/:categoryId", protectRoute, categoryController.deleteCategory);

module.exports = router;