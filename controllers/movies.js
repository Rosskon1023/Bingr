// Require Dependencies
const express = require('express');
const axios = require('axios');
require('dotenv').config();

const {API_KEY, BASE_URL} = process.env;

// Create a Route Object
const moviesRouter = express.Router();
const Movie = require('../models/movie.js');

// List Router Actions / Define Routes

moviesRouter.get("/", (req,res) => {
    axios.get(BASE_URL+'?t=Frozen'+'&apikey='+API_KEY).then(response => {
        req.body.title = response.data.Title
        req.body.director = response.data.Director
        req.body.img = response.data.Poster
        req.body.plot = response.data.Plot
        req.body.rating = response.data.imdbRating
        req.body.user_id = req.session.user
        Movie.create(req.body, (error, createdMovie) => {
            res.send(createdMovie)
        })
        // console.log(response.data);
        // res.send(response.data);
        // console.log(req.body);
    })
});

module.exports = moviesRouter;