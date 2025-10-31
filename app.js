require("dotenv").config();
require("./config/db"); // database connection

const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
   console.log("listening on port " + port);
});