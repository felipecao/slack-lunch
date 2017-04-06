var sendResponse = require('./sendResponse');
var sendError = require('./sendError');
var Place = require('../model/Place');

function showPlaces(req, res) {
  Place.where('teamId', req.body.team_id).find((err, places) => {
    if (err) {
      return sendError(res, err);
    }

    if (!places.length) {
      return sendResponse(
        res,
        `@${req.body.user_name} there are no places yet! Why don't you try to create the first one by using the \`/add\` command?`
      );
    }

    const names = places.map(p => `*${p.name}*`).join('\n');
    const message = `@${req.body.user_name} these are the places in our database: \n${names}`;

    return sendResponse(res, message);
  });
}

module.exports = showPlaces;
