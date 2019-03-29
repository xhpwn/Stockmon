const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const router = express.Router();

router.post("/register", (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash
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
    let checker = 0;
    if (req.body.email.indexOf('@') !== -1) {
      user = await User.findOne({email: req.body.email});
    } else {
      user = await User.findOne({username: req.body.email});
      checker = 1;
    }
    if (!user) return res.status(401).send("Auth Failed");
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(401).send("Auth Failed");
    let token;
    if (checker === 1) {
      token = jwt.sign({ username: user.username, userId: user._id },
        "Z{D-_$mk:m#WAlywFR?'TR*09s'5a`Czz$pG&#oo#x%d4|f&GNi2+,zN3?~ zL80,)pdu:Wy\{Ntm%Jk[6nQcM-fYe/.C9@6k!iig5I'B-WYh^xtybS;b;Nv#H$tw_?Q",
        { expiresIn: "1h" });
      res.status(200).json({
        token: token,
        name: user.name,
        userId: user._id
      });
    } else {
      token = jwt.sign({ email: user.email, userId: user._id },
        "Z{D-_$mk:m#WAlywFR?'TR*09s'5a`Czz$pG&#oo#x%d4|f&GNi2+,zN3?~ zL80,)pdu:Wy\{Ntm%Jk[6nQcM-fYe/.C9@6k!iig5I'B-WYh^xtybS;b;Nv#H$tw_?Q",
        { expiresIn: "1h" });
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

module.exports = router;
