const express = require('express');
const https = require('https');
const axios = require('axios');
const json = require('circular-json');
const url = require('url');

const User = require('../models/user');

const router = express.Router();

router.post("/getfollowing", (req, res, next) => {
  User.findById(req.body.id, function (err, obj) {
    console.log(obj);
    let newData = [];

    var stockData = obj.stocks;
    console.log(stockData);
    stockData.forEach(element => {
      let url = "https://api.iextrading.com/1.0/stock/" + element.symbol + "/price";
      axios.get(url)
        .then(response => {
          console.log(response.data);

          let temp = { "symbol": element.symbol, "companyName": element.company, "delayedPrice": response.data };
          newData.push(temp);
          if (stockData.length === 1) {
            res.status(200).send(json.stringify(newData));
          }
          stockData = stockData.filter(function (each) {
            return each !== element
          });
          console.log(stockData);
        })
    })
  })
});

router.post("/addFollowingStock", (req, res, next) => {
  axios.get("https://api.iextrading.com/1.0/stock/" + req.body.symbol + "/company")
    .then(response => {
      User.findById(req.body.id, function (err, obj) {
        console.log(obj);
        var stockData = obj.stocks;
        let newEntry = {
          "symbol": response.data.symbol,
          "company": response.data.companyName
        };
        stockData.push(newEntry);

        User.findByIdAndUpdate(req.body.id, { $set: { "stocks": stockData } })
          .then(
            res.status(200).send(JSON.stringify(obj.stocks))
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
  User.findById(req.body.id, function (err, obj) {
    if (err) {
      res.send(err)
    }
    else {
      // console.log(obj[0].stocks[0])
      var stockData = obj.stocks;
      var index = 0;
      for (i = 0; i < stockData.length; i++) {
        var currentEntry = stockData[i];
        if (currentEntry.symbol === req.body.symbol) {
          index = i;
          break;
        }
      }
      stockData.splice(index, 1);
      User.findByIdAndUpdate(req.body.id, { $set: { "stocks": stockData } })
        .then(
          res.send(stockData + "updated")
        )
      // let index = stockData.indexOf(req.body.company)
      // console.log("index is " + index)
    }
  })
});

router.get("/getinfocus", (req, res, next) => {
  let infocusData = [];
  axios.get("https://api.iextrading.com/1.0/stock/market/list/infocus")
    .then(response => {
      response.data.forEach(element => {
        let obj = { "Symbol": element.symbol, "Name": element.companyName, "Price": element.delayedPrice};
        infocusData.push(obj)
      });
      res.status(200).send(json.stringify(response.data));
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/getgainers", (req, res, next) => {
  let gainersData = [];
  axios.get("https://api.iextrading.com/1.0/stock/market/list/gainers")
    .then(response => {
      response.data.forEach(element => {
        let obj = { "Symbol": element.symbol, "Name": element.companyName, "Price": element.delayedPrice};
        gainersData.push(obj)
      });
      res.status(200).send(json.stringify(response.data));
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/getlosers", (req, res, next) => {
  let losersData = [];
  axios.get("https://api.iextrading.com/1.0/stock/market/list/losers")
    .then(response => {
      response.data.forEach(element => {
        let obj = { "Symbol": element.symbol, "Name": element.companyName, "Price": element.delayedPrice};
        losersData.push(obj)
      });
      res.status(200).send(json.stringify(response.data));
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/getchartdata", (req, res, next) => {
  let data = [];
  let url = "https://api.iextrading.com/1.0/stock/" + req.query.symbol + "/chart/" + req.query.time;
  axios.get(url)
    .then(response => {
      response.data.forEach(element => {
        let obj = { "label": element.date, "value": element.close };
        data.push(obj)
      });
      res.status(200).send(json.stringify(data));
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/getnews", (req, res, next) => {
  //https://api.iextrading.com/1.0/stock/aapl/news
  let newsData = [];
  let url = "https://api.iextrading.com/1.0/stock/" + req.query.symbol + "/news/";
  axios.get(url)
    .then(response => {
      response.data.forEach(element => {
        let obj = { "Source": element.source, "Summary": element.summary };
        newsData.push(obj)
      });
      res.status(200).send(json.stringify(newsData));
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/getPrice", (req, res, next) => {
  console.log(req.query.symbol);
  let url = "https://api.iextrading.com/1.0/stock/" + req.query.symbol + "/price";
      axios.get(url)
        .then(response => {
          res.status(200).send(json.stringify(response.data));
        })
      .catch(err => {
        //console.log(err);
      });
});



module.exports = router;
