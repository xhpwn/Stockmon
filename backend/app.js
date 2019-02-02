const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connect("mongodb+srv://anubhav:T6bek5hY9SvNZm09@cluster0-giucm.mongodb.net/test?retryWrites=true")
    .then(() => {
        console.log("Connected to MongoDB Atlas.");
    })
    .catch(() => {
        console.log("Connection to database failed.");
    });

app.use((req, res, next) => {
    console.log("hi");
    next();
});

app.use((req, res, next) => {
    res.send('Works');
});

module.exports = app;