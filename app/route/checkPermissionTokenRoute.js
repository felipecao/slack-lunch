var express = require('express');
var router = express.Router();
var isPermissionTokenValid = require('../service/checkPermissionToken');
var sendResponse = require('../service/sendResponse');

router.post('/', (req, res, next) => {
  if (!isPermissionTokenValid(req, res)) {
    return sendResponse(res, `You're not allowed to send messages to this channel.`, 401);
  }

  next();
});

module.exports = router;
