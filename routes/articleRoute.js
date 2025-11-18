const router = require("express").Router();
const {showArticle, addArticle, deleteArticle, updateArticle, showAll, getUpdateArticle} = require("../controllers/articleController");
const {protectRoute} = require("../middlewares/userAuth");
const multer = require("multer");
const {addArticleMiddleware} = require("../middlewares/articleValidation");
const path = require("path");

const upload = multer({
    storage: multer.diskStorage({
        destination: (request, file, callback) => {
            callback(null, path.join(__dirname, "..", "public", "uploads"));
        },
        filename: (request, file, callback) => {
            callback(null, Date.now()+ "_" + file.originalname);
        }
    }),

});

router.get("/", showAll);
router.get("/show/:articleId", showArticle);
router.get("/update/:articleId", protectRoute, getUpdateArticle);
router.post("/add", protectRoute, upload.single("article_image"), addArticleMiddleware, addArticle);
router.delete("/delete/:articleId", protectRoute, deleteArticle);
router.put("/update/:articleId",  protectRoute, upload.single("article_image"), updateArticle);

module.exports = router;