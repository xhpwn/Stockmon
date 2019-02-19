const express = require('express');
const https = require('https');
const axios = require('axios');
const json = require('circular-json');
const url = require('url');

const User = require('../models/user');

const router = express.Router();

/* THINGS TO THINK ABOUT: 
    1. What if the user is trying to add the same stock?
    2. Should I send a message back to user if the stock was successfully added to the list?
*/
router.post("/addstock", (req, res, next) => {
  console.log(req.body.email)
  console.log(req.body.company)
  User.find({ "email": req.body.email }, function (err, obj) {
    if (err) {
      res.send(err)
    }
    else {
      // console.log(obj)
      var updatedStocks = obj[0].stocks
      let index = updatedStocks.indexOf(req.body.company)
      console.log("index = " + index)
      if (index === -1) {
        updatedStocks.push(req.body.company)
        User.updateOne({ "email": req.body.email }, { $set: { "stocks": updatedStocks } })
          .then(
            res.status(200).send(updatedStocks.toString() + "\nStock has been successfully added")
          )
      } else {
        res.status(200).send("You already follow this stock")
      }
    }
  })
});

router.post("/removestock", (req, res, next) => {
  console.log(req.body.email)
  console.log(req.body.company)
  User.find({ "email": req.body.email }, function (err, obj) {
    if (err) {
      res.send(err)
    }
    else {
      var updatedStocks = obj[0].stocks
      let index = updatedStocks.indexOf(req.body.company)
      updatedStocks.splice(index, 1)
      User.updateOne({ "email": req.body.email }, { $set: { "stocks": updatedStocks } })
        .then(
          res.send("Your stock is removed")
        )
        .catch(err => {
          res.send(err)
        })
    }
  })
});

router.get("/getinfocus", (req, res, next) => {
  axios.get("https://api.iextrading.com/1.0/stock/market/list/infocus")
    .then(response => {
      res.status(200).send(json.stringify(response.data));
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/getgainers", (req, res, next) => {
  axios.get("https://api.iextrading.com/1.0/stock/market/list/gainers")
    .then(response => {
      res.status(200).send(json.stringify(response.data));
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/getlosers", (req, res, next) => {
  axios.get("https://api.iextrading.com/1.0/stock/market/list/losers")
    .then(response => {
      res.status(200).send(json.stringify(response.data));
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/test", (req, res, next) => {
  axios.get("https://api.iextrading.com/1.0/stock/aapl/chart/1y")
    .then(response => {
      res.status(200).send(json.stringify(response.data));
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/getchartdata", (req, res, next) => {
  let data = new Array();
  let url = "https://api.iextrading.com/1.0/stock/" + req.query.symbol +  "/chart/" + req.query.time;
  axios.get(url)
    .then(response => {
      response.data.forEach(element => {
        let obj = { "label" : element.date, "value" : element.close }
        data.push(obj)
      });
      res.status(200).send(json.stringify(data));
    })
    .catch(err => {
      console.log(err);
    });
});



module.exports = router;
