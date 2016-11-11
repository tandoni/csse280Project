var jwt = require('jsonwebtoken');

var secret = 'ishanktandon'


var JWT = {
  generateToken: function(user) {
  var token = jwt.sign(user, secret, {
    expiresIn: 86400 // expires in 24 hours
  });
  return token;
  },

  verifyToken: function(token) {
    // console.log('\n\n token is: ' + token + '\n\n');

      return new Promise((resolve, reject) => {
        jwt.verify(token, secret, function(err, decoded) {
          var resp = new Object();
          if (err) {
            console.log('verifying jwt NOT works');
            console.log('error is:  ' + err);
            resp.success = false;
            resp.decoded = null;
            resolve(resp);
          } else {
            console.log('verifying jwt works');
            resp.success = true;
            resp.decoded = decoded._doc;
            console.log('verifying jwt works ' + resp.decoded.username);
            resolve(resp);
          }
        });
      });
  }
};

module.exports = JWT;
