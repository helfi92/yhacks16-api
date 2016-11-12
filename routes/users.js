var express = require('express');
var router = express.Router();
var db = require('../models/db');

db.then(function(connection) {
  var userCollection = connection.collection('usercollection');

  /* GET users listing. */
  router.get('/', function(req, res, next) {
    userCollection.find().toArray(function (err, result) {
      if (err) {
        throw err;
      }

      res.json(result);
    })
  });

  // Login
  router.post('/login', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    userCollection.find({ username: username, password: password }).toArray(function(err, result) {
      if (err) {
        console.log('err: ', err);
      }

      res.send(result);
    });
  });

  // Signup
  router.post('/signup', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    // Verify that user is unique / does not exist before signing him up
    userCollection.find({ username: username }).toArray(function(err, result) {
      if (err) {
        throw err;
      }

      if (!result.length) {
        userCollection.insertOne({ username: username, password: password }, function (err, data) {
          if (err) {
            throw err;
          }

          res.json(data);
        });
      } else {
        res.send({ success: false });
      }
    });
  });
});

module.exports = router;
