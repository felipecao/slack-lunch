var sendResponse = require('./sendResponse');
var sendError = require('./sendError');
var Place = require('../model/Place');
var PlaceFactory = require('../../app/service/PlaceFactory');

function createPlace(req, res) {
  Place.create(PlaceFactory.fromRequestBody(req.body), (err, newPlace) => {
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
