var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), // mongodb connection
    bodyParser = require('body-parser'), // parse info from POST
    methodOverride = require('method-override');  // used to manipulate POST data

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
    mongoose.model('People').find({}, function(err, people) {
      if (err) {
        console.log(err);
      } else {
        res.format({
          json: function() {
            res.json(people);
          }
        });
      }
    });
  })
  .post(function (req, res) {
    mongoose.model('People').create({
      username: req.body.username,
      hashedPassword: req.body.hashedPassword
    }, function(err, people) {
      if (err) {
        res.send('Problem adding contact to db...');
      } else {
        res.format({
          json: function() {
            res.json(people);
          }
        });
      }
    });
  });


  module.exports = router;