const express = require('express');
const https = require('https');
const axios = require('axios');
const json = require('circular-json');
const url = require('url');

const User = require('../models/user');

const router = express.Router();

router.post("/addFollowingStock", (req, res, next) => {
  axios.get("https://api.iextrading.com/1.0/stock/" + req.body.company + "/company")
    .then(response => {

      User.findOne({ "email": req.body.email }, function (err, obj) {
        console.log(obj)
        var stockData = obj.stocks
        let newEntry = {
          "symbol": response.data.symbol,
          "company": response.data.companyName
        }
        stockData.push(newEntry)

        User.updateOne({ "email": req.body.email }, { $set: { "stocks": stockData } })
          .then(
            res.status(200).send(JSON.stringify(obj))
          )
      })
    })
    .catch(err => {
      res.send(err)
    })
});

router.post("/removeFollowingStock", (req, res, next) => {
  // console.log(req.body.email)
  // console.log(req.body.company)
  User.find({ "email": req.body.email }, function (err, obj) {
    if (err) {
      res.send(err)
    }
    else {
      // console.log(obj[0].stocks[0])
      var stockData = obj[0].stocks
      var index = 0
      for (i = 0; i < stockData.length; i++) {
        var currentEntry = stockData[i]
        if (currentEntry.symbol === req.body.company) {
          index = i
          break;
        }
      }
      stockData.splice(index, 1)
      User.updateOne({ "email": req.body.email }, { $set: { "stocks": stockData } })
        .then(
          res.send(stockData + "updated")
        )
      // let index = stockData.indexOf(req.body.company)
      // console.log("index is " + index)
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
  let url = "https://api.iextrading.com/1.0/stock/" + req.query.symbol + "/chart/" + req.query.time;
  axios.get(url)
    .then(response => {
      response.data.forEach(element => {
        let obj = { "label": element.date, "value": element.close }
        data.push(obj)
      });
      res.status(200).send(json.stringify(data));
    })
    .catch(err => {
      console.log(err);
    });
});



module.exports = router;
