// Require Dependencies 
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
require('dotenv').config();
const morgan = require('morgan');
const session = require('express-session');
/* TO DO: ADD CONTROLLERS */
const moviesController = require('./controllers/movies.js');
const usersController = require('./controllers/users.js');
const indexController = require('./controllers/index.js');



// Initialize the Application
const app = express();


// Configure Application Settings
const {DATABASE_URL, PORT, SECRET, API_KEY} = process.env;


// Connect to and Configure Database
mongoose.connect(DATABASE_URL);


// Set up Database Listeners
const db = mongoose.connection;
db.on("error", (err) => console.log("Mongo is not running. Error"));
db.on("connected", () => console.log("Mongo Connected"));
db.on("disconnected", () => console.log("Mongo is disconnected"));

// Mount Middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(morgan('dev')); 
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    })
);


// Mount Routes
/* TO DO: Mount Routes
app.use('/', xxxxController);
*/
app.use('/', indexController);
app.use('/', usersController);
app.use('/', moviesController);



// Check if Application is Listening
app.listen(PORT, () => console.log (`Server is listening on port: ${PORT}`));