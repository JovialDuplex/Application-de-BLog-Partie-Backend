const categoryModel = require("../models/categoryModel");
const userModel = require("../models/userModel");

const jwt = require("jsonwebtoken");

const addCategory = async (request, response)=>{
    try{
        const category = await categoryModel.create({
            category_name: request.body.category_name,
            category_author: request.user._id,
        });
        await userModel.findByIdAndUpdate(request.user._id, {
            $push: {
                user_categories: category._id,
            }
        })
        response.json({
            status: "success",
            message: "Category created successfully",
            category,
        });

    } catch(error){
        return response.json({
            status: "error",
            error,
        })
    }

};

const getOneCategory = async (request, response)=>{
    const { categoryId } = request.params;
    try {
        const category = await categoryModel.findById(categoryId).populate("category_author");
        response.json({
            status: "success",
            message: "category found successfully",
            category,
        });

    } catch(error) {
        return response.json({
            status: "error",
            error,
        })
    }
};

const updateCategory = async (request, response)=> {

};

const deleteCategory = async (request, response)=>{
    const {categoryId} = request.params;
    try{
        await categoryModel.findByIdAndDelete(categoryId);
        response.json({
            status: "success",
            message: "Category deleted successfully",
        });

    } catch(error){
        return response.json({
            status: "error",
            error,
        });
    }
};

const getAllCategoriesOfUser = async (request, response)=>{

    const categories = await categoryModel.find({}).where({category_author: request.user._id}).populate("category_author");
    response.json({
        status: "success",
        categories,
    })
}

module.exports = {
    getOneCategory,
    getAllCategoriesOfUser,
    updateCategory,
    deleteCategory,
    addCategory,
}