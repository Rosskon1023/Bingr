// Require Dependencies 
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
require('dotenv').config();
/* TO DO: ADD CONTROLLERS */
const moviesController = require('./controllers/movies.js');



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


// Mount Routes
/* TO DO: Mount Routes
app.use('/', xxxxController);
*/
app.use('/', moviesController);


// Check if Application is Listening
app.listen(PORT, () => console.log (`Server is listening on port: ${PORT}`));