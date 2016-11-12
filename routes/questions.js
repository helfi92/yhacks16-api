var express = require('express');
var router = express.Router();
var Question = require('../models/Question');

  // GET list of questions
  router.get('/', function(req, res, next) {
    if (!req.session.user) {
      res.json({ success: false })
    }

    Question.find({}, function (err, docs) {
      if (err) {
        res.json( {successs: false });
      }

      res.json(docs);
    });
  });

  // POST a question
  router.post('/', function(req, res, next) {
    var q = { question: req.body.question, answer: req.body.answer, wrongAnswers: req.body.wrongAnswers };

    if(q.question && q.answer && q.wrongAnswers) {
      Question.create({ question: q.question, answer: q.answer, wrongAnswers: q.wrongAnswers }, function (err, doc) {
        if (err) {
          res.send({ success: false });
        }

        res.send(doc);
      });
    }
  });

module.exports = router;