var express = require('express');
var router = express.Router();
var User = require('../models/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({}, function (err, docs) {
    res.json(docs);
  });
});

// Login
router.post('/login', function(req, res, next) {
  var password = req.body.password;
  var username = req.body.username;

  User.findOne({ username : username, password: password }, function (err, user) {
    if (err) {
      throw err;
    }
    req.session.user = user.username;
    res.json(user);
  });
});

// Signup
router.post('/signup', function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;


  User.findOne({ username : username }, function (err, user) {
    if (err) {
      res.send({ success: false });
    }

    User.create({ username: username, password: password }, function (err, doc) {
      if (err) {
        res.send({ success: false });
      }

      res.send(doc);
    });
  });
});

router.get('/logout', function (req, res, next) {
  req.session.user = null;
  res.json({ success: true });
});

// Update User stocks
// req.body.update { _id, update }
router.put('/updateStocks', function (req, res, next) {
  if (!req.session.user) {
    res.json({ success: false })
  }

  User.findOne({ _id: req.body._id }, function (err, user) {
    if (err) {
      throw err;
    }

    var stocks = Array.from(user.stocks);
    console.log('stocks: ', stocks);
    var modified = false;

    user.stocks.map(function(stock, index) {
      if (stock === req.body.stock) {
        stocks.splice(index, 1);
        modified = true;
      }
    });

    if (!modified) {
      stocks.push(req.body.stock);
    }

    User.update(user, { stocks: stocks }, function(err, updatedRes) {
      if (err) {
        res.json({ success: false });
      }
      res.json(updatedRes);
    });
  });
});

module.exports = router;
