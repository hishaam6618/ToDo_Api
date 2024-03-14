// import express from 'express';
const exprss = require("express");
const app = exprss();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fs = require("node:fs");

/////
const toDoRoutes = require("./api/routes/todo");

mongoose.connect(
  `mongodb+srv://hisham6618:70sWsp2LVtXLKRcd@todoapi.e4zcdi3.mongodb.net/api?retryWrites=true&w=majority`
);
// mongoose.connect("mongodb://localhost:27017/rest_api");

mongoose.Promise = global.Promise;
app.use(morgan("dev"));
app.use(exprss.static(__dirname + "/home"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

//////
app.use("/toDoApi", toDoRoutes);

app.use((req, res, next) => {
  ///1
  // res.writeHead(200, { "Contetent-Type": "text/html" });
  fs.createReadStream(__dirname + "/home/index.html").pipe(res);
  ///2
  // const html = fs.readFileSync(__dirname + "/api/index.html", "utf-8");
  // res.status(200).end(html);
  ///3
  // const error = new Error("Not Found");
  // error.status = 404;
  // next(res.status(200).json(response));
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
