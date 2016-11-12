var express = require('express');
var router = express.Router();

/* GET twitter stock tick feed. */
router.get('/:tick', function(req, res, next) {
  res.send('respond with a list of tweets of ' + req.params.tick);
});

module.exports = router;
