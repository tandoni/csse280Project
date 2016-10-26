var mongoose = require('mongoose');

var peopleSchema = new mongoose.Schema({
    username: String,
    hashedPassword: String,
    activeWebToken: String
});

mongoose.model('People', peopleSchema);
