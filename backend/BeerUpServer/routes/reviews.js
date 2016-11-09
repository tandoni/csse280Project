var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), // mongodb connection
    bodyParser = require('body-parser'), // parse info from POST
    methodOverride = require('method-override');  // used to manipulate POST data

var JWT =  require('./JWT.js');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body == 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

router.route('/')
  .get(function(req, res) {
    var webToken = req.body.webToken;

    JWT.verifyToken(webToken).then(function(tokenResponse) {
      if (tokenResponse.success === true) {
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
      } else {
        res.send({message: false, description: 'Token has expired'});
      }
    });
});

router.route('/addreview/:beername/:breweryname/:rating/:review')
  .post(function (req, res) {
    // console.log('\n\nBODY IS: ' + req.body.webToken + '\n\n');
    var webToken = req.body.webToken;

    JWT.verifyToken(webToken).then(function(tokenResponse) {
      console.log('\n\n\ntoken response is:    ' + tokenResponse.success + '\n\n\n\n');
      if (tokenResponse.success === true) {
        var username = tokenResponse.decoded.username;
        var beerName = req.params.beername;
        var breweryName = req.params.breweryname;
        var rating = req.params.rating;
        var review = req.params.review;

        var userInfo = { username: tokenResponse.decoded.username, firstName: tokenResponse.decoded.firstName, lastName: tokenResponse.decoded.lastName};
        console.log(userInfo);
        if (userInfo != {}) {
          mongoose.model('Review').create({
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            userName: userInfo.username,
            beerName: beerName,
            breweryName: breweryName,
            rating: rating,
            review: review
          }, function (err, review) {
              if (err) {
                    res.send('Problem adding review to db.');
                } else {
                    res.json({success: true, review });
              }
          });
        }
      } else {
        res.send({message: false, description: 'Token has expired'});
      }
    });
});

module.exports = router;
