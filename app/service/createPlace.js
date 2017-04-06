var sendResponse = require('./sendResponse');
var sendError = require('./sendError');
var Place = require('../model/Place');

function createPlace(req, res) {
  Place.create({ name: req.body.text }, (err, newPlace) => {
    if (err) {
      return sendError(res, err, req.body.user_name, req.body.text);
    }

    return sendResponse(
      res,
      `@${req.body.user_name} your new place *${newPlace.name}* has been added!`,
      201
    );
  });
}

module.exports = createPlace;
