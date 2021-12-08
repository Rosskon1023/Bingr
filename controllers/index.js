// Require Dependencies 
const express = require("express");

// Create a Route Object
const indexRouter = express.Router();

// List Router Actions / Define Routes

// Index

indexRouter.get("/", (req,res) => {
    req.session.destroy(() => {
        res.render('home.ejs');
    })
});

// Export the Router/Controller Object
module.exports = indexRouter;