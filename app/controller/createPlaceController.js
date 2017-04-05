var express = require('express');
var router = express.Router();
var createPlace = require('../service/createPlace');

router.post('/add', (req, res, next) => {
  return createPlace(req, res);
});

module.exports = router;
