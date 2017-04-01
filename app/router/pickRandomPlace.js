var sendResponse = require('./sendResponse');
var sendError = require('./sendError');
var Place = require('../model/Place');

function pickRandomPlace(req, res) {
  Place.findRandom().limit(1).exec(function (err, places) {
    if (err) {
      return sendError(res, err);
    }
    return sendResponse(res, `@${req.body.user_name} you should have lunch at *${places[0].name}*`);
  });
}

module.exports = pickRandomPlace;
