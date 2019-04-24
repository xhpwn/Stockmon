const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const json = require('circular-json');

const User = require('../models/user');

const router = express.Router();

router.post("/register", (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        admin: false,
        password: hash,
        defaultCurrency: ""
      });
      user.save()
        .then(result => {
          res.status(200).json({
            message: 'Registration Successful.',
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          })
        });
    });
});

router.post("/signin", async (req, res, next) => {
  try {
    let user;
    let counter = 0;
    if (req.body.email.indexOf('@') !== -1) {
      user = await User.findOne({email: req.body.email});
      //console.log("USING @: " + req.body.email);
    } else {
      user = await User.findOne({username: req.body.email});
      //console.log("NOT USING @: " + req.body.email);
      counter = 1;
    }
    //console.log("WHAT I ENTERED IN: " + req.body.email);
    if (!user) return res.status(401).send("Auth Failed");
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(401).send("Auth Failed");
    let token;
    if (counter === 1) {
      token = jwt.sign({username: user.username, userId: user._id},
        "Z{D-_$mk:m#WAlywFR?'TR*09s'5a`Czz$pG&#oo#x%d4|f&GNi2+,zN3?~ zL80,)pdu:Wy\{Ntm%Jk[6nQcM-fYe/.C9@6k!iig5I'B-WYh^xtybS;b;Nv#H$tw_?Q",
        {expiresIn: "1h"});
      res.status(200).json({
        token: token,
        name: user.name,
        userId: user._id
      });
    } else {
      token = jwt.sign({email: user.email, userId: user._id},
        "Z{D-_$mk:m#WAlywFR?'TR*09s'5a`Czz$pG&#oo#x%d4|f&GNi2+,zN3?~ zL80,)pdu:Wy\{Ntm%Jk[6nQcM-fYe/.C9@6k!iig5I'B-WYh^xtybS;b;Nv#H$tw_?Q",
        {expiresIn: "1h"});
      res.status(200).json({
        token: token,
        name: user.name,
        userId: user._id
      });
    }
  }
  catch (err) {
    res.status(401).send("Auth Failed");
  }
});

router.post("/updateemail", async (req, res, next) => {
  try {
    let user = await User.findById(req.body.userid);
    if (!user) return res.status(401).send("Auth Failed 1");
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(401).send("Auth Failed 2");
    User.findByIdAndUpdate(req.body.userid, { $set : { "email" : req.body.email  }}, {returnOriginal:false})
      .then(
        res.status(200).send("Email successfully changed.")
      )
      .catch(err => {
        console.log(err);
      });
  }
  catch (err) {
    res.status(401).send("Auth Failed");
  }
});

router.post("/updateusername", async (req, res, next) => {
  try {
    let user = await User.findById(req.body.userid);
    if (!user) return res.status(401).send("Auth Failed 1");
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(401).send("Auth Failed 2");
    User.findByIdAndUpdate(req.body.userid, { $set : { "username" : req.body.username  }}, {returnOriginal:false})
      .then(
        res.status(200).send("Username successfully changed.")
      )
      .catch(err => {
        console.log(err);
      });
  }
  catch (err) {
    res.status(401).send("Auth Failed");
  }
});

router.post("/updatepassword", async (req, res, next) => {
  try {
    let user = await User.findById(req.body.userid);
    if (!user) return res.status(401).send("Auth Failed 1");
    const validPassword = await bcrypt.compare(req.body.oldPassword, user.password);
    if (!validPassword) return res.status(401).send("Auth Failed 2");
    bcrypt.hash(req.body.newPassword, 10)
      .then(hash => {
        User.findByIdAndUpdate(req.body.userid, { $set : { "password" : hash  }}, {returnOriginal:false})
          .then(
            res.status(200).send("Password successfully changed.")
          )
          .catch(err => {
            console.log(err);
          });
      });
  }
  catch (err) {
    res.status(401).send("Auth Failed");
  }
});


router.post("/getinfo", async (req, res, next) => {
  try {
    let user = await User.findById(req.body.userid);
    if (!user) return res.status(401).send("Auth Failed 1");
    res.status(200).send(JSON.stringify(user));
  }
  catch (err) {
    res.status(401).send("Auth Failed");
  }
});

router.post("/deleteuser", async (req, res, next) => {
  try {
    let user = await User.findById(req.body.userid);
    if (!user) return res.status(401).send("Auth Failed 1");
    if (!user.admin) return res.status(401).send("Auth Failed 2");
    User.deleteOne({ email: req.body.targetUserEmail }).then(
      res.status(200).send("Account deleted")
    )
      .catch(err => {
        console.log(err);
      });
  }
  catch (err) {
    return res.status(401).send("Auth Failed");
  }
});

router.post("/getUsers", async (req, res, next) => {
  try {
    let user = await User.findById(req.body.userid);
    if (!user) return res.status(401).send("Auth Failed 1");
    if (!user.admin) return res.status(401).send("Unauthorized");
    User.find({}, function(err, users) {
      var userMap = [];

      users.forEach(function(user) {
        let obj = [{
          name: user.name,
          username: user.username,
          email: user.email
        }];
        userMap.push(obj);
      });
      return res.send(JSON.stringify(userMap));
    });
  }
  catch(err) {
    return res.status(401).send("Error");
  }
});

router.get("/getCurrencies", (req, res, err) => {
  try {
    //let url = "http://data.fixer.io/api/symbols?access_key=1e55684d4e0387207d6e4164c89e4a9f"
    let url = "https://free.currconv.com/api/v7/currencies?apiKey=eeb09eeddc865b68c22b";
    axios.get(url)
      .then(response => {
        console.log(response.data.results["AED"]);
        res.status(200).send(json.stringify(response.data.results));
      });
  }
  catch(err) {
    console.log(err);
  }
});

router.post("/changeDefaultCurrency", async (req, res, next) => {
  try {
    let user = await User.findById(req.body.userid);
    if (!user) return res.status(401).send("Auth Failed 1");
    User.findByIdAndUpdate(req.body.userid, { $set : { "defaultCurrency" : req.body.newdefault  }})
      .then(
        res.status(200).send("Default currency successfully changed.")
      )
      .catch(err => {
        console.log(err);
      });
  }
  catch (err) {
    res.status(401).send("Auth Failed");
  }
});

router.post("/convertCurrency", async (req, res, next) => {
  try {
    //API Key Sets:
    //65a4055528c7df0cee45
    //eeb09eeddc865b68c22b
    let url = "https://free.currconv.com/api/v7/convert?q=" + req.body.to + "_" + req.body.from + "&apiKey=65a4055528c7df0cee45";
    axios.get(url)
      .then(response => {
        res.status(200).send(json.stringify(response.data.results));
      });
  }
  catch(err) {
    console.log(err);
  }
});

/////////////////// Reports/Feedback backend ///////////////////////

router.post("/submitreport", (req, res, next) => {
  User.findById(req.body.id, function (err, obj) {
    let currentReports = obj.reports;
    // res.send(currentReports)
    let newReport = {
      "username": req.body.id,
      "report": req.body.report
    };
    currentReports.push(newReport);
    // res.send(portfolioData)
    User.findByIdAndUpdate(req.body.id, { $set: { "reports": currentReports } })
      .then(
        res.status(200).send(currentReports)
      )
    // })
  })
});

router.post("/submitfeedback", (req, res, next) => {
  User.findById(req.body.id, function (err, obj) {
    let currentFeedback = obj.feedback;
    // res.send(currentFeedback)
    let newFeedback = {
      "username": req.body.id,
      "feedback": req.body.feedback
    };
    currentFeedback.push(newFeedback);
    // res.send(portfolioData)
    User.findByIdAndUpdate(req.body.id, { $set: { "feedback": currentFeedback } })
      .then(
        res.status(200).send(currentFeedback)
      )
    // })
  })
});

router.post("/getReports", async (req, res, next) => {
  try {
    let user = await User.findById(req.body.userid);
    if (!user) return res.status(401).send("Auth Failed 1");
    if (!user.admin) return res.status(401).send("Unauthorized");
    User.find({}, function(err, users) {
      var userMap = [];
      var userReports = "";
      users.forEach(function(user) {

        for (let i = 0; i < user.reports.length; i++) {
          userReports += user.reports[i] + "\n";
        }

        let obj = [{
          username: user.username,
          report: userReports
        }];
        userMap.push(obj);
      });
      return res.send(JSON.stringify(userMap));
    });
  }
  catch(err) {
    return res.status(401).send("Error");
  }
});

router.post("/getFeedback", async (req, res, next) => {
  try {
    let user = await User.findById(req.body.userid);
    if (!user) return res.status(401).send("Auth Failed 1");
    if (!user.admin) return res.status(401).send("Unauthorized");
    User.find({}, function(err, users) {
      var userMap = [];
      var userFeedback = "";
      users.forEach(function(user) {

        for (let i = 0; i < user.feedback.length; i++) {
          userFeedback += user.feedback[i] + "\n";
        }

        let obj = [{
          username: user.username,
          report: userFeedback
        }];
        userMap.push(obj);
      });
      return res.send(JSON.stringify(userMap));
    });
  }
  catch(err) {
    return res.status(401).send("Error");
  }
});

module.exports = router;
