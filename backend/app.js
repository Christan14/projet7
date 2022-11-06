const express = require("express");
const mongoose = require("mongoose");
const cockiesPraser = require("cookie-parser");
require("dotenv").config();
const path = require("path");
const cors = require("cors");

const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");

const app = express();

mongoose
  .connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-shard-00-00.8ayts.mongodb.net:27017,cluster0-shard-00-01.8ayts.mongodb.net:27017,cluster0-shard-00-02.8ayts.mongodb.net:27017/${process.env.DB_DATA};?ssl=true&replicaSet=atlas-c813mu-shard-0&authSource=admin&retryWrites=true&w=majority`,
    //"mongodb+srv://Marc:Marc@cluster0.8ayts.mongodb.net/Marc?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error:", err.message);
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // * means all origins
  res.setHeader("Access-Control-Allow-Credentials", "true"); // allows cookies to be sent
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  ); // allows headers to be sent
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  ); // allows methods to be sent
  next();
});

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cockiesPraser()); // for parsing cookies

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/auth", userRoutes);
app.use("/api/posts", postRoutes);

module.exports = app;
