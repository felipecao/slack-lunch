var express = require('express');
var router = express.Router();
var menu = require('../router/menu');

router.post('/menu', (req, res, next) => {
  return menu(req, res);
});

module.exports = router;
