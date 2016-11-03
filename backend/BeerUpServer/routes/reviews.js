var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), // mongodb connection
    bodyParser = require('body-parser'), // parse info from POST
    methodOverride = require('method-override');  // used to manipulate POST data

var jwt =  require('jsonwebtoken');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body == 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

router.route('/')
  .get(function(req, res, next) {
    mongoose.model('Review').find({}, function(err, reviews) {
      if (err) {
        console.log(err);
      } else {
        res.format({
          json: function() {
            res.json(reviews);
          }
        });
      }
    });
});

router.route('/addreview/:webtoken/:beername/:breweryname/:rating/:review')
  .post(function (req, res) {
    var webToken = req.params.webtoken;
    var username = 'ishank';
    var beerName = req.params.beername;
    var breweryName = req.params.breweryname;
    var rating = req.params.rating;
    var review = req.params.review;

    var userInfo = {};
    console.log(username);
    mongoose.model('People').findOne({username: username}, function(err, user) {
      if (err) {
        console.log(err);
      } else {
        console.log(user);
        userInfo = {username: username, firstName: user.firstName, lastName: user.lastName};
      }
    });

    if (userInfo != {}) {
      mongoose.model('Review')
      .create({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        username: username,
        beerName: beerName,
        breweryName: breweryName,
        rating: rating,
        review: review
      }, function (err, review) {
          if (err) {
                res.send('Problem adding review to db.');
            } else {
                res.json({success: true, review});
          }
      });
    }
});

module.exports = router;
