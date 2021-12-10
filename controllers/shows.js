// Require Dependencies 
const express = require('express');
const axios = require('axios');
require('dotenv').config();

const {API_KEY, BASE_URL} = process.env;

// Create a Route Object
const showsRouter = express.Router();
const Show = require('../models/show.js');

// List Router Actions / Define Routes

// Index
showsRouter.get("/shows", (req,res) => {
    Show.find({user_id: req.session.user}, (error, allShows) => {
        res.render("showIndex.ejs", {
            shows: allShows,
        });
    });
});

showsRouter.get("/shows/favorites", (req,res) => {
    Show.find({user_id: req.session.user, watched: true}).sort({user_rating: -1}).then(allShows => {
        console.log(allShows);
        // res.render("showFavorite.ejs", {
        //     shows: allShows,
        });
    });
// });


// New
showsRouter.get("/shows/new", (req,res) => {
    res.render("showNew.ejs")   
});


// Delete
showsRouter.delete("/shows/:id", (req,res) => {
    Show.findByIdAndDelete(req.params.id, (error, data) => {
        res.redirect("/shows")
    });
});


// Update
showsRouter.put("/shows/:id", (req,res) => {
    if(req.body.watched === 'on') {
        req.body.watched = true
    } else {
        req.body.watched = false
    }
    Show.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new:true,
        },
        (error, updatedShow) => {
            res.redirect("/shows");
        }
    )
});


// Create
showsRouter.post("/shows", (req,res) => {
    axios.get(`${BASE_URL}?t=${req.body.title}&type=series&apikey=${API_KEY}`).then(response => {
        req.body.title = response.data.Title
        req.body.writer = response.data.Writer
        req.body.user_id = req.session.user
        req.body.img = response.data.Poster
        req.body.plot = response.data.Plot
        req.body.seasons = response.data.totalSeasons
        req.body.rating = response.data.imdbRating
        req.body.runtime = response.data.Runtime
        req.body.year = response.data.Year
        if(req.body.watched === 'on') {
            req.body.watched = true
        } else {
            req.body.watched = false
        }
        Show.create(req.body, (error, createdShow) => {
            res.redirect("/shows")
        })
    })
})

// Edit
showsRouter.get("/shows/:id/edit", (req,res) => {
    Show.findById(req.params.id, (error, foundShow) => {
        res.render("showEdit.ejs", {show:foundShow})    
    });
});


// Show
showsRouter.get("/shows/:id", (req,res) => {
    Show.findById(req.params.id, (error, foundShow) => {
        res.render("showShow.ejs", {show:foundShow})
    });
});

// Export the Router/Controller Object
module.exports = showsRouter;