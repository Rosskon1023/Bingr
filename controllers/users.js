// Require Dependencies
const express = require('express');
require('dotenv').config();
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

// Create a Route Object
const usersRouter = express.Router();
const User = require('../models/user.js');

// List Router Actions / Define Routes
usersRouter.get("/signup", (req,res) => {
    req.body.name = "Ross";
    req.body.email = "test@email.com";
    req.body.password = "123456";
    User.create(req.body, (error, user) => {
        req.session.user = user._id;
        res.send(user)
    })
});

module.exports = usersRouter;


