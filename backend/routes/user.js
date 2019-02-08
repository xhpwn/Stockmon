const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const router = express.Router();

router.post("/register", (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash =>  {
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
    let user = await User.findOne({email: req.body.email});
    if (!user) return res.status(401).send("Auth Failed");
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(401).send("Auth Failed");
    const token = jwt.sign({email: user.email, userId: user._id}, 
    "Z{D-_$mk:m#WAlywFR?'TR*09s'5a`Czz$pG&#oo#x%d4|f&GNi2+,zN3?~ zL80,)pdu:Wy\{Ntm%Jk[6nQcM-fYe/.C9@6k!iig5I'B-WYh^xtybS;b;Nv#H$tw_?Q", 
    { expiresIn: "1h"} );
    res.status(200).json({
    token: token,
    name: user.name
    });
    }
    catch (err) {
    res.status(401).send("Auth Failed");
    }
    });

module.exports = router;