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
        mongoose.model('Beer').find({}, function(err, beers) {
          if (err) {
            console.log(err);
          } else {
            res.format({
              json: function() {
                res.json(beers);
              }
            });
          }
        });
      } else {
        res.send({message: false, description: 'Token has expired'});
      }
    });
})
  .delete(function (req, res) {
    var webToken = req.params.token;

    JWT.verifyToken(webToken).then(function(tokenResponse) {
      if(tokenResponse.success === true) {
        mongoose.model('Beer').findById(req.body.id, function (err, beer) {
          console.log('\n\n\n\nusername1 : ' + beer.userName);
          console.log('username2 : ' + tokenResponse.decoded.username + '\n\n\n');
          if (beer.userName === tokenResponse.decoded.username) {
            console.log('gets herereqrqerqweqweqe');
            mongoose.model('Beer').findByIdAndRemove(req.body.id)
              .exec(
                function (err, beer) {
                  if (err) {
                      // res.status(404);
                      res.send({ status: 404, message: false, description: 'Problem deleting beer' });
                  } else {
                      res.send({ status: 204, message: true, description: 'Beer Deleted' });
                  }
                }
              );
          } else {
            res.send({message: false, description: 'You are not authorized to perform this! :('});
          }
        });
      }

    });
  });


router.route('/addbeer/:beername/:description')
  .post(function (req, res) {
    var webToken = req.body.token;
    console.log(webToken);

    JWT.verifyToken(webToken).then(function(tokenResponse) {
      console.log('\n\n\ntoken response is:    ' + tokenResponse.success + '\n\n\n\n');
      if (tokenResponse.success === true) {
        var username = tokenResponse.decoded.username;
        var beerName = req.params.beername;
        var imageurl = req.body.imageurl;
        var description = req.params.description;

        mongoose.model('Beer').create({
          userName: username,
          beer: beerName,
          imageurl: imageurl,
          description: description,
        }, function (err, beer) {
            if (err) {
                  res.send('Problem adding beer to db.');
              } else {
                  res.json({success: true, beer });
            }
        });
      } else {
        res.send({message: false, description: 'Token has expired'});
      }
    });
});

module.exports = router;
