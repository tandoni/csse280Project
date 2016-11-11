var mongoose = require('mongoose');

var peopleSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    hashedPassword: String,
    activeWebToken: String
});

mongoose.model('People', peopleSchema);
