// Require Dependencies
const express = require('express');
require('dotenv').config();
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

// Create a Route Object
const usersRouter = express.Router();
const User = require('../models/user.js');

// List Router Actions / Define Routes

// Login Routes
usersRouter.get("/login", (req,res) => {
    res.render('login.ejs', {err: ''});
});

usersRouter.post("/login", (req,res) => {
    User.findOne({email: req.body.email}, (err, foundUser) => {
        if(!foundUser) return res.render('login.ejs', {err: 'The credentials you have entered are invalid'});
        if(!bcrypt.compareSync(req.body.password, foundUser.password)) {
            return res.render('login.ejs', {err: 'The credentials you have entered are invalid'});
        }
        req.session.user = foundUser._id;
        res.redirect("/dashboard");
    });
});

// Signup Routes 
usersRouter.get("/signup", (req,res) => {
    res.render('signup.ejs');
});

usersRouter.post("/signup", (req,res) => {
    const hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(SALT_ROUNDS))
    req.body.password = hash;
    User.create(req.body, (error, user) => {
        req.session.user = user._id;
        res.redirect("/dashboard");
    });
});

// Logout Route
usersRouter.get("/logout", (req,res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
});


// Dashboard Screen Route
usersRouter.get("/dashboard", (req,res) => {
    if(!req.session.user) return res.redirect("/login");
    User.findById(req.session.user, (err, user) => {
        res.render('dashboard.ejs', {user});
    });
});




// usersRouter.get("/signup", (req,res) => {
//     req.body.name = "Ross";
//     req.body.email = "test@email.com";
//     req.body.password = "123456";
//     User.create(req.body, (error, user) => {
//         req.session.user = user._id;
//         res.send(user)
//     })
// });

// Export the Router/Controller Object
module.exports = usersRouter;


