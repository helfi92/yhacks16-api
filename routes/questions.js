var express = require('express');
var router = express.Router();
var db = require('../models/db');

db.then(function(connection) {
  var questionsCollection = connection.collection('questionscollection');

  // GET list of questions
  router.get('/', function(req, res, next) {
    questionsCollection.find().toArray(function(err, result) {
      if (err) {
        console.log('err: ', err);
      }

      res.send(result);
    });
  });

  // POST a question
  router.post('/', function(req, res, next) {
    var q = { question: req.body.question, answer: req.body.answer };

    if(q.question && q.answer) {
      questionsCollection.insertOne(q, function (err, data) {
        if (err) {
          throw err;
        }

        res.json(data);
      })
    }
  });
});

module.exports = router;