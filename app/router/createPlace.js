var sendResponse = require('./sendResponse');
var sendError = require('./sendError');
var Place = require('../model/Place');

function createPlace(req, res) {
  var newPlace = new Place();

  newPlace.name = req.body.text;

  console.log('request: ' + JSON.stringify(req.body));
  console.log('headers: ' + JSON.stringify(req.headers));

  newPlace.save(err => {
    if (err) {
      return sendError(res, err, req.body.user_name, newPlace.name);
    }

    console.log(`'${newPlace.name}' saved to database`);

    return sendResponse(
      res,
      `@${req.body.user_name} your new place *${newPlace.name}* has been added!`,
      201
    );
  });
}

module.exports = createPlace;
