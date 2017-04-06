var sendResponse = require('./sendResponse');
var sendError = require('./sendError');
var Place = require('../model/Place');

function pickRandomPlace(req, res) {
  Place.findRandom({teamId: req.body.team_id}).limit(1).exec((err, places) => {
    if (err) {
      return sendError(res, err);
    }

    if (!places.length) {
      return sendResponse(
        res,
        `@${req.body.user_name} there are no places yet! Why don't you try to create the first one by using the \`/add\` command?`
      );
    }

    return sendResponse(res, `@${req.body.user_name} you should have lunch at *${places[0].name}*`);
  });
}

module.exports = pickRandomPlace;
