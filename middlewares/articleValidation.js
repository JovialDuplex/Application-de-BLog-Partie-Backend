const articleValidationSchema = require("../validation/articleValidationSchema");
const fs = require("fs");

const addArticleMiddleware = (request, response, next)=>{
    const {error} = articleValidationSchema.validate({
        ...request.body,
        article_image: request.file ? {
            mimetype: request.file.mimetype,
            size: request.file.size,
        } : null
    }, {abortEarly: false});

    if(error){
        const details = error.details.map(detail => ({
            msg: detail.message,
            path: detail.path.join(".")
        }));

        if(request.file) {
            fs.unlink(request.file.path, error=>{
                if(error) {
                    console.log("error occured while deleting file");
                } else {
                    console.log("file deleted successfully")
                }
            });
        }

        response.json({
            status: "error",
            details,
        });
    }

    else {
        return next();
    }
};

module.exports = {addArticleMiddleware};
