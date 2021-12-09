// Require Dependencies
const express = require('express');
const axios = require('axios');
require('dotenv').config();

const {API_KEY, BASE_URL} = process.env;

// Create a Route Object
const moviesRouter = express.Router();
const Movie = require('../models/movie.js');

// List Router Actions / Define Routes

// Index
moviesRouter.get("/movies", (req,res) => {
    Movie.find({user_id: req.session.user}, (error, allMovies) => {
        res.render("movieIndex.ejs", {
            movies: allMovies,
        });
    });
});


// New
moviesRouter.get("/movies/new", (req,res) => {
    res.render("movieNew.ejs")
});


// Delete
moviesRouter.delete("/movies/:id", (req,res) => {
    Movie.findByIdAndDelete(req.params.id, (error, data) => {
        res.redirect("/movies")
    })
});


// Update
moviesRouter.put("/movies/:id", (req,res) => {
    if(req.body.watched === 'on') {
        req.body.watched = true
    } else {
        req.body.watched = false
    }
    Movie.findByIdAndUpdate(
        req.params.id,
        req.body, 
        {
            new:true,  
        },
        (error, updatedMovie) => {
            res.redirect("/movies");
        }
    )
});


// Create
moviesRouter.post("/movies", (req,res) => {
    axios.get(`${BASE_URL}?t=${req.body.title}&apikey=${API_KEY}`).then(response => {
        req.body.title = response.data.Title
        req.body.director = response.data.Director
        req.body.img = response.data.Poster
        req.body.plot = response.data.Plot
        req.body.rating = response.data.imdbRating
        req.body.year = response.data.Year
        req.body.user_id = req.session.user
        if(req.body.watched === 'on') {
            req.body.watched = true
        } else {
            req.body.watched = false
        }
        Movie.create(req.body, (error, createdMovie) => {
            res.redirect("/movies")
        })
    })
})


// Edit
moviesRouter.get("/movies/:id/edit", (req,res) => {
    Movie.findById(req.params.id, (error, foundMovie) => {
        res.render("movieEdit.ejs", {movie:foundMovie})
    });
});


// Show
moviesRouter.get("/movies/:id", (req,res) => {
    Movie.findById(req.params.id, (error, foundMovie) => {
        res.render("movieShow.ejs", {movie:foundMovie})
    });
});

// moviesRouter.get("/moviestest", (req,res) => {
//     axios.get(BASE_URL+'?t=Breaking Bad'+'&apikey='+API_KEY).then(response => {
//         req.body.title = response.data.Title
//         req.body.director = response.data.Director
//         req.body.img = response.data.Poster
//         req.body.plot = response.data.Plot
//         req.body.rating = response.data.imdbRating
//         req.body.user_id = req.session.user
//         Movie.create(req.body, (error, createdMovie) => {
//             res.send(createdMovie)
//         })
//         console.log(response.data);
//         res.send(response.data);
//         console.log(req.body);
//     })
// });

// Export the Router/Controller Object
module.exports = moviesRouter;