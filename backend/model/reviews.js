var mongoose = require('mongoose');

var beerUpSchema  = new mongoose.Schema({
    userName: String,
    firstName: String,
    lastName: String,
    beerName: String,
    breweryName: String,
    breweryAddress: String,
    rating: Number,
    review: String
});

mongoose.model('Review', beerUpSchema);

