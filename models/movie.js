const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const movieSchema = new Schema({
    title: {type:String, required:true},
    director: {type:String, required:true},
    user_id: {type: String},
    img: {type:String},
    watched: Boolean,
    plot: {type:String},
    rating: {type:String},
}, {timestamps:true});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;