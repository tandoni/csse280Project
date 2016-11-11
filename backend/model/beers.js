var mongoose = require('mongoose');

var allBeer = new mongoose.Schema({
    beer: String,
    imageurl: String,
    description: String,
    userName: String
});

mongoose.model('Beer', allBeer);
