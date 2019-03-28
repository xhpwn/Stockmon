const express = require('express');
const https = require('https');
const axios = require('axios');
const json = require('circular-json');
const url = require('url');

const User = require('../models/user');

const router = express.Router();

/////////////////// Cryptocurrency backend /////////////////////////

router.get("/getcryptodata", (req, res, next) => {
  let data = new Array();
  let url = "https://min-api.cryptocompare.com/data/histominute?fsym="+ element.symbol + "&tsym=USD&limit=5&api_key=70e0677660c6d62a72896f47363843d2cc001f0545607cf089d4fd63645f868e";
  axios.get(url)
    .then(response => {
      response.data.forEach(element => {
        let obj = { "label": element.time, "value": element.close }
        data.push(obj)
      });
      res.status(200).send(json.stringify(data));
    })
    .catch(err => {
      console.log(err);
    });
});


router.post("/getCryptPortfolio", (req, res, next) => {
  User.findById(req.body.id, function (err, obj) {
    let newData = [];

    var cryptData = obj.cryptPortfolio;
    cryptData.forEach(element => {
      let url = "https://min-api.cryptocompare.com/data/price?fsym=" + element.symbol + "&tsyms=USD&api_key=70e0677660c6d62a72896f47363843d2cc001f0545607cf089d4fd63645f868e";
      axios.get(url)
        .then(response => {
          // console.log(response.data);

          let temp = { "symbol": element.symbol, "Name": element.name, "Price": response.data.USD, "numCrypto": element.numCrypto, "totAmount": (element.numCrypto * response.data.USD).toFixed(2) };
          newData.push(temp);
          if (cryptData.length === 1) {
            res.status(200).send(json.stringify(newData));
          }
          cryptData = cryptData.filter(function (each) {
            return each !== element
          });
          // console.log(portfolioData);
        })
    })
  })
});

router.get("/getCryptocurrencies", (req, res, next) => {
  let cryptData = [];
  axios.get("https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD&api_key=70e0677660c6d62a72896f47363843d2cc001f0545607cf089d4fd63645f868e")
    .then(response => {
      // res.send(json.stringify(response.data.Data))
      response.data.Data.forEach(element => {
        let coinInfo = element.CoinInfo
        let price = element.RAW.USD.PRICE
        let obj = { "Symbol": coinInfo.Name, "Name": coinInfo.FullName, "Price": price };
        cryptData.push(obj)
      });
      res.status(200).send(json.stringify(cryptData));
    })
    .catch(err => {
      res.status(404).send("Cannot display the stock losers!");
      console.log(err);
    });
});

router.post("/addCryptPortfolio", (req, res, next) => {
  User.findById(req.body.id, function (err, obj) {
    console.log(req.body);
    let currentCryptoData = obj.cryptPortfolio
    var index = -1;
    console.log("length of array is " + currentCryptoData.length)
    for (i = 0; i < currentCryptoData.length; i++) {
      if (req.body.symbol === currentCryptoData[i].symbol) {
        console.log("inside of if(): index = " + i)
        index = i
        break;
      }
    }
    console.log("outside of if(): index = " + index)

    if (index === -1) {
      let url = "https://min-api.cryptocompare.com/data/coin/generalinfo?fsyms=" + req.body.symbol + "&tsym=USD&api_key=70e0677660c6d62a72896f47363843d2cc001f0545607cf089d4fd63645f868e"
      axios.get(url)
        .then(response => {
          // res.send(json.stringify(response.data.USD))
          var cryptData = obj.cryptPortfolio
          var coinInfo = response.data.Data[0].CoinInfo
          let newEntry = {
            "symbol": coinInfo.Name,
            "name": coinInfo.FullName,
            "numCrypto": req.body.numCrypto
          }
          cryptData.push(newEntry)
          User.findByIdAndUpdate(req.body.id, { $set: { "cryptPortfolio": cryptData } })
            .then(
              res.send(cryptData)
            )
        })
    }
  })
})

router.post("/removeCryptPortfolio", (req, res, next) => {
  User.findById(req.body.id, function (err, obj) {
    if (err) {
      res.send(err)
    } else {
      // console.log(obj.portfolio)
      var cryptData = obj.cryptPortfolio;
      var index = 0;
      for (i = 0; i < cryptData.length; i++) {
        var currentEntry = cryptData[i];
        if (currentEntry.symbol === req.body.symbol) {
          index = i;
          break;
        }
      }

      cryptData.splice(index, 1);
      User.findByIdAndUpdate(req.body.id, { $set: { "cryptPortfolio": cryptData } })
        .then(
          res.status(200).send(cryptData)
        )
    }
  })
});

router.post("/updateCryptoNum", (req, res, next) => {
  User.findById(req.body.id, function (err, obj) {
    var cryptData = obj.cryptPortfolio
    var index = 0
    for (i = 0; i < cryptData.length; i++) {
      if (cryptData[i].symbol === req.body.symbol) {
        index = i;
        break;
      }
    }

    cryptData[index].numCrypto = req.body.numCrypto
    User.findByIdAndUpdate(req.body.id, { $set: { "cryptPortfolio": cryptData } })
      .then(
        res.status(200).send(cryptData)
      )
  });
});

//////////////////////////// Stocks backend ///////////////////////////////

router.post("/increaseshares", (req, res, next) => {
  User.findById(req.body.id, function (err, obj) {
    var portfolioData = obj.portfolio;
    var index = 0;
    for (i = 0; i < portfolioData.length; i++) {
      if (portfolioData[i].symbol === req.body.symbol) {
        index = i;
        break;
      }
    }
    portfolioData[index].shares += req.body.shares;
    User.findByIdAndUpdate(req.body.id, { $set: { "portfolio": portfolioData } })
      .then(
        res.status(200).send(portfolioData)
      )
  })
});

router.post("/updatePortfolio", (req, res, next) => {
  User.findById(req.body.id, function (err, obj) {
    var portfolioData = obj.portfolio;
    var index = 0;
    for (i = 0; i < portfolioData.length; i++) {
      if (portfolioData[i].symbol === req.body.symbol) {
        index = i;
        break;
      }
    }
    portfolioData[index].shares = req.body.shares;
    User.findByIdAndUpdate(req.body.id, { $set: { "portfolio": portfolioData } })
      .then(
        res.status(200).send(portfolioData)
      )
  })
});

router.post("/decreaseshares", (req, res, next) => {
  User.findById(req.body.id, function (err, obj) {
    var portfolioData = obj.portfolio;
    var index = 0;
    for (i = 0; i < portfolioData.length; i++) {
      if (portfolioData[i].symbol === req.body.symbol) {
        index = i;
        break;
      }
    }
    portfolioData[index].shares -= req.body.shares;
    User.findByIdAndUpdate(req.body.id, { $set: { "portfolio": portfolioData } })
      .then(
        res.status(200).send(portfolioData)
      )
  })
});


router.post("/getportfolio", (req, res, next) => {
  User.findById(req.body.id, function (err, obj) {
    let newData = [];

    var portfolioData = obj.portfolio;
    portfolioData.forEach(element => {
      let url = "https://api.iextrading.com/1.0/stock/" + element.symbol + "/price";
      axios.get(url)
        .then(response => {
          // console.log(response.data);

          let temp = { "symbol": element.symbol, "companyName": element.company, "delayedPrice": response.data, "shares": element.shares, "equity": (element.shares * response.data).toFixed(2) };
          newData.push(temp);
          if (portfolioData.length === 1) {
            res.status(200).send(json.stringify(newData));
          }
          portfolioData = portfolioData.filter(function (each) {
            return each !== element
          });
          // console.log(portfolioData);
        })
    })
  })
});


router.post("/addportfolio", (req, res, next) => {
  User.findById(req.body.id, function (err, obj) {
    let currentPortfolioData = obj.portfolio
    // res.send(currentPortfolioData)
    var index = -1
    for (i = 0; i < currentPortfolioData.length; i++) {
      if (req.body.symbol === currentPortfolioData[i].symbol) {
        index = i
        break;
      }
    }
    console.log("index = " + index)

    if (index === -1) {
      console.log("went inside")
      let url = "https://api.iextrading.com/1.0/stock/" + req.body.symbol + "/company";
      axios.get(url)
        .then(response => {
          console.log("got response")
          // User.findById(req.body.id, function (err, obj) {
          var portfolioData = obj.portfolio;
          // res.send(portfolioData)
          let newEntry = {
            "symbol": response.data.symbol,
            "company": response.data.companyName,
            "shares": req.body.shares
          };
          portfolioData.push(newEntry);
          // res.send(portfolioData)
          User.findByIdAndUpdate(req.body.id, { $set: { "portfolio": portfolioData } })
            .then(
              res.status(200).send(portfolioData)
            )
          // })
        })
    }
  })
});

router.post("/removeportfolio", (req, res, next) => {
  User.findById(req.body.id, function (err, obj) {
    if (err) {
      res.send(err)
    } else {
      // console.log(obj.portfolio)
      var portfolioData = obj.portfolio;
      var index = 0;
      for (i = 0; i < portfolioData.length; i++) {
        var currentEntry = portfolioData[i];
        if (currentEntry.symbol === req.body.symbol) {
          index = i;
          break;
        }
      }

      portfolioData.splice(index, 1);
      User.findByIdAndUpdate(req.body.id, { $set: { "portfolio": portfolioData } })
        .then(
          res.status(200).send(portfolioData)
        )
    }
  })
});

router.post("/getfollowing", (req, res, next) => {
  User.findById(req.body.id, function (err, obj) {
    let newData = [];

    var stockData = obj.stocks;
    stockData.forEach(element => {
      let url = "https://api.iextrading.com/1.0/stock/" + element.symbol + "/price";
      axios.get(url)
        .then(response => {

          let temp = { "symbol": element.symbol, "companyName": element.company, "delayedPrice": response.data };
          newData.push(temp);
          if (stockData.length === 1) {
            res.status(200).send(json.stringify(newData));
          }
          stockData = stockData.filter(function (each) {
            return each !== element
          });
        })
    })
  })
});

router.post("/addFollowingStock", (req, res, next) => {
  User.findById(req.body.id, function (err, obj) {
    let currentFollowingData = obj.stocks
    // res.send(currentPortfolioData)
    var index = -1
    for (i = 0; i < currentFollowingData.length; i++) {
      if (req.body.symbol === currentFollowingData[i].symbol) {
        index = i
        break;
      }
    }
    console.log("index = " + index)

    if (index === -1) {
      axios.get("https://api.iextrading.com/1.0/stock/" + req.body.symbol + "/company")
        .then(response => {
          User.findById(req.body.id, function (err, obj) {
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
    }
  })


});

router.post("/removeFollowingStock", (req, res, next) => {
  // console.log(req.body.email)
  // console.log(req.body.company)
  User.findById(req.body.id, function (err, obj) {
    if (err) {
      res.send(err)
    } else {
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
      if (index == 0) {
        stockData = new Array();
      }
      else {
        stockData.splice(index, 1);
      }
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
        let obj = { "Symbol": element.symbol, "Name": element.companyName, "Price": element.delayedPrice };
        infocusData.push(obj)
      });
      res.status(200).send(json.stringify(response.data));
    })
    .catch(err => {
      res.status(404).send("Cannot display top performing stocks!");
      console.log(err);
    });
});

router.get("/getgainers", (req, res, next) => {
  let gainersData = [];
  axios.get("https://api.iextrading.com/1.0/stock/market/list/gainers")
    .then(response => {
      response.data.forEach(element => {
        let obj = { "Symbol": element.symbol, "Name": element.companyName, "Price": element.delayedPrice };
        gainersData.push(obj)
      });
      res.status(200).send(json.stringify(response.data));
    })
    .catch(err => {
      res.status(404).send("Cannot display the stock gainers!");
      console.log(err);
    });
});

router.get("/getlosers", (req, res, next) => {
  let losersData = [];
  axios.get("https://api.iextrading.com/1.0/stock/market/list/losers")
    .then(response => {
      response.data.forEach(element => {
        let obj = { "Symbol": element.symbol, "Name": element.companyName, "Price": element.delayedPrice };
        losersData.push(obj)
      });
      res.status(200).send(json.stringify(response.data));
    })
    .catch(err => {
      res.status(404).send("Cannot display the stock losers!");
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
      res.status(404).send("Cannot display chart data!");
      console.log(err);
    });
});

router.get("/getdescription", (req, res, next) => {
  console.log(req.query.symbol)
  //https://api.iextrading.com/1.0/stock/aapl/company
  let descriptionData = [];
  let url = "https://api.iextrading.com/1.0/stock/" + req.query.symbol + "/company/";
  axios.get(url)
    .then(response => {
      res.status(200).send(json.stringify(response.data));
    })
    .catch(err => {
      res.status(404).send("Cannot display description of stock!");
      console.log(err);
    });
});


router.get("/getLogo", (req, res, next) => {
  console.log(req.query.symbol)
  //https://api.iextrading.com/1.0/stock/aapl/logo
  let descriptionData = [];
  let url = "https://api.iextrading.com/1.0/stock/" + req.query.symbol + "/logo/";
  axios.get(url)
    .then(response => {
      res.status(200).send(json.stringify(response.data));
    })
    .catch(err => {
      res.status(404).send("Cannot display description of stock!");
      console.log(err);
    });
});

router.get("/search", (req, res, next) => {
  console.log(req.query.symbol)
  let searchResults = [];
  let url = "https://api.iextrading.com/1.0/ref-data/symbols";
  axios.get(url)
    .then(response => {
      response.data.forEach(element => {
        if (element.symbol.toLowerCase().includes(req.query.symbol.toLowerCase())) {
          let obj = element;
          searchResults.push(obj)
        }
      });
      res.status(200).send(json.stringify(searchResults));
    })
    .catch(err => {
      res.status(404).send("Search error.");
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

router.get("/getPrice", (req, res, next) => {
  let url = "https://api.iextrading.com/1.0/stock/" + req.query.symbol + "/price";
  axios.get(url)
    .then(response => {
      res.status(200).send(json.stringify(response.data));
    })
    .catch(err => {
      //console.log(err);
      //res.status(404).send("Cannot display price of stock!");
    });
});



module.exports = router;
