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
});

router.route('/register/:firstname/:lastname/:username/:password')
  .post(function (req, res) {
    var firstName = req.params.firstname;
    var lastName = req.params.lastname;
    var username = req.params.username;
    var pass = req.params.password;
    if (username !== '' && pass !== '' && firstName !== '' && lastName != '') {
      mongoose.model('People').create({ firstName: firstName, lastName: lastName, username: username, hashedPassword: pass }, function (err, user) {
          if (err) {
                res.send('Problem adding user to db.');
            } else {
                res.format({
                    json: function () {
                        res.json(user);
                    }
                });
          }
      });
    } else {
      res.send('Empty input fields');
    }
});

router.route('/login/:username/:password')
  .post(function (req, res) {
    console.log(req.params.username);
    var username = req.params.username;
    var pass = req.params.password;
    if (username !== '' && pass !== '') {
      mongoose.model('People').findOne({ username: username, hashedPassword: pass }, function (err, user) {
          if (err) {
              res.status(404);
              err = new Error('GET error, problem retrieving data');
              err.status = 404;
              res.format({
                  json: function () {
                      res.json({ message: err.status + ' ' + err });
                  }
              });
          } else {
            if (user === null) {
                res.status(401);
                err = new Error('Unauthorized user. Enter correct credentials');
                err.status = 401;
                res.format({
                    json: function () {
                        res.json({ message: err.status + ' ' + err });
                    }
                });
            } else {
                var token = jwt.sign(user, 'secret', {
                  expiresIn: 86400 // expires in 24 hours
                });

                res.json({
                  success: true,
                  message: 'Enjoy your token!',
                  token: token
                });
            }
          }
      });
    } else {
      res.send('Empty input fields');
    }
  });


  module.exports = router;
  