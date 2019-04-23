const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const stockRoutes = require('./routes/stocks');


const app = express();

mongoose.connect("mongodb+srv://anubhav:T6bek5hY9SvNZm09@cluster0-giucm.mongodb.net/test?retryWrites=true")
  .then(() => {
    console.log("Connected to MongoDB Atlas.");
  })
  .catch(() => {
    console.log("Connection to database failed.");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });
  

app.use("/api/user", userRoutes);
app.use("/api/stocks", stockRoutes);


module.exports = app;
