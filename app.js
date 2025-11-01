require("dotenv").config();
require("./config/db"); // database connection
const express = require("express");
const myrouter = require("./routes/index");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", myrouter);
const port = process.env.PORT || 3000;

app.listen(port, ()=>{
   console.log("listening on port " + port);
});