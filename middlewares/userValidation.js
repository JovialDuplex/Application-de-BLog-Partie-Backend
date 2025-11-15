const {
    validationLoginSchema,
    validationRegisterSchema
} = require("../validation/userValidationSchema");


const registerValidationMiddleware = (request, response, next)=>{
    const {error} = validationRegisterSchema.validate(request.body, {abortEarly: false});

    if(error) {
        const errorList = error.details.map(detail => (
            {
                message: detail.message,
                path: detail.path.join(".")
            }
        ));
        console.log(errorList);
        return response.json({error: true, errorList: errorList});

    } else {
        console.log("not error occured");
        return next();
    }
};

const loginValidationMiddleware = (request, response, next)=>{
    const {error} = validationLoginSchema.validate(request.body, {abortEarly: false});
    if(error) {
        
        const errorList = error.details.map(detail => (
            {
                message: detail.message,
                path: detail.path.join(".")
            }
        ));

        console.log(errorList);
        return response.json({error:true, errorList: errorList});

    } else {
        console.log("no error occured");
        return next();
    }
};

module.exports = {
    registerValidationMiddleware,
    loginValidationMiddleware
};