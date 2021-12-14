const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const friendSchema = new Schema ({
    username: {type:String, required:true},
    friend_id: {type:String, required:true},
}, {timestamps:true});

const userSchema = new Schema ({
    username: {type:String, required:true},
    email: {type:String, required:true},
    password: {type:String, required:true},
    friends: [friendSchema],
}, {timestamps:true});

module.exports = mongoose.model('User', userSchema);