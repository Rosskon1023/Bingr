// Require Dependencies
const express = require('express');
require('dotenv').config();
const axios = require('axios');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;
const {API_KEY, BASE_URL} = process.env;

// Create a Route Object
const usersRouter = express.Router();
const User = require('../models/user.js');
const Movie = require('../models/movie.js');
const Show = require('../models/show.js');

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

// FRIEND ROUTES 

// Friend Index Route
usersRouter.get("/friends", (req,res) => {
    User.findById(req.session.user, (err, user) => {
        res.render('friends.ejs', {user});
    });
})

// New Friend Route
usersRouter.get("/friends/new", (req,res) => {
    res.render("friendNew.ejs")
});

// Create Friend Route

usersRouter.post("/friends", async (req,res) => {
    const user = await User.findById(req.session.user);
    const friend = await User.findOne({username: req.body.username});
    req.body.friend_id = friend._id.toString();
    user.friends.push(req.body);
    await user.save();
    res.redirect("/friends");
});

// Index Friends Shows/Movies

usersRouter.get("/friends/:id/movies", (req,res) => {
    Movie.find({user_id:req.params.id}, (error, allMovies) => {
        res.render("friendMovieIndex.ejs", {
            movies: allMovies, 
        });
    });
});

usersRouter.get("/friends/:id/shows", (req,res) => {
    Show.find({user_id:req.params.id}, (error, allShows) => {
        res.render("friendShowIndex.ejs", {
            shows: allShows,
        });
    });
});

// Post from Friends Shows/Movies
usersRouter.post("/friends/:id/shows", (req,res) => {
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
            res.redirect(`/friends/${req.params.id}/shows`)
        })
    }).catch(error => {
        console.log(error);
    })
})

usersRouter.post("/friends/:id/movies", (req,res) => {
    axios.get(`${BASE_URL}?t=${req.body.title}&type=movie&apikey=${API_KEY}`).then(response => {
        req.body.title = response.data.Title
        req.body.director = response.data.Director
        req.body.img = response.data.Poster
        req.body.plot = response.data.Plot
        req.body.box_office = response.data.BoxOffice
        req.body.rating = response.data.imdbRating
        req.body.year = response.data.Year
        req.body.user_id = req.session.user
        if(req.body.watched === 'on') {
            req.body.watched = true
        } else {
            req.body.watched = false
        }
        Movie.create(req.body, (error, createdMovie) => {
            res.redirect(`/friends/${req.params.id}/movies`)
        })
    })
})

// Export the Router/Controller Object
module.exports = usersRouter;


