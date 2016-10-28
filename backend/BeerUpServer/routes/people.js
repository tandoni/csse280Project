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

// router.param('username', function (req, res, next, username) {
//   // console.log(username);
//     mongoose.model('People').find({"username": username}, function (err, user) {
//         if (err || user === null) {
//             res.status(404);
//             err = new Error('Not Found');
//             err.status = 404;
//             res.format({
//                 json: function () {
//                     res.json({ message: err.status + ' ' + err });
//                 }
//             });
//         } else {
//             req.username = username;
//             console.log("blah" + req.username);
//             next();
//             console.log('gets here');
//         }
//     });
// });

router.route('/:username/:password')
  .get(function (req, res) {
    console.log(req.params.username);
      mongoose.model('People').findOne({ username: req.params.username, hashedPassword: req.params.password }, function (err, user) {
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
              // res.format({
              //     json: function () {
                      res.send("Authorized.. Yayyy!!!");
                  // }
              // });
            }
          }
      });
  });


  module.exports = router;