var express = require('express');
var router = express.Router();
var pickRandomPlace = require('../router/pickRandomPlace');

router.post('/random', (req, res, next) => {
  return pickRandomPlace(req, res);
});

module.exports = router;
