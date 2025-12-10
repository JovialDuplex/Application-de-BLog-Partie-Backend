const articleModel = require("../models/articleModel");
const categoryModel = require("../models/categoryModel");

const multer = require("multer");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

const addArticle = async (request, response) => {
    try{
        const token = request.headers.authorization.split(" ")[1];
        let userId;
        jwt.verify(token, process.env.TOKEN_KEY, {}, (error, decoded)=>{
            if(error) {
                console.log(error);
                return response.json({status: "error", error});
            } else {
                userId = decoded.id;
            }
        });

        const myArticle = await articleModel.create({
            article_title: request.body.article_title,
            article_description: request.body.article_description,
            article_content: request.body.article_content,
            article_image: request.file ? "/uploads/" + request.file.filename : "",
            article_category: request.body.article_category,
            article_author: userId,
        });
        console.log("article created successfully");
        response.json({
            status: "success",
            message: "Article Added",
            myArticle,
        });

    } catch (error) {
        console.log("error occured while creating article :", error);
        response.json({
            status: "error",
            error: error,
        });
    }

};

const showArticle = async (request, response) => {
  const articleId = request.params.articleId;

  const article = await articleModel.findById(articleId).populate("article_author").populate("article_category");
  if (!article) {
      response.json({
          status: "error",
          message: "Article not found",
      })
  } else {
      response.json({
          status: "success",
          message: "Article found",
          article,
      })
  }
};

const deleteArticle = async (request, response) => {
    try {
        const articleId = request.params.articleId;
        const article = await articleModel.findById(articleId);

        fs.unlink(path.join(__dirname, "..", "public", article.article_image), error=> {
            if(error){
                console.log("error occured while deleting file");
            } else {
                console.log("file deleting successfully");
            }
        });

        await articleModel.findByIdAndDelete(articleId);

        response.json({
            status: "success",
            message: "Article deleted successfully",
        });

    } catch(error) {
        response.json({
            status: "error",
            error: error,
        });
    }
}

const updateArticle = async (request, response) => {
    try{
        const articleId = request.params.articleId;
        const myarticle = await articleModel.findById(articleId);

        if(request.file){
            console.log("file uploaded");
            fs.unlink(path.join(__dirname, "..", "public", myarticle.article_image), (error)=>{
               if(error) {
                   console.log("le fichier n'existe plus");
               } else {
                   console.log("suppression reussite ");
               }
            });
        }

        const newArticle = await articleModel.findByIdAndUpdate(articleId, {
            ...request.body,
            article_image: request.file ? "/uploads/" + request.file.filename : myarticle.article_image,
        }, {new: true});

        console.log("article updated successfully");
        response.json({
            status: "success",
            message: "Article updated successfully",
            newArticle,
        });

    } catch(error){
        response.json({
            status: "error",
            error: error,
        })
    }


}

const showAll = async (request, response) => {
    const {category, author} = request.query;
    if(category){
        const articles = await articleModel.find({article_category : category}).populate("article_author").populate("article_category");
        response.json({articles});

    } else if(author) {
        const articles = await articleModel.find({article_author : author}).populate("article_author").populate("article_category");
        response.json({articles})
    }

    else {
        const articles = await articleModel.find({}).populate("article_author").populate("article_category");
        response.json({articles});
    }
}

const getUpdateArticle = async (request, response)=>{
    const article = await articleModel.findById(request.params.articleId);
    if(article){
        response.json({
            status: "success",
            message: "article find successfully",
            article,
        });
    }
    else {
        response.json({
            status: "error",
            message: "article not found",
        })
    }
}

const getArticleByCategory = async (request, response)=>{
    console.log(request.query);
    console.log(request.params);

    response.json({
        message : "okay"
    });
};

module.exports = {
    showAll,
    addArticle,
    showArticle,
    deleteArticle,
    updateArticle,
    getUpdateArticle,
    getArticleByCategory,
}