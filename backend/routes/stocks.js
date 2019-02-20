const express = require('express');
const https = require('https');
const axios = require('axios');
const json = require('circular-json');

const User = require('../models/user');

const router = express.Router();

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
