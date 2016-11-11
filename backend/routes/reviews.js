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

router.route('/:token')
  .get(function(req, res) {
    console.log(req.params.token);
    var webToken = req.params.token;

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
    })
  })
  .delete(function (req, res) {
  var webToken = req.params.token;

  JWT.verifyToken(webToken).then(function(tokenResponse) {
      if(tokenResponse.success === true) {
        mongoose.model('Review').findById(req.body.id, function (err, review) {
          if (review.userName === tokenResponse.decoded.username) {
            mongoose.model('Review').findByIdAndRemove(req.body.id)
              .exec(
                function (err, beer) {
                  if (err) {
                      res.send({ status: 404, message: false, description: 'Problem deleting review' });
                  } else {
                      res.send({ status: 204, message: true, description: 'Review Deleted' });
                  }
                }
              );
          } else {
            res.send({message: false, description: 'You are not authorized to perform this! :('});
          }
        });
      }

    });
  })
  .put(function (req, res) {
      mongoose.model('Review').findById(req.body.id, function (err, review) {
          review.firstName = req.body.firstName || review.firstName;
          review.lastName = req.body.lastName || review.lastName;
          review.userName = req.body.userName || review.userName;
          review.beerName = req.body.beerName || review.beerName;
          review.breweryName = req.body.breweryName || review.breweryName;
          review.rating = req.body.rating || review.rating;
          review.review = req.body.review || review.review;
          review.save(function (err, rev) {
              if (err) {
                  res.status(404);
                  handleError(err, res, 'Problem updating review');
              } else {
                  res.format({
                      json: function () {
                          res.json(rev);
                      }
                  });
              }
          });
      });
  });

router.route('/addreview/:beername/:breweryname/:rating/:review')
  .post(function (req, res) {
    // console.log('\n\nBODY IS: ' + req.body.webToken + '\n\n');
    var webToken = req.body.token;
    console.log(webToken);
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
