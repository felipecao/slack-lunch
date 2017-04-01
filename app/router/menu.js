var sendResponse = require('./sendResponse');

function menu(req, res) {
  return sendResponse(res, `@${req.body.user_name} these are the commands we have available:
\`/add\`: add a new place to have lunch
\`/show\`: shows all places saved to our database
\`/random\`: picks a random place for you to have lunch
\`/menu\`: displays this message`);
}

module.exports = menu;
