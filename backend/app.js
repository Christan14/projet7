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

    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error:", err.message);
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // * signifie toutes les origines
  res.setHeader("Access-Control-Allow-Credentials", "true"); // autorise l'envoi de cookies
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );// autorise l'envoi des en-têtes
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  ); // permet d'envoyer des méthodes
  next();
});

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json()); // pour analyser application/json
app.use(express.urlencoded({ extended: true })); // pour l'analyse de l'application/x-www-form-urlencoded
app.use(cockiesPraser()); // pour analyser les cookies

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/auth", userRoutes);
app.use("/api/posts", postRoutes);

module.exports = app;
