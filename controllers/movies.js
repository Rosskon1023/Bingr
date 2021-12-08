// Require Dependencies
const express = require('express');
const axios = require('axios');
require('dotenv').config();

const {API_KEY, BASE_URL} = process.env;

// Create a Route Object
const moviesRouter = express.Router();

// List our Router Actions / Define Routes

moviesRouter.get("/", (req,res) => {
    axios.get(BASE_URL+'?t=Frozen'+'&apikey='+API_KEY).then(response => {
        console.log(response.data.Ratings[1]);
    })
});

module.exports = moviesRouter;