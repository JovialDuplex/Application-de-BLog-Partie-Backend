require("dotenv").config();
require("./config/db"); // database connection
const express = require("express");
const myrouter = require("./routes/index");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// configuration directory of static file
// app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "public")));

app.use((request, response, next)=>{
   console.log(request.method, request.url);
   next();
});

app.use("/api", myrouter);
const port = process.env.PORT || 3000;

app.listen(port, ()=>{
   console.log("listening on port " + port);
});