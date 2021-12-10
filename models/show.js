const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const showSchema = new Schema({
    title: {type:String, required:true},
    writer: {type:String, required:true},
    user_id: {type: String},
    img: {type:String},
    watched: Boolean,
    plot: {type:String},
    seasons: {type:String},
    user_rating: {type:Number},
    rating: {type:String},
    runtime: {type:String},
    year: {type:String},
}, {timestamps:true});

const Show = mongoose.model("Show", showSchema);

module.exports = Show; 