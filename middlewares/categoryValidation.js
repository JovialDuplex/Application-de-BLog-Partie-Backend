const categoryValidationSchema = require("../validation/categoryValidationSchema");

const addCategoryMiddleware = (request, response, next)=>{
    const {error} = categoryValidationSchema.validate(request.body, {abortEarly: false});
    if(error){
        const details = error.details.map(detail=>(
            {
                msg: detail.message,
                path: detail.path,
            }
        ));
        return response.json({
            status: "error",
            details,
        });
    } else {
        console.log("no error occurred when adding category off article");
        return next();
    }
};

module.exports = {
    addCategoryMiddleware,
}